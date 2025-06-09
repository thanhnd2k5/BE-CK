import * as subjectCombinationsController from '@/app/controllers/admin/subject_combinations.controller'
import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import { checkValidToken } from '@/app/middleware/admin/auth.middleware'
import { createSubjectCombinationRequest, updateSubjectCombinationRequest } from '@/app/requests/admin/subject_combinations.request'
import validate from '@/app/middleware/admin/validate'
import { checkSubjectCombinationExists } from '@/app/middleware/admin/subject_combinations.middleware'

const router = Router()

router.use(asyncHandler(checkValidToken))

router.post('/', 
    asyncHandler(validate(createSubjectCombinationRequest)),
    asyncHandler(subjectCombinationsController.createSubjectCombination)
)

router.put('/:subjectCombinationId', 
    asyncHandler(checkSubjectCombinationExists),
    asyncHandler(validate(updateSubjectCombinationRequest)),
    asyncHandler(subjectCombinationsController.updateSubjectCombination)
)

router.delete('/:subjectCombinationId', 
    asyncHandler(checkSubjectCombinationExists),
    asyncHandler(subjectCombinationsController.deleteSubjectCombination)
)

router.get('/', 
    asyncHandler(subjectCombinationsController.getAllSubjectCombinations)
)

router.get('/:subjectCombinationId', 
    asyncHandler(checkSubjectCombinationExists),
    asyncHandler(subjectCombinationsController.getSubjectCombinationById)
)

export default router 