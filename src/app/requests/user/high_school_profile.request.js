import Joi from 'joi'

export const updateHighSchoolProfileRequest = Joi.object({
    highSchoolName: Joi.string().allow('').label('Tên trường'),
    gpaGrade10: Joi.number().allow('').label('Điểm trung bình lớp 10'),
    gpaGrade11: Joi.number().allow('').label('Điểm trung bình lớp 11'),
    gpaGrade12: Joi.number().allow('').label('Điểm trung bình lớp 12'),
    graduationYear: Joi.number().allow('').label('Năm tốt nghiệp'),
    priorityArea: Joi.string().allow('').label('Khu vực ưu tiên'),
    priorityGroup: Joi.string().allow('').label('Nhóm ưu tiên'),
})

