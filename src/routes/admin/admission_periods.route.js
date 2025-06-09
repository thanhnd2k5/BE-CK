import { Router } from 'express'
import * as AdmissionPeriodsController from '@/app/controllers/admin/admission_periods.controller'
import * as authMiddleware from '@/app/middleware/admin/auth.middleware'
import { checkAdmissionPeriodExists } from '@/app/middleware/admin/admission_periods.middleware'
import { checkUniversityExists } from '@/app/middleware/admin/university.middleware'
import * as admissionPeriodsRequest from '@/app/requests/admin/admission_periods.request'
import { asyncHandler } from '@/utils/helpers'
import validate from '@/app/middleware/admin/validate'

const router = Router()

router.use(asyncHandler(authMiddleware.checkValidToken))

router.post('/',
    asyncHandler(validate(admissionPeriodsRequest.createAdmissionPeriods)),
    asyncHandler(AdmissionPeriodsController.createAdmissionPeriod)
)

router.get('/',
    asyncHandler(AdmissionPeriodsController.getAllAdmissionPeriods)
)

router.get('/:id',
    asyncHandler(checkAdmissionPeriodExists),
    asyncHandler(AdmissionPeriodsController.getAdmissionPeriodById)
)

router.put('/:id',
    asyncHandler(checkAdmissionPeriodExists),
    asyncHandler(validate(admissionPeriodsRequest.updateAdmissionPeriods)),
    asyncHandler(AdmissionPeriodsController.updateAdmissionPeriod)
)

router.delete('/:id',
    asyncHandler(checkAdmissionPeriodExists),
    asyncHandler(AdmissionPeriodsController.deleteAdmissionPeriod)
)

router.get('/university/:universityId',
    asyncHandler(checkUniversityExists),
    asyncHandler(AdmissionPeriodsController.getAdmissionPeriodsByUniversityId)
)

export default router 