import * as StatisticsService from '@/app/services/statistics.service'
import { abort } from '@/utils/helpers'


export async function getStatisticsByUniversity(req, res) {
    try {
        const statistics = await StatisticsService.getStatisticsByUniversity()
        res.jsonify(statistics)
    } catch (error) {
        abort(error, res)
    }
}

export async function getStatisticsByMajor(req, res) {
    try {
        const statistics = await StatisticsService.getStatisticsByMajor()
        res.jsonify(statistics)
    } catch (error) {
        abort(error, res)
    }
}

export async function getStatisticsByStatus(req, res) {
    try {
        const statistics = await StatisticsService.getStatisticsByStatus()
        res.jsonify(statistics)
    } catch (error) {
        abort(error, res)
    }
}

export async function getStatisticsByDate(req, res) {
    try {
        const statistics = await StatisticsService.getStatisticsByDate()
        res.jsonify(statistics)
    } catch (error) {
        abort(error, res)
    }
}

export async function getStatisticsByMonth(req, res) {
    try {
        const statistics = await StatisticsService.getStatisticsByMonth()
        res.jsonify(statistics)
    } catch (error) {
        abort(error, res)
    }
}

export async function getStatisticsByYear(req, res) {
    try {
        const statistics = await StatisticsService.getStatisticsByYear()
        res.jsonify(statistics)
    } catch (error) {
        abort(error, res)
    }
}

export async function getStatisticsBetweenUniversities(req, res) {
    try {
        const statistics = await StatisticsService.getStatisticsBetweenUniversities()
        res.jsonify(statistics)
    } catch (error) {
        abort(error, res)
    }
}