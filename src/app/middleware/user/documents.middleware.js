import { Document } from '@/models'
import { isValidObjectId } from 'mongoose'
import { abort } from '@/utils/helpers'

export const checkDocumentExists = async (req, res, next) => {
    const documentId = req.params.documentId || req.body.document_id
    if (!isValidObjectId(documentId)) {
        abort(404, 'Document not found')
    }
    const document = await Document.findById(documentId)
    if (!document) {
        abort(404, 'Document not found')
    }
    req.document = document
    next()
}
