import * as SubjectCombinationService from '@/app/services/subject_combinations.service'
import { abort } from '@/utils/helpers'

export async function getAllSubjectCombinations(req, res) {
    try {
        const result = await SubjectCombinationService.getAllSubjectCombinations()
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}

export async function getSubjectCombinationById(req, res) {
    try {
        const subjectCombination = req.subjectCombination
        const result = await SubjectCombinationService.getSubjectCombinationById(subjectCombination._id)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
} 