import createModel from './base'
import { Schema } from 'mongoose'

const ApplicationResult = createModel(
    'ApplicationResult',
    'application_results',
    {
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
            required: true,
        },
        //phương thức học bạ, tốt nghiệp, tư duy, dgnl
        method: {
            type: String,
            default: '',
        },
        // chỉ dùng cho phương thức học bạ 
        gpaGrade10: {
            type: Number,
            default: 0,
        },
        gpaGrade11: {
            type: Number,
            default: 0,
        },
        gpaGrade12: {
            type: Number,
            default: 0,
        },
        // chỉ dùng cho phương thức tốt nghiệp
        subjectScores: {
            type: Object,
            default: {},
        },
        // chỉ dùng cho phương thức tư duy, dgnl
        totalScore: {
            type: Number,
            default: 0,
        },
    }
)

export default ApplicationResult

