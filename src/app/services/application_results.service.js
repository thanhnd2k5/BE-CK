import ApplicationResult from '../../models/application_results.js'
import Application from '../../models/applications.js'

// Tạo kết quả cho đơn xét tuyển
export async function createApplicationResult(application_id, resultData) {
    // Kiểm tra application có tồn tại không
    const application = await Application.findById(application_id)
    if (!application) {
        throw new Error('Đơn xét tuyển không tồn tại')
    }

    // Kiểm tra đã có kết quả chưa
    const existingResult = await ApplicationResult.findOne({ application_id })
    if (existingResult) {
        throw new Error('Đơn xét tuyển đã có kết quả')
    }

    const applicationResult = new ApplicationResult({
        applicationId: application_id,
        method: resultData.method,
        ...this.processResultData(resultData)
    })

    await applicationResult.save()
    return applicationResult

}

// Lấy kết quả theo ID
export async function getApplicationResultById(id) {
    const result = await ApplicationResult.findById(id)
    return result
}

// Lấy kết quả theo application ID
export async function getApplicationResultByApplicationId(applicationId) {
    const result = await ApplicationResult.findOne({ applicationId })
    return result
}

// Cập nhật kết quả
export async function updateApplicationResult(id, resultData) {
    const existingResult = await ApplicationResult.findById(id)
    if (!existingResult) {
        throw new Error('Kết quả không tồn tại')
    }

    const updateData = {
        method: resultData.method,
        ...this.processResultData(resultData)
    }

    const updatedResult = await ApplicationResult.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )

    return updatedResult
}

// Xóa kết quả
export async function deleteApplicationResult(id) {
    const result = await ApplicationResult.findById(id)
    if (!result) {
        throw new Error('Kết quả không tồn tại')
    }

    await ApplicationResult.findByIdAndDelete(id)
    return { message: 'Xóa kết quả thành công' }
}

// Lấy danh sách kết quả theo user
export async function getApplicationResultsByUser(userId) {
    const results = await ApplicationResult.find()
        .populate({
            path: 'applicationId',
            match: { userId },
            populate: [
                { path: 'userId', select: 'name email' },
                { path: 'universityMajorId' },
                { path: 'subjectCombinationId' }
            ]
        })

    // Filter out null applicationId (when match doesn't find anything)
    return results.filter(result => result.applicationId !== null)
}

// Xử lý dữ liệu kết quả theo phương thức
export function processResultData(resultData) {
    const processedData = {}

    switch (resultData.method) {
        case 'hoc_ba':
            processedData.gpaGrade10 = resultData.gpaGrade10 || 0
            processedData.gpaGrade11 = resultData.gpaGrade11 || 0
            processedData.gpaGrade12 = resultData.gpaGrade12 || 0
            processedData.subjectScores = {}
            processedData.totalScore = 0
            break

        case 'tot_nghiep':
            processedData.subjectScores = resultData.subjectScores || {}
            processedData.gpaGrade10 = 0
            processedData.gpaGrade11 = 0
            processedData.gpaGrade12 = 0
            processedData.totalScore = 0
            break

        case 'dgnl':
        case 'tu_duy':
            processedData.totalScore = resultData.totalScore || 0
            processedData.gpaGrade10 = 0
            processedData.gpaGrade11 = 0
            processedData.gpaGrade12 = 0
            processedData.subjectScores = {}
            break

        default:
            processedData.gpaGrade10 = 0
            processedData.gpaGrade11 = 0
            processedData.gpaGrade12 = 0
            processedData.subjectScores = {}
            processedData.totalScore = 0
    }

    return processedData
}

// Tính toán điểm tổng kết
export function calculateFinalScore(resultData) {
    switch (resultData.method) {
        case 'hoc_ba':
            return (resultData.gpaGrade10 + resultData.gpaGrade11 + resultData.gpaGrade12 * 2) / 4

        case 'thpt': {
            const scores = Object.values(resultData.subjectScores)
            return scores.reduce((sum, score) => sum + score, 0)
        }

        case 'dgnl':
        case 'tu_duy':
            return resultData.totalScore

        default:
            return 0
    }
}
