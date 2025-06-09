import * as universityMajorsController from '@/app/controllers/admin/university_majors.controller'
import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import { checkValidToken } from '@/app/middleware/admin/auth.middleware'
import { checkUniversityExists } from '@/app/middleware/admin/university.middleware'
import { createUniversityMajorsRequest, updateUniversityMajorsRequest } from '@/app/requests/admin/university_majors.request'
import validate from '@/app/middleware/admin/validate'
import { checkUniversityMajorsExists } from '@/app/middleware/admin/university_majors.middleware'

const router = Router()

router.use(asyncHandler(checkValidToken))

router.post('/', 
    asyncHandler(checkUniversityExists),
    asyncHandler(validate(createUniversityMajorsRequest)),
    asyncHandler(universityMajorsController.createUniversityMajors)
)
router.put('/:universityMajorsId', 
    asyncHandler(checkUniversityMajorsExists),
    asyncHandler(validate(updateUniversityMajorsRequest)),
    asyncHandler(universityMajorsController.updateUniversityMajors)
)
router.delete('/:universityMajorsId', 
    asyncHandler(checkUniversityMajorsExists),
    asyncHandler(universityMajorsController.deleteUniversityMajors)
)
router.get('/:universityId/majors', 
    asyncHandler(checkUniversityExists),
    asyncHandler(universityMajorsController.getByUniversityId)
)
export default router
