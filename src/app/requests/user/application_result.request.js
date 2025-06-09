import Joi from 'joi'

export const createApplicationResultSchema = Joi.object({
    application_id: Joi.string().required().messages({
        'string.empty': 'ID đơn xét tuyển không được để trống',
        'any.required': 'ID đơn xét tuyển là bắt buộc'
    }),
    method: Joi.string().valid('hoc_ba', 'thpt', 'dgnl', 'tu_duy').required().messages({
        'string.empty': 'Phương thức không được để trống',
        'any.required': 'Phương thức là bắt buộc',
        'any.only': 'Phương thức phải là một trong: hoc_ba, thpt, dgnl, tu_duy'
    }),
    // Cho phương thức học bạ
    gpaGrade10: Joi.when('method', {
        is: 'hoc_ba',
        then: Joi.number().min(0).max(10).required().messages({
            'number.min': 'Điểm học bạ lớp 10 không được nhỏ hơn 0',
            'number.max': 'Điểm học bạ lớp 10 không được lớn hơn 10'
        }),
        otherwise: Joi.number().optional()
    }),
    gpaGrade11: Joi.when('method', {
        is: 'hoc_ba',
        then: Joi.number().min(0).max(10).required().messages({
            'number.min': 'Điểm học bạ lớp 11 không được nhỏ hơn 0',
            'number.max': 'Điểm học bạ lớp 11 không được lớn hơn 10'
        }),
        otherwise: Joi.number().optional()
    }),
    gpaGrade12: Joi.when('method', {
        is: 'hoc_ba',
        then: Joi.number().min(0).max(10).required().messages({
            'number.min': 'Điểm học bạ lớp 12 không được nhỏ hơn 0',
            'number.max': 'Điểm học bạ lớp 12 không được lớn hơn 10'
        }),
        otherwise: Joi.number().optional()
    }),
    // Cho phương thức THPT
    subjectScores: Joi.when('method', {
        is: 'thpt',
        then: Joi.object().required().messages({
            'object.base': 'Điểm thi phải là một đối tượng'
        }),
        otherwise: Joi.object().optional()
    }),
    // Cho phương thức DGNL, tư duy
    totalScore: Joi.when('method', {
        is: Joi.string().valid('dgnl', 'tu_duy'),
        then: Joi.number().min(0).required().messages({
            'number.min': 'Điểm tổng kết không được nhỏ hơn 0'
        }),
        otherwise: Joi.number().optional()
    })
})

export const updateApplicationResultSchema = Joi.object({
    method: Joi.string().valid('hoc_ba', 'thpt', 'dgnl', 'tu_duy').optional(),
    gpaGrade10: Joi.number().min(0).max(10).optional(),
    gpaGrade11: Joi.number().min(0).max(10).optional(),
    gpaGrade12: Joi.number().min(0).max(10).optional(),
    subjectScores: Joi.object().optional(),
    totalScore: Joi.number().min(0).optional()
})