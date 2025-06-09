import moment from 'moment'
import jwt from 'jsonwebtoken'
import {OAuth2Client} from 'google-auth-library'
import {cache, LOGIN_EXPIRE_IN, TOKEN_TYPE, VALIDATE_EMAIL_REGEX} from '@/configs'
import {abort, generateToken} from '@/utils/helpers'
import {Admin, Permission, HighSchoolProfile ,STATUS_ACCOUNT, User} from '@/models'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const tokenBlocklist = cache.create('token-block-list')

export async function checkValidLoginAdmin({phone, password}) {
    const user = await Admin.findOne({phone, deleted: false})

    if (user) {
        const verified = user.verifyPassword(password)
        if (verified) {
            if (user.status === STATUS_ACCOUNT.DE_ACTIVE) {
                abort(400, 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản lý.')
            }
            return user
        }
    }

    return false
}

export function authToken(admin) {
    const accessToken = generateToken({adminId: admin._id}, TOKEN_TYPE.ADMIN_AUTHORIZATION, LOGIN_EXPIRE_IN)
    const decode = jwt.decode(accessToken)
    const expireIn = decode.exp - decode.iat
    return {
        access_token: accessToken,
        expire_in: expireIn,
        auth_type: 'Bearer Token',
    }
}

export async function profileAdmin(currentAdmin) {
    const acc = await Admin.findById(currentAdmin._id).select('-password')
        .populate({path: 'roles'})
        .lean()
    const permissionIds = [...acc.roles]
        .map((role) => role.permission_ids)
        .flat()
    const permissions = await Permission.find({_id: {$in: permissionIds}})
    acc.permissions = permissions.map(({code}) => code)
    delete acc.role_ids
    delete acc.roles
    return acc
}

export async function checkValidLoginUser({email, password}) {
    const user = await User.findOne({email, deleted: false})

    if (user) {
        const verified = user.verifyPassword(password)
        if (verified) {
            if (user.status === STATUS_ACCOUNT.DE_ACTIVE) {
                abort(400, 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản lý.')
            }
            return user
        }
    }

    return false
}

export function authTokenUser(user) {
    const accessToken = generateToken({userId: user._id}, TOKEN_TYPE.USER_AUTHORIZATION, LOGIN_EXPIRE_IN)
    const decode = jwt.decode(accessToken)
    const expireIn = decode.exp - decode.iat
    return {
        access_token: accessToken,
        expire_in: expireIn,
        auth_type: 'Bearer Token',
    }
}

export async function blockToken(token) {
    const decoded = jwt.decode(token)
    const expiresIn = decoded.exp
    const now = moment().unix()
    await tokenBlocklist.set(token, 1, expiresIn - now)
}

export async function registerUser(userData) {
    // Xác định username là email hay phone
    const isEmail = VALIDATE_EMAIL_REGEX.test(userData.email)
    
    // Kiểm tra email/phone đã tồn tại chưa
    if (isEmail) {
        const existingEmail = await User.findOne({ email: userData.email, deleted: false })
        if (existingEmail) {
            abort(400, 'Email đã được sử dụng.')
        }
    }
    
    // Tạo user mới
    const user = await User.create(userData)
    
    // Tạo hồ sơ học tập trống
    await HighSchoolProfile.create({
        userId: user._id,
        highSchoolName: '',
        gpaGrade10: null,
        gpaGrade11: null,
        gpaGrade12: null,
        graduationYear: null,
        priorityArea: '',
        priorityGroup: ''
    })

    return user
}

export async function handleLoginWithGoogle(id_token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        const payload = ticket.getPayload()
        const {email, name, picture} = payload

        let user = await User.findOne({email})
        if (!user) {
            user = await User.create({
                name,
                email,
                avatar: picture,
                password: Math.random().toString(36).slice(-8),
                status: STATUS_ACCOUNT.ACTIVE,
            })
        }

        return authTokenUser(user)
    } catch (error) {
        abort(400, 'Đăng nhập thất bại.')
    }

}