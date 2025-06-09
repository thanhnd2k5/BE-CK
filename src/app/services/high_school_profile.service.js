import {HighSchoolProfile} from '@/models'

export async function getHighSchoolProfile(userId) {
    const profile = await HighSchoolProfile.findOne({ userId })
    if (!profile) {
        throw new Error('Không tìm thấy thành tích học tập')
    }
    return profile
}

export async function updateHighSchoolProfile(userId, data) {
    const allowedFields = [
        'highSchoolName', 'gpaGrade10', 'gpaGrade11', 'gpaGrade12',
        'graduationYear', 'priorityArea', 'priorityGroup'
    ]
    const updateData = {}
    for (const key of allowedFields) {
        if (data[key]) updateData[key] = data[key]
    }

    const profile = await HighSchoolProfile.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true, upsert: true } // upsert: true để tạo mới nếu chưa có
    )
    return profile
}
