import { UniversityMajors } from '@/models'

export async function createUniversityMajors(data) {
    const universityMajor = new UniversityMajors(data)
    return await universityMajor.save()
}

export async function updateUniversityMajors(id, data) {
    return await UniversityMajors.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    )
}

export async function deleteUniversityMajors(id) {
    return await UniversityMajors.findByIdAndDelete(id)
}

export async function getByUniversityId(universityId) {
    return await UniversityMajors.find({ university_id: universityId })
        .populate('subject_combination_ids')
}
