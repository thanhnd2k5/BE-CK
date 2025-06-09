import * as UniversityMajorsService from '@/app/services/university_majors.service'
import { abort } from '@/utils/helpers'

export async function createUniversityMajors(req, res) {
    try {
        const data = req.body
        const result = await UniversityMajorsService.createUniversityMajors(data)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}

export async function updateUniversityMajors(req, res) {
    try {
        const universityMajorsId = req.universityMajors._id
        const data = req.body
        console.log(universityMajorsId, data)
        const result = await UniversityMajorsService.updateUniversityMajors(universityMajorsId, data)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}

export async function deleteUniversityMajors(req, res) {
    try {
        const universityMajorsId = req.universityMajors._id
        await UniversityMajorsService.deleteUniversityMajors(universityMajorsId)
        res.jsonify({message: 'University majors deleted successfully'})
    } catch (error) {
        abort(error, res)
    }
}

export async function getByUniversityId(req, res) {
    try {
        const { universityId } = req.params
        const result = await UniversityMajorsService.getByUniversityId(universityId)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}
