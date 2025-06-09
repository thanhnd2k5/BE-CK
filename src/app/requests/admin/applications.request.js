import { STATUS_APPLICATION } from '@/models'
import Joi from 'joi'

export const updateStatusApplicationSchema = Joi.object({
    status: Joi.string().valid(...Object.values(STATUS_APPLICATION)),
}) 