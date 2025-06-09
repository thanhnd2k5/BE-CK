import { Router } from 'express'
import * as ApplicationsController from '@/app/controllers/admin/applications.controller'
import * as authMiddleware from '@/app/middleware/admin/auth.middleware'
import { checkApplicationExists } from '@/app/middleware/admin/applications.middleware'
import { checkUniversityExists } from '@/app/middleware/admin/university.middleware'
import * as aplicationsRequest from '@/app/requests/admin/applications.request'
import {asyncHandler} from '@/utils/helpers'
import validate from '@/app/middleware/admin/validate'

const router = Router()

router.use(asyncHandler(authMiddleware.checkValidToken))

router.get('/', asyncHandler(ApplicationsController.getAllApplications))
router.get('/university/:universityId', 
    asyncHandler(checkUniversityExists),
    asyncHandler(ApplicationsController.getApplicationsByUniversity)
)
router.patch(
    '/:applicationId/status',
    asyncHandler(checkApplicationExists),
    asyncHandler(validate(aplicationsRequest.updateStatusApplicationSchema)),
    asyncHandler(ApplicationsController.updateApplicationStatus))

router.get('/complete/:applicationId',
    asyncHandler(checkApplicationExists),
    asyncHandler(ApplicationsController.getCompleteApplicationById)
)

// router.get('/grouped-by-major',
//     asyncHandler(ApplicationsController.getApplicationsGroupedByMajor)
// )

router.get('/university/:universityId/grouped-by-major',
    asyncHandler(checkUniversityExists),
    asyncHandler(ApplicationsController.getApplicationsGroupedByMajorOfUniversity)
)

export default router 