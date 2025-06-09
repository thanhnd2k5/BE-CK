import * as ApplicationsService from '@/app/services/applications.service'
import * as DocumentsService from '@/app/services/documents.service'
import * as ApplicationsResultService from '@/app/services/application_results.service'
import * as MailService from '@/app/services/mail.service'
import { abort } from '@/utils/helpers'

export async function createApplication(req, res) {
    const application = await ApplicationsService.createApplication(req.currentUser._id, req.body)
    res.jsonify(application)
}

export async function updateApplication(req, res) {
    const application = await ApplicationsService.updateApplication(req.application._id, req.currentUser._id, req.body)
    res.jsonify(application)
}

export async function deleteApplication(req, res) {
    const application = await ApplicationsService.deleteApplication(req.application._id, req.currentUser._id)
    res.jsonify(application)
}

export async function getApplicationById(req, res) {
    const application = await ApplicationsService.getApplicationById(req.application._id, req.currentUser._id)
    if (!application) {
        abort(404, 'Application not found')
    }
    const documents = await DocumentsService.getDocumentsByApplicationId(req.application._id)
    const applicationResult = await ApplicationsResultService.getApplicationResultByApplicationId(req.application._id)
    res.jsonify({ ...application.toObject(), documents, applicationResult })
}

export async function getAllApplicationsByUserId(req, res) {
    const applications = await ApplicationsService.getAllApplicationsByUserId(req.currentUser._id)
    res.jsonify(applications)
}

export async function createCompleteApplication(req, res) {
    try {
        const applicationData = {
            universityMajorId: req.body.universityMajorId,
            subjectCombinationId: req.body.subjectCombinationId,
            admissionPeriodId: req.body.admissionPeriodId,
            admissionMethod: req.body.admissionMethod,
        }
        const resultData = JSON.parse(req.body.resultData)
        const documentsData = parseDocumentsData(req)
        const profileData = JSON.parse(req.body.profileData)
        
        const result = await ApplicationsService.createCompleteApplication(
            req.currentUser._id,
            { applicationData, resultData, documentsData, profileData }
        )

        const dataEmail = await ApplicationsService.getCompleteApplicationById(result.application._id)
        // Gửi email xác nhận đơn xét tuyển với đầy đủ thông tin
        await MailService.sendNewApplicationEmail(dataEmail)

        res.jsonify(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function getCompleteApplicationById(req, res) {
    const applicationId = req.application._id
    const application = await ApplicationsService.getCompleteApplicationById(applicationId)
    res.jsonify(application)
}

function parseDocumentsData(req) {
    const documentsData = []
    let idx = 0
    while (
        req.body[`documentsData[${idx}].type`] ||
        req.body[`documentsData[${idx}].fileType`] ||
        (req.files && req.files.find(f => f.fieldname === `documentsData[${idx}].file`)) ||
        req.body[`documentsData[${idx}].file`]
    ) {
        let fileObj = null
        if (req.files && req.files.find(f => f.fieldname === `documentsData[${idx}].file`)) {
            fileObj = req.files.find(f => f.fieldname === `documentsData[${idx}].file`)
        } else if (req.body[`documentsData[${idx}].file`]) {
            fileObj = req.body[`documentsData[${idx}].file`]
        }
        documentsData.push({
            type: req.body[`documentsData[${idx}].type`],
            fileType: req.body[`documentsData[${idx}].fileType`],
            file: fileObj,
        })
        idx++
    }
    return documentsData
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

        const applications = await ApplicationsService.searchUserApplications(req.currentUser._id, filters)
        res.jsonify(applications)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}