import { Application } from '@/models'
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