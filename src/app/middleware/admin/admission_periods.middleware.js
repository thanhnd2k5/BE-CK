import { AdmissionPeriod } from '@/models'
import { isValidObjectId } from 'mongoose'
import { abort } from '@/utils/helpers'

export const checkAdmissionPeriodExists = async (req, res, next) => {
    const admissionPeriodId = req.params.id
    if (!isValidObjectId(admissionPeriodId)) {
        abort(404, 'Admission period not found')
    }
    const admissionPeriod = await AdmissionPeriod.findById(admissionPeriodId)
    if (!admissionPeriod) {
        abort(404, 'Admission period not found')
    }
    req.admissionPeriod = admissionPeriod
    next()
}