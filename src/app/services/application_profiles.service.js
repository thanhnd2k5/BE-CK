import ApplicationProfile from '@/models/application_profiles'

export async function createApplicationProfile(data) {
    const profile = await ApplicationProfile.create(data)
    return profile
}

export async function getApplicationProfileByApplicationId(applicationId) {
    const profile = await ApplicationProfile.findOne({ applicationId })
    return profile
} 