import Joi from 'joi'
import { UniversityMajors } from '@/models'
import {AsyncValidate} from '@/utils/classes'

export const createUniversityMajorsRequest = Joi.object({
    university_id: Joi.string().required().label('ID trường đại học'),
    name: Joi.string().required().label('Tên ngành'),
    code: Joi.string().required().label('Mã ngành').custom(
        (value, helpers) =>
            new AsyncValidate(value, async function () {
                const universityMajors = await UniversityMajors.findOne({ code: value })
                if (universityMajors) {
                    return helpers.error('any.exists', { message: 'Mã ngành đã tồn tại' })
                }
                return value
            })
    ),
    admission_methods: Joi.array().items(Joi.string()).label('Phương thức tuyển sinh'),
    subject_combination_ids: Joi.array().items(Joi.string()).label('Tổ hợp môn'),
})

export const updateUniversityMajorsRequest = Joi.object({
    university_id: Joi.string().required().label('ID trường đại học'),
    name: Joi.string().required().label('Tên ngành'),
    code: Joi.string().required().label('Mã ngành').custom(
        (value, helpers) =>
            new AsyncValidate(value, async function (req) {
                const universityMajors = await UniversityMajors.findOne({ 
                    _id: { $ne: req.universityMajors._id }, 
                    code: value 
                })
                if (universityMajors) {
                    return helpers.error('any.exists', { message: 'Mã ngành đã tồn tại' })
                }
                return value
            })
    ),
    admission_methods: Joi.array().items(Joi.string()).label('Phương thức tuyển sinh'),
    subject_combination_ids: Joi.array().items(Joi.string()).label('Tổ hợp môn'),
})