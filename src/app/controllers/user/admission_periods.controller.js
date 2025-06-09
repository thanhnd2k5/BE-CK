import * as AdmissionPeriodsService from '@/app/services/admission_periods.service'
import { abort } from '@/utils/helpers'

export async function getAdmissionPeriodsByUniversityId(req, res) {
    try {
        const { universityId } = req.params
        const result = await AdmissionPeriodsService.getAdmissionPeriodsByUniversityId(universityId)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
} 

export async function getAdmissionPeriodById(req, res) {
    try {
        const { id } = req.params
        const result = await AdmissionPeriodsService.getAdmissionPeriodById(id)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}