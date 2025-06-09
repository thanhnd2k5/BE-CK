import express from 'express'
import * as ApplicationResultController from '@/app/controllers/user/application_result.controller.js'
import { createApplicationResultSchema, updateApplicationResultSchema } from '@/app/requests/user/application_result.request.js'
import { checkApplicationResultExists, checkApplicationResultOwnership } from '@/app/middleware/user/application_result.middleware'
import { checkApplicationExists } from '@/app/middleware/user/applications.middleware'
import { checkValidToken } from '@/app/middleware/user/auth.middleware'
import { asyncHandler } from '@/utils/helpers'
import validate from '@/app/middleware/user/validate'

const router = express.Router()

// Tất cả routes đều cần authentication
router.use(asyncHandler(checkValidToken))

// Tạo kết quả xét tuyển
router.post('/', 
    asyncHandler(validate(createApplicationResultSchema)),
    asyncHandler(checkApplicationExists),
    asyncHandler(ApplicationResultController.createApplicationResult)
)

// Lấy danh sách kết quả của user hiện tại
router.get('/', asyncHandler(ApplicationResultController.getByUser))

// Lấy kết quả theo application ID
router.get('/application/:applicationId', asyncHandler(ApplicationResultController.getApplicationResultByApplicationId))

// Lấy kết quả theo ID
router.get('/:id', 
    asyncHandler(checkApplicationResultExists),
    asyncHandler(checkApplicationResultOwnership),
    asyncHandler(ApplicationResultController.getApplicationResultById)
)

// Cập nhật kết quả
router.put('/:id', 
    asyncHandler(checkApplicationResultExists),
    asyncHandler(checkApplicationResultOwnership),
    asyncHandler(validate(updateApplicationResultSchema)),
    asyncHandler(ApplicationResultController.updateApplicationResult)
)

// Xóa kết quả
router.delete('/:id', 
    asyncHandler(checkApplicationResultExists),
    asyncHandler(checkApplicationResultOwnership),
    asyncHandler(ApplicationResultController.deleteApplicationResult)
)

export default router 