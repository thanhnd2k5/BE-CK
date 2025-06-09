import express from 'express'
import * as controller from '@/app/controllers/user/high_school_profile.controller'
import { checkValidToken } from '@/app/middleware/user/auth.middleware'
import { asyncHandler } from '@/utils/helpers'
import { updateHighSchoolProfileRequest } from '@/app/requests/user/high_school_profile.request'
import validate from '@/app/middleware/user/validate'
const router = express.Router()

router.use(asyncHandler(checkValidToken))

router.get('/', asyncHandler(controller.getProfile))
router.put('/',
    asyncHandler(validate(updateHighSchoolProfileRequest)),
    asyncHandler(controller.updateProfile))

export default router
