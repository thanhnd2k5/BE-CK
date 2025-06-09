import Joi from 'joi'
import { ADMISSION_METHOD } from '@/models/base'
export const createApplicationSchema = Joi.object({
    universityMajorId: Joi.string().required(),
    subjectCombinationId: Joi.string(),
    admissionPeriodId: Joi.string().required(),
    admissionMethod: Joi.string().valid(...Object.values(ADMISSION_METHOD)),
    status: Joi.string()
})

export const updateApplicationSchema = Joi.object({
    universityMajorId: Joi.string(),
    subjectCombinationId: Joi.string(),
    admissionMethod: Joi.string().valid(...Object.values(ADMISSION_METHOD)),
    status: Joi.string()
}) 