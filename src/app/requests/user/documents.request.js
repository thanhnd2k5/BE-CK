import Joi from 'joi'
import { FileUpload } from '@/utils/classes'
const MIME_TYPE = {
    'application/pdf': 'pdf',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
}
const MAX_UPLOAD_SIZE = parseInt(process.env.MAX_UPLOAD_SIZE, 10) || 10

export const createDocumentSchema = Joi.object({
    applicationId: Joi.string().required(),
    type: Joi.string().required(),
    file: Joi.alternatives().try(
        Joi.object({
            originalname: Joi.string().trim().required().label('Tên file'),
            mimetype: Joi.valid(...Object.keys(MIME_TYPE))
                .required()
                .label('Loại file'),
            buffer: Joi.binary()
                .max(MAX_UPLOAD_SIZE * 1024 ** 2)
                .required()
                .label('Nội dung file'),
        })
            .unknown(true)
            .instance(FileUpload)
            .label('File'),
        Joi.string().valid('remove').label('Xóa file')
    )
        .allow('')
        .label('File'),
    fileType: Joi.string().required()
})

export const updateDocumentSchema = Joi.object({
    type: Joi.string(),
    file: Joi.alternatives().try(
        Joi.object({
            originalname: Joi.string().trim().required().label('Tên file'),
            mimetype: Joi.valid(...Object.keys(MIME_TYPE))
                .required()
                .label('Loại file'),
            buffer: Joi.binary()
                .max(MAX_UPLOAD_SIZE * 1024 ** 2)
                .required()
                .label('Nội dung file'),
        })
            .unknown(true)
            .instance(FileUpload)
            .label('File'),
        Joi.string().valid('remove').label('Xóa file')
    )
        .allow('')
        .label('File'),
    fileType: Joi.string()
}) 