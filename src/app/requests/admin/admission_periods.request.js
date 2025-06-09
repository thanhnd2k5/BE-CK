import Joi from 'joi'

export const createAdmissionPeriods =  Joi.object({
    universityId: Joi.string().required(),
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required().min(Joi.ref('startDate')),
    description: Joi.string().allow(''),
    academicYear: Joi.string(),
    isActive: Joi.boolean().default(true)
})

export const updateAdmissionPeriods = Joi.object({
    name: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date().min(Joi.ref('startDate')),
    description: Joi.string().allow(''),
    academicYear: Joi.string(),
    isActive: Joi.boolean()
})