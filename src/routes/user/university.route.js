import express from 'express'
import * as controller from '@/app/controllers/user/university.controller'
import { asyncHandler } from '@/utils/helpers'
import { checkUniversityExists } from '@/app/middleware/user/university.middleware'

const router = express.Router()

router.get('/', asyncHandler(controller.getAll))
router.get('/:universityId',
    asyncHandler(checkUniversityExists),
    asyncHandler(controller.getOne)
)
router.get('/university/admission-method', asyncHandler(controller.getByAdmissionMethod))

export default router
