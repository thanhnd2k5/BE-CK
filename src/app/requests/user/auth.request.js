import Joi from 'joi'
import {VALIDATE_EMAIL_REGEX} from '@/configs/constants'

export const login = Joi.object({
    email: Joi.alternatives()
        .try(
            Joi.string().pattern(VALIDATE_EMAIL_REGEX).label('Email')
        )
        .required()
        .label('Tài khoản'),
    password: Joi.string().required().label('Mật khẩu'),
})

export const register = Joi.object({
    name: Joi.string().required().label('Họ tên'),
    email: Joi.alternatives()
        .try(
            Joi.string().pattern(VALIDATE_EMAIL_REGEX).label('Email')
        )
        .required()
        .label('Tài khoản'),
    password: Joi.string().required().label('Mật khẩu')
}) 

export const loginGoogle = Joi.object({
    id_token: Joi.string().required().label('Mã thông tin đăng nhập Google'),
})