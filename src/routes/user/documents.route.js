import express from 'express'
import * as DocumentsController from '@/app/controllers/user/documents.controller'
import validate from '@/app/middleware/user/validate'
import { createDocumentSchema, updateDocumentSchema } from '@/app/requests/user/documents.request'
import { checkValidToken } from '@/app/middleware/user/auth.middleware'
import { asyncHandler } from '@/utils/helpers'
import { checkDocumentExists } from '@/app/middleware/user/documents.middleware'
import { checkApplicationExists } from '@/app/middleware/user/applications.middleware'

const router = express.Router()

// Tạo document mới
router.post('/',
    asyncHandler(checkValidToken),
    asyncHandler(validate(createDocumentSchema)),
    asyncHandler(DocumentsController.createDocument)
)

// Cập nhật document
router.put('/:documentId',
    asyncHandler(checkValidToken),
    asyncHandler(checkDocumentExists),
    asyncHandler(validate(updateDocumentSchema)),
    asyncHandler(DocumentsController.updateDocument)
)

// Xóa document
router.delete('/:documentId',
    asyncHandler(checkValidToken),
    asyncHandler(checkDocumentExists),
    asyncHandler(DocumentsController.deleteDocument)
)

// Lấy thông tin một document
router.get('/:documentId',
    asyncHandler(checkValidToken),
    asyncHandler(checkDocumentExists),
    asyncHandler(DocumentsController.getDocumentById)
)

// Lấy danh sách documents của một application
router.get('/application/:applicationId',
    asyncHandler(checkValidToken),
    asyncHandler(checkApplicationExists),
    asyncHandler(DocumentsController.getDocumentsByApplicationId)
)

export default router 