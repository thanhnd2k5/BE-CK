import {Application, Document, University, UniversityMajors} from '@/models'
import * as ApplicationResultService from './application_results.service'
import * as DocumentService from './documents.service'
import * as ApplicationProfileService from './application_profiles.service'
import { abort } from '@/utils/helpers'

export async function createApplication(userId, data) {
    const application = await Application.create({ ...data, userId })
    return application
}

export async function updateApplication(id, userId, data) {
    const application = await Application.findByIdAndUpdate(id, { ...data, userId }, { new: true })
    return application
}

export async function deleteApplication(id) {
    // Xóa tất cả documents liên quan
    await Document.deleteMany({ applicationId: id })
    // Xóa application
    const application = await Application.findByIdAndDelete(id)
    return application
}

export async function getApplicationById(id) {
    const application = await Application.findById(id)
        .populate('userId', 'name email')
        .populate('universityMajorId')
        .populate('subjectCombinationId')
        .populate('admissionPeriodId')

    return application
}

export async function getAllApplicationsByUserId(userId) {
    const applications = await Application.find({ userId })
        .populate('userId')
        .populate('universityMajorId')
        .populate('subjectCombinationId')
        .populate('admissionPeriodId')

    return applications
}

export async function createCompleteApplication(userId, formData) {
    const { applicationData, resultData, documentsData, profileData } = formData
    // 1. Tạo đơn xét tuyển
    const application = new Application({
        userId,
        universityMajorId: applicationData.universityMajorId,
        admissionPeriodId: applicationData.admissionPeriodId,
        subjectCombinationId: applicationData.subjectCombinationId || null,
        admissionMethod: applicationData.admissionMethod,
        status: 'cho_duyet'
    })
    await application.save()

    // 2. Tạo profile
    const profile = await ApplicationProfileService.createApplicationProfile({
        applicationId: application._id,
        ...profileData
    })

    // 3. Tạo kết quả nếu có
    let applicationResult = null
    if (resultData && resultData.method) {
        applicationResult = await ApplicationResultService.createApplicationResult(
            application._id,
            resultData
        )
    }

    // 4. Tạo tài liệu nếu có
    const createdDocuments = []
    if (documentsData && Array.isArray(documentsData)) {
        for (const document of documentsData) {
            const createdDocument = await DocumentService.createDocument({
                applicationId: application._id,
                ...document
            })
            createdDocuments.push(createdDocument)
        }
    }

    // 5. Trả về kết quả
    return {
        application,
        profile,
        applicationResult,
        documents: createdDocuments
    }
}

// Lấy chi tiết đơn xét tuyển (bao gồm kết quả và tài liệu)
export async function getCompleteApplicationById(applicationId) {
    // 1. Lấy đơn xét tuyển
    const application = await Application.findById(applicationId)
        .populate('userId', 'name email')
        .populate('universityMajorId')
        .populate('subjectCombinationId')
        .populate('admissionPeriodId')
        .lean()


    if (!application){
        abort(404, 'Application not found')
    }

    // 2. Lấy tên trường đại học và gán vào application
    const university = await University.findById(application.universityMajorId.university_id).lean()
    application.universityMajorId.university = university.name


    // 2. Lấy profile
    const profile = await ApplicationProfileService.getApplicationProfileByApplicationId(applicationId)
    console.log(profile)
    // 3. Lấy kết quả xét tuyển
    const applicationResult = await ApplicationResultService.getApplicationResultByApplicationId(applicationId)

    // 4. Lấy danh sách tài liệu
    const documents = await Document.find({ applicationId })

    // 5. Trả về đầy đủ
    return {
        application,
        profile,
        applicationResult,
        documents
    }
}

export async function updateApplicationStatus(id, status) {
    const application = await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    ).populate('userId', 'name email')
        .populate('universityMajorId')
        .populate('subjectCombinationId')

    if (!application) {
        abort(404, 'Application not found')
    }

    return application
}

export async function getAllApplications() {
    const applications = await Application.find()
        .populate('userId', 'name email')
        .populate('universityMajorId')
        .populate('subjectCombinationId')
        .populate('admissionPeriodId')
        .sort({ createdAt: -1 })

    return applications
}

