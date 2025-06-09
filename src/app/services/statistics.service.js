import Application from '@/models/applications'

export async function getStatisticsByUniversity() {
    try {
        // Kiểm tra xem có dữ liệu không
        const totalApplications = await Application.countDocuments()
        if (totalApplications === 0) {
            return []
        }

        const statistics = await Application.aggregate([
            {
                $lookup: {
                    from: 'university_majors',
                    localField: 'universityMajorId',
                    foreignField: '_id',
                    as: 'major'
                }
            },
            {
                $unwind: '$major'
            },
            {
                $lookup: {
                    from: 'universities',
                    localField: 'major.university_id',
                    foreignField: '_id',
                    as: 'university'
                }
            },
            {
                $unwind: '$university'
            },
            {
                $group: {
                    _id: '$university._id',
                    universityName: { $first: '$university.name' },
                    universityCode: { $first: '$university.code' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ])
        return statistics
    } catch (error) {
        console.error('Error in getStatisticsByUniversity:', error)
        throw error
    }
}

export async function getStatisticsByMajor() {
    try {
        // Kiểm tra xem có dữ liệu không
        const totalApplications = await Application.countDocuments()
        if (totalApplications === 0) {
            return []
        }

        const statistics = await Application.aggregate([
            {
                $lookup: {
                    from: 'university_majors',
                    localField: 'universityMajorId',
                    foreignField: '_id',
                    as: 'major'
                }
            },
            {
                $unwind: '$major'
            },
            {
                $lookup: {
                    from: 'universities',
                    localField: 'major.university_id',
                    foreignField: '_id',
                    as: 'university'
                }
            },
            {
                $unwind: '$university'
            },
            {
                $group: {
                    _id: '$major._id',
                    majorName: { $first: '$major.name' },
                    majorCode: { $first: '$major.code' },
                    universityName: { $first: '$university.name' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ])
        return statistics
    } catch (error) {
        console.error('Error in getStatisticsByMajor:', error)
        throw error
    }
}

export async function getStatisticsByStatus() {
    try {
        // Kiểm tra xem có dữ liệu không
        const totalApplications = await Application.countDocuments()
        if (totalApplications === 0) {
            return []
        }

        const statistics = await Application.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ])
        return statistics
    } catch (error) {
        console.error('Error in getStatisticsByStatus:', error)
        throw error
    }
}

export async function getStatisticsByDate() {
    try {
        const totalApplications = await Application.countDocuments()
        if (totalApplications === 0) {
            return []
        }

        const statistics = await Application.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$created_at' },
                        month: { $month: '$created_at' },
                        day: { $dayOfMonth: '$created_at' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateFromParts: {
                            year: '$_id.year',
                            month: '$_id.month',
                            day: '$_id.day'
                        }
                    },
                    count: 1
                }
            },
            {
                $sort: { date: -1 }
            }
        ])
        return statistics
    } catch (error) {
        console.error('Error in getStatisticsByDate:', error)
        throw error
    }
}

export async function getStatisticsByMonth() {
    try {
        const totalApplications = await Application.countDocuments()
        if (totalApplications === 0) {
            return []
        }

        const statistics = await Application.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$created_at' },
                        month: { $month: '$created_at' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateFromParts: {
                            year: '$_id.year',
                            month: '$_id.month',
                            day: 1
                        }
                    },
                    count: 1
                }
            },
            {
                $sort: { date: -1 }
            }
        ])
        return statistics
    } catch (error) {
        console.error('Error in getStatisticsByMonth:', error)
        throw error
    }
}

export async function getStatisticsByYear() {
    try {
        const totalApplications = await Application.countDocuments()
        if (totalApplications === 0) {
            return []
        }

        const statistics = await Application.aggregate([
            {
                $group: {
                    _id: { year: { $year: '$created_at' } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: '$_id.year',
                    count: 1
                }
            },
            {
                $sort: { year: -1 }
            }
        ])
        return statistics
    } catch (error) {
        console.error('Error in getStatisticsByYear:', error)
        throw error
    }
}

export async function getStatisticsBetweenUniversities() {
    try {
        const totalApplications = await Application.countDocuments()
        if (totalApplications === 0) {
            return []
        }

        const statistics = await Application.aggregate([
            {
                $lookup: {
                    from: 'university_majors',
                    localField: 'universityMajorId',
                    foreignField: '_id',
                    as: 'major'
                }
            },
            {
                $unwind: '$major'
            },
            {
                $lookup: {
                    from: 'universities',
                    localField: 'major.university_id',
                    foreignField: '_id',
                    as: 'university'
                }
            },
            {
                $unwind: '$university'
            },
            {
                $group: {
                    _id: '$university._id',
                    universityName: { $first: '$university.name' },
                    universityCode: { $first: '$university.code' },
                    totalApplications: { $sum: 1 },
                    pendingCount: {
                        $sum: {
                            $cond: [
                                { $eq: ['$status', 'cho_duyet'] },
                                1,
                                0
                            ]
                        }
                    },
                    approvedCount: {
                        $sum: {
                            $cond: [
                                { $eq: ['$status', 'da_duyet'] },
                                1,
                                0
                            ]
                        }
                    },
                    rejectedCount: {
                        $sum: {
                            $cond: [
                                { $eq: ['$status', 'tu_choi'] },
                                1,
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    universityName: 1,
                    universityCode: 1,
                    totalApplications: 1,
                    statusBreakdown: {
                        pending: '$pendingCount',
                        approved: '$approvedCount',
                        rejected: '$rejectedCount'
                    }
                }
            },
            {
                $sort: { totalApplications: -1 }
            }
        ])
        return statistics
    } catch (error) {
        console.error('Error in getStatisticsBetweenUniversities:', error)
        throw error
    }
}