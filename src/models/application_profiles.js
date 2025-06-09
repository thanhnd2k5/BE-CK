import createModel from './base'
import { Schema } from 'mongoose'

const ApplicationProfile = createModel(
    'ApplicationProfile',
    'application_profile',
    {
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
        },
        gender: {
            type: String,
            default: ''
        },
        dob: {
            type: Date,
            default: ''
        },
        avatar: {
            type: String,
            default: '',
        },
        cccd: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
            default: '',
        },
        ethnic: {
            type: String,
            default: '',
        },
        province: {
            type: String,
            default: '',
        },
        district: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },

        // Thông tin học sinh
        highSchoolName: {
            type: String,
            default: '',
        },
        graduationYear: {
            type: Number,
            default: '',
        },

        // Ưu tiên
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

export default ApplicationProfile

