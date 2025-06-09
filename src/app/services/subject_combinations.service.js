import { SubjectCombination } from '@/models'

export async function createSubjectCombination(data) {
    const subjectCombination = new SubjectCombination(data)
    return await subjectCombination.save()
}

export async function updateSubjectCombination(id, data) {
    return await SubjectCombination.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
    )
}

export async function deleteSubjectCombination(id) {
    return await SubjectCombination.findByIdAndDelete(id)
}

export async function getAllSubjectCombinations() {
    return await SubjectCombination.find()
}

export async function getSubjectCombinationById(id) {
    return await SubjectCombination.findById(id)
} 