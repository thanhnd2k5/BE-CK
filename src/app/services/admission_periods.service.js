import AdmissionPeriod from '@/models/admission_periods'
import { abort } from '@/utils/helpers'

function calculateStatus(startDate, endDate) {
    const now = new Date()
    if (now < startDate) return 'pending'
    if (now > endDate) return 'closed'
    return 'open'
}

export async function createAdmissionPeriod(data) {
    const admissionPeriod = await AdmissionPeriod.create(data)
    const result = admissionPeriod.toObject()
    result.status = calculateStatus(result.startDate, result.endDate)
    return result
}

export async function getAllAdmissionPeriods(query = {}) {
    const admissionPeriods = await AdmissionPeriod.find(query)
        .populate('universityId', 'name code')
        .sort({ createdAt: -1 })
    
    return admissionPeriods.map(period => {
        const result = period.toObject()
        result.status = calculateStatus(result.startDate, result.endDate)
        return result
    })
}

export async function getAdmissionPeriodById(id) {
    const admissionPeriod = await AdmissionPeriod.findById(id)
        .populate('universityId', 'name code')
    
    if (!admissionPeriod) {
        abort(404, 'Admission period not found')
    }

    const result = admissionPeriod.toObject()
    result.status = calculateStatus(result.startDate, result.endDate)
    return result
}

export async function updateAdmissionPeriod(id, data) {
    console.log(data)
    const admissionPeriod = await AdmissionPeriod.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    ).populate('universityId', 'name code')

    if (!admissionPeriod) {
        abort(404, 'Admission period not found')
    }

    const result = admissionPeriod.toObject()
    result.status = calculateStatus(result.startDate, result.endDate)
    return result
}

export async function deleteAdmissionPeriod(id) {
    const admissionPeriod = await AdmissionPeriod.findByIdAndDelete(id)

    if (!admissionPeriod) {
        abort(404, 'Admission period not found')
    }

    const result = admissionPeriod.toObject()
    result.status = calculateStatus(result.startDate, result.endDate)
    return result
}

export async function getAdmissionPeriodsByUniversityId(universityId) {
    const admissionPeriods = await AdmissionPeriod.find({ universityId })
        .populate('universityId', 'name code')
        .sort({ createdAt: -1 })
    
    return admissionPeriods.map(period => {
        const result = period.toObject()
        result.status = calculateStatus(result.startDate, result.endDate)
        return result
    })
} 