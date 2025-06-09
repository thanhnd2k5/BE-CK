import * as subjectCombinationsController from '@/app/controllers/user/subject_combinations.controller'
import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import { checkSubjectCombinationExists } from '@/app/middleware/user/subject_combinations.middleware'

const router = Router()

router.get('/', 
    asyncHandler(subjectCombinationsController.getAllSubjectCombinations)
)

router.get('/:subjectCombinationId', 
    asyncHandler(checkSubjectCombinationExists),
    asyncHandler(subjectCombinationsController.getSubjectCombinationById)
)

export default router 