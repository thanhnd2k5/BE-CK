import createModel from './base'

const University = createModel(
    'University',
    'universities',
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            default: '',
            unique: true,
        },
        address: {
            type: String,
            default: '',
        },
    }
)

export default University
