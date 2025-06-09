import * as AdmissionPeriodsService from '@/app/services/admission_periods.service'
import { abort } from '@/utils/helpers'

export async function createAdmissionPeriod(req, res) {
    try {
        const data = req.body
        console.log(data)
        const result = await AdmissionPeriodsService.createAdmissionPeriod(data)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}

export async function getAllAdmissionPeriods(req, res) {
    try {
        const query = req.query
        const result = await AdmissionPeriodsService.getAllAdmissionPeriods(query)
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

export async function updateAdmissionPeriod(req, res) {
    try {
        const { id } = req.params
        const data = req.body
        const result = await AdmissionPeriodsService.updateAdmissionPeriod(id, data)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}

export async function deleteAdmissionPeriod(req, res) {
    try {
        const { id } = req.params
        const result = await AdmissionPeriodsService.deleteAdmissionPeriod(id)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
}

export async function getAdmissionPeriodsByUniversityId(req, res) {
    try {
        const { universityId } = req.params
        const result = await AdmissionPeriodsService.getAdmissionPeriodsByUniversityId(universityId)
        res.jsonify(result)
    } catch (error) {
        abort(error, res)
    }
} 