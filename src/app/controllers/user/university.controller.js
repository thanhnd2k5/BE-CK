import * as universityService from '@/app/services/university.service'
import { abort } from '@/utils/helpers'

export async function getAll(req, res) {
    const universities = await universityService.getAllUniversities()
    res.jsonify(universities)
}

export async function getOne(req, res) {
    const university = await universityService.getUniversityById(req.university._id)
    if (!university) {
        abort(400, 'Không tìm thấy trường đại học')
    }
    res.jsonify(university)
}

export async function getByAdmissionMethod(req, res) {
    const { admissionMethod } = req.query
    if (!admissionMethod) {
        abort(400, 'Thiếu phương thức xét tuyển')
    }
    
    const universities = await universityService.getUniversitiesByAdmissionMethod(admissionMethod)
    res.jsonify(universities)
}