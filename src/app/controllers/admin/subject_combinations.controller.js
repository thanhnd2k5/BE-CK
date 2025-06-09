import * as SubjectCombinationService from '@/app/services/subject_combinations.service'
import { abort } from '@/utils/helpers'

export async function createSubjectCombination(req, res) {
    try {
        const data = req.body
        const result = await SubjectCombinationService.createSubjectCombination(data)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}

export async function updateSubjectCombination(req, res) {
    try {
        const subjectCombination = req.subjectCombination
        const data = req.body
        const result = await SubjectCombinationService.updateSubjectCombination(subjectCombination._id, data)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}

export async function deleteSubjectCombination(req, res) {
    try {
        const subjectCombination = req.subjectCombination
        await SubjectCombinationService.deleteSubjectCombination(subjectCombination._id)
        res.jsonify({ message: 'Subject combination deleted successfully' })
    } catch (error) {
        abort(error, res)
    }
}

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