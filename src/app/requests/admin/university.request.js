import Joi from 'joi'
import { University } from '@/models'
import {AsyncValidate} from '@/utils/classes'

export const createUniversityRequest = Joi.object({
    name: Joi.string().label('Tên trường'),
    code: Joi.string()
        .label('Mã trường')
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const university = await University.findOne({ code: value })
                    if (university) {
                        return helpers.error('any.exists')
                    }
                    return value
                })
        ),
    description: Joi.string().label('Mô tả'),
    address: Joi.string().label('Địa chỉ'),
})

export const updateUniversityRequest = Joi.object({
    name: Joi.string().label('Tên trường'),
    code: Joi.string().label('Mã trường').custom(
        (value, helpers) =>
            new AsyncValidate(value, async function (req) {
                const university = await University.findOne({ _id: { $ne: req.university._id }, code: value })
                if (university) {
                    return helpers.error('any.exists')
                }
                return value
            })
    ),
    description: Joi.string().label('Mô tả'),
    address: Joi.string().label('Địa chỉ'),
})

export const deleteUniversityRequest = Joi.object({
    id: Joi.string().label('ID'),
})

