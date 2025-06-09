import * as universityMajorsController from '@/app/controllers/user/university_majors.controller'
import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import { checkUniversityExists } from '@/app/middleware/user/university.middleware'

const router = Router()

router.get('/:universityId/majors', 
    asyncHandler(checkUniversityExists),
    asyncHandler(universityMajorsController.getByUniversityId)
)
export default router
