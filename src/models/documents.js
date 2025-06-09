import createModel from './base'
import { Schema } from 'mongoose'

const Document = createModel(
    'Document',
    'documents',
    {
        applicationId: {
            type: Schema.Types.ObjectId,
            ref: 'Application',
            required: true,
        },
        //hoc_ba, tot_nghiep, dgnl, tu_duy, ccccd
        type: {
            type: String,
            default: '',
        },
        fileUrl: {
            type: String,
            default: '',
        },
        fileType: {
            type: String,
            default: '',
        }
    }
)

export default Document
