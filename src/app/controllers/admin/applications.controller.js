import * as ApplicationsService from '@/app/services/applications.service'
import * as MailService from '@/app/services/mail.service'
import { abort } from '@/utils/helpers'

export async function updateApplicationStatus(req, res) {
    const applicationId = req.application._id
    const { status } = req.body

    // Validate status
    const validStatuses = ['cho_duyet', 'da_duyet', 'tu_choi']
    if (!validStatuses.includes(status)) {
        abort(400, 'Invalid status')
    }

    // Update status
    const application = await ApplicationsService.updateApplicationStatus(applicationId, status)

    // Send email notification
    await MailService.sendApplicationStatusEmail(application)

    res.jsonify(application)
}

// Thêm route để lấy tất cả đơn xét tuyển cho admin
export async function getAllApplications(req, res) {
    try {
        const applications = await ApplicationsService.getAllApplications()
        res.jsonify(applications)
    } catch (error) {
        abort(error, res)
    }
}

// Lấy đơn xét tuyển theo trường
export async function getApplicationsByUniversity(req, res) {
    try {
        const universityId = req.university._id
        const applications = await ApplicationsService.getApplicationsByUniversity(universityId)
        res.jsonify(applications)
    } catch (error) {
        abort(error, res)
    }
}

export async function getCompleteApplicationById(req, res) {
    const applicationId = req.application._id
    const application = await ApplicationsService.getCompleteApplicationById(applicationId)
    res.jsonify(application)
}

export async function searchApplications(req, res) {
    try {
        const filters = {
            universityName: req.query.universityName,
            applicationCode: req.query.applicationCode,
            status: req.query.status,
            admissionMethod: req.query.admissionMethod,
            startDate: req.query.startDate,
            endDate: req.query.endDate
        }

        const applications = await ApplicationsService.searchAllApplications(filters)
        res.jsonify(applications)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// export async function getApplicationsGroupedByMajor(req, res) {
//     try {
//         const groupedApplications = await ApplicationsService.getApplicationsGroupedByMajor()
//         res.jsonify(groupedApplications)
//     } catch (error) {
//         abort(error, res)
//     }
// }

export async function getApplicationsGroupedByMajorOfUniversity(req, res) {
    try {
        const universityId = req.university._id
        const groupedApplications = await ApplicationsService.getApplicationsGroupedByMajorOfUniversity(universityId)
        res.jsonify(groupedApplications)
    } catch (error) {
        abort(error, res)
    }
}