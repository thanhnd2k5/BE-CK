import { University } from '@/models'

export async function getAllUniversities() {
    const universities = await University.find()
    return universities
}

export async function getUniversityById(id) {
    const university = await University.findById(id)
    return university
}

export async function createUniversity(data) {
    const university = new University(data)
    await university.save()
    return university
}

export async function updateUniversity(id, data) {
    const university = await University.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    return university
}

export async function deleteUniversity(id) {
    const university = await University.findByIdAndDelete(id)
    return university
}

export async function getUniversitiesByAdmissionMethod(admissionMethod) {
    const universities = await University.aggregate([
        {
            $lookup: {
                from: 'university_majors',
                localField: '_id',
                foreignField: 'university_id',
                as: 'majors'
            }
        },
        {
            $match: {
                'majors.admission_methods': admissionMethod
            }
        }
    ])
    return universities
}
