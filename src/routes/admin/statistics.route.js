import express from 'express'
import * as statisticsController from '@/app/controllers/admin/statistics.controller'
import * as authMiddleware from '@/app/middleware/admin/auth.middleware'
import {asyncHandler} from '@/utils/helpers'
const router = express.Router()

router.get(
    '/by-university',
    asyncHandler(authMiddleware.checkValidToken),
    asyncHandler(statisticsController.getStatisticsByUniversity)
)

router.get(
    '/by-major',
    asyncHandler(authMiddleware.checkValidToken),
    asyncHandler(statisticsController.getStatisticsByMajor)
)

router.get(
    '/by-status',
    asyncHandler(authMiddleware.checkValidToken),
    asyncHandler(statisticsController.getStatisticsByStatus)
)

router.get(
    '/by-date',
    asyncHandler(authMiddleware.checkValidToken),
    asyncHandler(statisticsController.getStatisticsByDate)
)

router.get(
    '/by-month',
    asyncHandler(authMiddleware.checkValidToken),
    asyncHandler(statisticsController.getStatisticsByMonth)
)

router.get(
    '/by-year',
    asyncHandler(authMiddleware.checkValidToken),
    asyncHandler(statisticsController.getStatisticsByYear)
)

router.get(
    '/between-universities',
    asyncHandler(authMiddleware.checkValidToken),
    asyncHandler(statisticsController.getStatisticsBetweenUniversities)
)

export default router 