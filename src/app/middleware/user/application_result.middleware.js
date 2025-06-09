import ApplicationResult from '../../../models/application_results.js'
import Application from '../../../models/applications.js'

export const checkApplicationResultExists = async (req, res, next) => {
    try {
        const { id } = req.params
        const applicationResult = await ApplicationResult.findById(id)
        
        if (!applicationResult) {
            return res.status(404).json({
                success: false,
                message: 'Kết quả xét tuyển không tồn tại',
                data: null
            })
        }
        
        req.applicationResult = applicationResult
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi server',
            data: null
        })
    }
}

export const checkApplicationResultOwnership = async (req, res, next) => {
    try {
        const userId = req.user.id
        const applicationResult = req.applicationResult
        
        const application = await Application.findById(applicationResult.applicationId)
        
        if (application.userId.toString() !== userId) {
            return res.jsonify({
                success: false,
                message: 'Bạn không có quyền truy cập kết quả này',
                data: null
            })
        }
        
        next()
    } catch (error) {
        return res.jsonify({
            success: false,
            message: 'Lỗi server',
            data: null
        })
    }
} 