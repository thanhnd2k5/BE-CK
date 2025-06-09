import createModel from './base'

const SubjectCombination = createModel(
    'SubjectCombination',
    'subject_combinations',
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        subjects: {
            type: [String],
            default: [],
        },
    }
)

export default SubjectCombination
