import createModel from './base'
import { Schema } from 'mongoose'

const AdmissionPeriod = createModel(
    'AdmissionPeriod',
    'admission_periods',
    {
        universityId: {
            type: Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        academicYear: {
            type: String,
            default: '',
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    }
)

export default AdmissionPeriod 