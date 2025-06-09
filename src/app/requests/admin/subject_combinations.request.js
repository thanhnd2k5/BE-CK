import Joi from 'joi'
import { SubjectCombination } from '@/models'
import { AsyncValidate } from '@/utils/classes'

export const createSubjectCombinationRequest = Joi.object({
    code: Joi.string().required().label('Mã tổ hợp').custom(
        (value, helpers) =>
            new AsyncValidate(value, async function () {
                const subjectCombination = await SubjectCombination.findOne({ code: value })
                if (subjectCombination) {
                    return helpers.error('any.exists', { message: 'Mã tổ hợp đã tồn tại' })
                }
                return value
            })
    ),
    subjects: Joi.array().items(Joi.string()).required().min(1).label('Danh sách môn học')
})

export const updateSubjectCombinationRequest = Joi.object({
    code: Joi.string().required().label('Mã tổ hợp').custom(
        (value, helpers) =>
            new AsyncValidate(value, async function (req) {
                const subjectCombination = await SubjectCombination.findOne({ 
                    _id: { $ne: req.subjectCombination._id }, 
                    code: value 
                })
                if (subjectCombination) {
                    return helpers.error('any.exists', { message: 'Mã tổ hợp đã tồn tại' })
                }
                return value
            })
    ),
    subjects: Joi.array().items(Joi.string()).required().min(1).label('Danh sách môn học')
}) 