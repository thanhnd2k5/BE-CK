import { University } from '@/models'
import { abort } from '@/utils/helpers'
import { isValidObjectId } from 'mongoose'

export const checkUniversityExists = async (req, res, next) => {
    const universityId = req.params.universityId || req.body.university_id
    if (!isValidObjectId(universityId)) {
        abort(404, 'ID trường đại học không hợp lệ')
    }
    const university = await University.findById(universityId)
    if (!university) {
        abort(404, 'Không tìm thấy trường đại học')
    }
    req.university = university
    next()
}


