import express from 'express'
import * as ApplicationsController from '../../app/controllers/user/applications.controller'
import validate from '../../app/middleware/user/validate'
import { checkApplicationExists, checkAdmissionPeriodOpen } from '../../app/middleware/user/applications.middleware'
import { createApplicationSchema, updateApplicationSchema } from '../../app/requests/user/applications.request'
import { checkValidToken } from '../../app/middleware/user/auth.middleware'
import { asyncHandler } from '@/utils/helpers'

const router = express.Router()

router.use(asyncHandler(checkValidToken))

router.post('/',
    asyncHandler(checkAdmissionPeriodOpen),
    asyncHandler(validate(createApplicationSchema)),
    asyncHandler(ApplicationsController.createApplication)
)

router.get('/search', asyncHandler(ApplicationsController.searchApplications))

router.put('/:applicationId',
    asyncHandler(checkApplicationExists),
    asyncHandler(checkAdmissionPeriodOpen),
    asyncHandler(validate(updateApplicationSchema)),
    asyncHandler(ApplicationsController.updateApplication)
)

router.delete('/:applicationId',
    asyncHandler(checkApplicationExists),
    asyncHandler(ApplicationsController.deleteApplication)
)

router.get('/:applicationId',
    asyncHandler(checkApplicationExists),
    asyncHandler(ApplicationsController.getApplicationById)
)

router.get('/',
    asyncHandler(ApplicationsController.getAllApplicationsByUserId)
)

router.post('/complete',
    asyncHandler(checkAdmissionPeriodOpen),
    asyncHandler(ApplicationsController.createCompleteApplication)
)

router.get('/complete/:applicationId',
    asyncHandler(checkApplicationExists),
    asyncHandler(ApplicationsController.getCompleteApplicationById)
)

export default router 