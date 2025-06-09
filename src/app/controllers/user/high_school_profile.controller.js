import * as highSchoolProfileService from '../../services/high_school_profile.service'

export async function getProfile(req, res) {
    try {
        const profile = await highSchoolProfileService.getHighSchoolProfile(req.currentUser._id)
        res.json({ success: true, data: profile })
    } catch (err) {
        res.status(404).json({ success: false, message: err.message })
    }
}

export async function updateProfile(req, res) {
    try {
        console.log(req.body)
        const profile = await highSchoolProfileService.updateHighSchoolProfile(req.currentUser._id, req.body)
        res.json({ success: true, data: profile })
    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}
