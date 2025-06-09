import mongoose from 'mongoose'

export default function createModel(name, collection, definition, options) {
    const schema = new mongoose.Schema(definition, {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        versionKey: false,
        id: false,
        toJSON: {getters:true, virtuals: true},
        ...(options ?? {}),
    })

    return mongoose.model(name, schema, collection)
}

export const {ObjectId} = mongoose.Types

export const ROLE = {
    SUPER_ADMIN: 'super-admin'
}

export const PERMISSION = {
    SUPER_ADMIN: 'super-admin',
    // Role management
    LIST_ROLE: 'list-role',
    CREATE_ROLE: 'create-role',
    UPDATE_ROLE: 'update-role',
    DELETE_ROLE: 'delete-role',

    // Permission management
    UPDATE_PERMISSION_FOR_ROLE: 'update-permission-for-role',
}

export const USER_PERMISSION = {
    // Club management
    REMOVE_MEMBER: 'remove-member',
    ACCEPT_MEMBER: 'accept-member'
}

export const USER_ROLE = {
    MANAGER: 'manager',
    CENSOR: 'censor'
}

export const STATUS_ACCOUNT = {
    ACTIVE: 'ACTIVE',
    DE_ACTIVE: 'DE_ACTIVE',
}

export const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
}

export const ADMISSION_METHOD = {
    HOC_BA: 'hoc_ba',
    TOT_NGHIEP: 'tot_nghiep',
    DGNL: 'dgnl',
    TU_DUY: 'tu_duy'
}

export const ADMISSION_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
}

export const DOCUMENT_TYPE = {
    IDENTITY_CARD: 'identity_card',
    HIGH_SCHOOL_CERTIFICATE: 'high_school_certificate',
    DGNL_CERTIFICATE: 'dgnl_certificate',
    TU_DUY_CERTIFICATE: 'tu_duy_certificate',
    OTHER: 'other'
}

export const NOTIFICATION_TYPE = {
    APPLICATION_STATUS_UPDATE: 'application_status_update',
    APPLICATION_RESULT_UPDATE: 'application_result_update',
}

export const STATUS_APPLICATION = {
    PENDING: 'cho_duyet',
    APPROVED: 'da_duyet',
    REJECTED: 'tu_choi'
}