// Lấy đơn xét tuyển theo trường
export async function getApplicationsByUniversity(universityId) {
    const applications = await Application.find()
        .populate({
            path: 'universityMajorId',
            match: { university_id: universityId }
        })
        .populate('userId', 'name email')
        .populate('subjectCombinationId')
        .populate('admissionPeriodId')
        .sort({ createdAt: -1 })

    // Lọc ra các đơn có universityMajorId khác null (tức là match với universityId)
    return applications.filter(app => app.universityMajorId !== null)
}

// Tìm kiếm cho user (chỉ tìm trong đơn của user đó)
export async function searchUserApplications(userId, filters) {
    const query = { userId }
    
    if (filters.universityName) {
        const universities = await University.find({
            name: { $regex: filters.universityName, $options: 'i' }
        })
        
        if (universities.length > 0) {
            const universityIds = universities.map(u => u._id)
            query['universityMajorId'] = {
                $in: await UniversityMajors.find({
                    university_id: { $in: universityIds }
                }).distinct('_id')
            }
        }
    }
    
    if (filters.applicationCode) {
        query.applicationCode = filters.applicationCode
    }
    if (filters.status) {
        query.status = filters.status
    }
    if (filters.admissionMethod) {
        query.admissionMethod = filters.admissionMethod
    }
    if (filters.startDate && filters.endDate) {
        query.created_at = {
            $gte: new Date(filters.startDate),
            $lte: new Date(filters.endDate)
        }
    }
    if (filters.admissionPeriodId) {
        query.admissionPeriodId = filters.admissionPeriodId
    }

    const applications = await Application.find(query)
        .populate({
            path: 'universityMajorId',
            populate: {
                path: 'university_id',
                model: 'University'
            }
        })
        .populate('subjectCombinationId')
        .populate('admissionPeriodId')
        .sort({ created_at: -1 })

    return applications
}

// Tìm kiếm cho admin (tìm tất cả đơn)
export async function searchAllApplications(filters) {
    const query = {}
    
    if (filters.universityName) {
        const universities = await University.find({
            name: { $regex: filters.universityName, $options: 'i' }
        })
        
        if (universities.length > 0) {
            const universityIds = universities.map(u => u._id)
            query['universityMajorId'] = {
                $in: await UniversityMajors.find({
                    university_id: { $in: universityIds }
                }).distinct('_id')
            }
        }
    }
    
    if (filters.applicationCode) {
        query.applicationCode = filters.applicationCode
    }
    if (filters.status) {
        query.status = filters.status
    }
    if (filters.admissionMethod) {
        query.admissionMethod = filters.admissionMethod
    }
    if (filters.startDate && filters.endDate) {
        query.created_at = {
            $gte: new Date(filters.startDate),
            $lte: new Date(filters.endDate)
        }
    }
    if (filters.admissionPeriodId) {
        query.admissionPeriodId = filters.admissionPeriodId
    }

    const applications = await Application.find(query)
        .populate('userId', 'name email')
        .populate({
            path: 'universityMajorId',
            populate: {
                path: 'university_id',
                model: 'University'
            }
        })
        .populate('subjectCombinationId')
        .populate('admissionPeriodId')
        .sort({ created_at: -1 })

    return applications
}

// Lấy đơn xét tuyển và nhóm theo ngành của một trường cụ thể
export async function getApplicationsGroupedByMajorOfUniversity(universityId) {
    const applications = await Application.find()
        .populate({
            path: 'universityMajorId',
            match: { university_id: universityId },
            populate: {
                path: 'university_id',
                model: 'University'
            }
        })
        .populate('userId', 'name email')
        .populate('subjectCombinationId')
        .populate('admissionPeriodId')
        .sort({ createdAt: -1 })

    // Lọc ra các đơn có universityMajorId khác null (tức là match với universityId)
    const filteredApplications = applications.filter(app => app.universityMajorId !== null)

    // Nhóm đơn theo ngành
    const groupedApplications = filteredApplications.reduce((acc, application) => {
        const majorId = application.universityMajorId._id
        const majorName = application.universityMajorId.name
        const universityName = application.universityMajorId.university_id.name

        if (!acc[majorId]) {
            acc[majorId] = {
                majorId,
                majorName,
                universityName,
                applications: []
            }
        }

        acc[majorId].applications.push(application)
        return acc
    }, {})

    // Chuyển đổi object thành array
    return Object.values(groupedApplications)
}
