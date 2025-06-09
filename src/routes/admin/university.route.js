import express from 'express'
import * as controller from '@/app/controllers/admin/university.controller'
import { checkValidToken } from '@/app/middleware/admin/auth.middleware'
import validate from '@/app/middleware/admin/validate'
import { asyncHandler } from '@/utils/helpers'
import { createUniversityRequest, updateUniversityRequest, deleteUniversityRequest } from '@/app/requests/admin/university.request'
import { checkUniversityExists } from '@/app/middleware/admin/university.middleware'

const router = express.Router()

router.use(asyncHandler(checkValidToken))

router.get('/', asyncHandler(controller.getAll))
router.get('/:universityId',
    asyncHandler(checkUniversityExists),
    asyncHandler(controller.getOne)
)
router.post('/',
    asyncHandler(validate(createUniversityRequest)),
    asyncHandler(controller.create)
)
router.put('/:universityId',
    asyncHandler(checkUniversityExists),
    asyncHandler(validate(updateUniversityRequest)),
    asyncHandler(controller.update)
)
router.delete('/:universityId',
    asyncHandler(checkUniversityExists),
    asyncHandler(validate(deleteUniversityRequest)),
    asyncHandler(controller.remove)
)

export default router
