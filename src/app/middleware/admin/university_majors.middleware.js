import { UniversityMajors } from '@/models'
import { abort } from '@/utils/helpers'
import { isValidObjectId } from 'mongoose'

export const checkUniversityMajorsExists = async (req, res, next) => {
    try {
        const { universityMajorsId } = req.params
        if (!isValidObjectId(universityMajorsId)) {
            return abort(400, 'ID ngành đại học không hợp lệ')
        }
        
        const universityMajors = await UniversityMajors.findById(universityMajorsId)
        if (!universityMajors) {
            return abort(404, 'Không tìm thấy ngành đại học')
        }
        
        req.universityMajors = universityMajors
        next()
    } catch (error) {
        next(error)
    }
}
