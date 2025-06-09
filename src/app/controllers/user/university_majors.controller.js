import * as UniversityMajorsService from '@/app/services/university_majors.service'
import { abort } from '@/utils/helpers'

export async function getByUniversityId(req, res) {
    try {
        const { universityId } = req.params
        const result = await UniversityMajorsService.getByUniversityId(universityId)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}
