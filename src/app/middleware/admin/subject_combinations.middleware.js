import { SubjectCombination } from '@/models'
import { abort } from '@/utils/helpers'
import { isValidObjectId } from 'mongoose'

export const checkSubjectCombinationExists = async (req, res, next) => {
    try {
        const { subjectCombinationId } = req.params
        if (!isValidObjectId(subjectCombinationId)) {
            return abort(400, 'ID tổ hợp môn không hợp lệ')
        }
        
        const subjectCombination = await SubjectCombination.findById(subjectCombinationId)
        if (!subjectCombination) {
            return abort(404, 'Không tìm thấy tổ hợp môn')
        }
        
        req.subjectCombination = subjectCombination
        next()
    } catch (error) {
        next(error)
    }
} 