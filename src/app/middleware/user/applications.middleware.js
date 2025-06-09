import { Application, AdmissionPeriod } from '@/models'
import { isValidObjectId } from 'mongoose'
import { abort } from '@/utils/helpers'

export const checkApplicationExists = async (req, res, next) => {
    const applicationId = req.params.applicationId || req.body.application_id
    if (!isValidObjectId(applicationId)) {
        abort(404, 'Application not found')
    }
    const application = await Application.findById(applicationId)
    if (!application) {
        abort(404, 'Application not found')
    }
    req.application = application
    next()
}

export const checkAdmissionPeriodOpen = async (req, res, next) => {
    const admissionPeriodId = req.body.admissionPeriodId
    if (!admissionPeriodId) {
        abort(400, 'Admission period ID is required')
    }
    if (!isValidObjectId(admissionPeriodId)) {
        abort(400, 'Invalid admission period ID')
    }

    const admissionPeriod = await AdmissionPeriod.findById(admissionPeriodId)
    if (!admissionPeriod) {
        abort(404, 'Admission period not found')
    }
    const status = calculateStatus(admissionPeriod.startDate, admissionPeriod.endDate)
    if (status !== 'open') {
        abort(400, 'Admission period is not open')
    }

    req.admissionPeriod = admissionPeriod
    next()
}

function calculateStatus(startDate, endDate) {
    const now = new Date()
    if (now < startDate) return 'pending'
    if (now > endDate) return 'closed'
    return 'open'
}