import * as ApplicationResultService from '@/app/services/application_results.service'
import { abort } from '@/utils/helpers'

export async function createApplicationResult(req, res) {
    const { application_id, ...resultData } = req.body
    console.log(application_id, resultData)
    const result = await ApplicationResultService.createApplicationResult(application_id, resultData)
    
    return res.jsonify(result)
}


// Lấy kết quả theo ID
export async function getApplicationResultById(req, res) {
    try {
        const { id } = req.params
        const result = await ApplicationResultService.getApplicationResultById(id)
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Kết quả không tồn tại',
                data: null
            })
        }
        
        return res.jsonify(result)
    } catch (error) {
        abort(error)
    }
}

// Lấy kết quả theo application ID
export async function getApplicationResultByApplicationId(req, res) {
    try {
        const { applicationId } = req.params
        const result = await ApplicationResultService.getApplicationResultByApplicationId(applicationId)
        
        return res.jsonify(result)
    } catch (error) {
        abort(error)
    }
}

// Lấy danh sách kết quả của user
export async function getByUser(req, res) {
    try {
        const userId = req.currentUser._id
        const results = await ApplicationResultService.getApplicationResultsByUser(userId)
        
        return res.jsonify(results)
    } catch (error) {
        abort(error)
    }
}

// Cập nhật kết quả
export async function updateApplicationResult(req, res) {
    try {
        const { id } = req.params
        const resultData = req.body
        const result = await ApplicationResultService.updateApplicationResult(id, resultData)
        
        return res.jsonify(result)
    } catch (error) {
        abort(error)
    }
}

// Xóa kết quả
export async function deleteApplicationResult(req, res) {
    try {
        const { id } = req.params
        const result = await ApplicationResultService.deleteApplicationResult(id)
        
        return res.jsonify(result)
    } catch (error) {
        abort(error)
    }
}