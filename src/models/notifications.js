import createModel from './base'

const Notification = createModel(
    'Notification',
    'notifications',
    {
        userId: {
            type: String,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            required: true,
        }
    }
)

export default Notification
