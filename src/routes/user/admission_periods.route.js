import { Router } from 'express'
import * as AdmissionPeriodsController from '@/app/controllers/user/admission_periods.controller'
import * as authMiddleware from '@/app/middleware/user/auth.middleware'
import { checkAdmissionPeriodExists } from '@/app/middleware/admin/admission_periods.middleware'
import { checkUniversityExists } from '@/app/middleware/admin/university.middleware'
import { asyncHandler } from '@/utils/helpers'

const router = Router()

router.use(asyncHandler(authMiddleware.checkValidToken))

router.get('/university/:universityId',
    asyncHandler(checkUniversityExists),
    asyncHandler(AdmissionPeriodsController.getAdmissionPeriodsByUniversityId)
)

router.get('/:id',
    asyncHandler(checkAdmissionPeriodExists),
    asyncHandler(AdmissionPeriodsController.getAdmissionPeriodById)
)

export default router 