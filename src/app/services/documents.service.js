import { Document } from '@/models'
import { FileUpload } from '@/utils/classes'

export async function createDocument(data) {
    // Nếu có file object (multer hoặc FileUpload), lưu file và lấy đường dẫn
    let fileUrl = null
    if (data.file) {
        // Nếu là instance của FileUpload (tự custom), dùng save()
        if (data.file.save) {
            fileUrl = await data.file.save()
        }
        // Nếu là file multer (có .path), lấy path luôn
        else if (data.file.path) {
            fileUrl = data.file.path
        }
    }
    const document = await Document.create({
        applicationId: data.applicationId,
        type: data.type,
        fileType: data.fileType,
        fileUrl: fileUrl,
    })
    return document
}

export async function updateDocument(documentData, data) {
    if (data.file && documentData.file && data.file !== documentData.file) {
        FileUpload.remove(documentData.file)
        data.file = await data.file.save()
        documentData.file = data.file
    }
    const document = await Document.findByIdAndUpdate(documentData._id, data, { new: true })
    return document
}

export async function deleteDocument(id) {
    const document = await Document.findByIdAndDelete(id)
    return document
}

export async function getDocumentById(id) {
    const document = await Document.findById(id)
    return document
}

export async function getDocumentsByApplicationId(applicationId) {
    const documents = await Document.find({ applicationId })
    return documents
} 