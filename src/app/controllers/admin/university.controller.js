import * as universityService from '@/app/services/university.service'

export async function getAll(req, res) {
    const universities = await universityService.getAllUniversities()
    res.json({ success: true, data: universities })
}

export async function getOne(req, res) {
    const university = await universityService.getUniversityById(req.university._id)
    if (!university) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy trường đại học' })
    }
    res.jsonify(university)
}

export async function create(req, res) {
    const university = await universityService.createUniversity(req.body)
    res.status(201).jsonify(university)
}

export async function update(req, res) {
    const university = await universityService.updateUniversity(req.university._id, req.body)
    res.jsonify(university)
}

export async function remove(req, res) {
    const university = await universityService.deleteUniversity(req.university._id)
    if (!university) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy trường đại học' })
    }
    res.jsonify({ message: 'Xoá thành công' })
}
