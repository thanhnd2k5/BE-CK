import createModel from './base'
import { Schema } from 'mongoose'

const HighSchoolProfile = createModel(
    'HighSchoolProfile',
    'high_school_profiles',
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true, 
        },
        highSchoolName: {
            type: String,
            default: '',
        },
        gpaGrade10: {
            type: Number,
            default: '',
        },
        gpaGrade11: {
            type: Number,
            default: '',
        },
        gpaGrade12: {
            type: Number,
            default: '',
        },
        graduationYear: {
            type: Number,
            default: '',
        },
        priorityArea: {
            type: String,
            default: '',
        },
        priorityGroup: {
            type: String,
            default: '',
        },
    }  
)

export default HighSchoolProfile

