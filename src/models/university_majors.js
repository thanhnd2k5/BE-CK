import createModel, { ADMISSION_METHOD } from './base'
import mongoose from 'mongoose'


const UniversityMajors = createModel(
    'UniversityMajors',
    'university_majors', 
    {
        university_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'University' 
        },
        name: {
            type: String,
        },
        code: {
            type: String,
            unique: true,
        },
        admission_methods: {
            type: [String],
            enum: Object.values(ADMISSION_METHOD),
        },
        // Chỉ áp dụng cho học bạ & tốt nghiệp
        subject_combination_ids: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'SubjectCombination'
        }
    }
)

export default UniversityMajors
