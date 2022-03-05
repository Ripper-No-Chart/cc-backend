"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tracking_models_1 = __importDefault(require("../models/tracking.models"));
const constants_1 = require("../../../constants");
const moment_1 = __importDefault(require("moment"));
class TrackingController {
    /**
     * Create a tracking
     * @param req
     * @param res
     * @returns
     */
    async create(req, res) {
        try {
            const { latitude, longitude } = req.body;
            const _id = req._id;
            const tracking = new tracking_models_1.default({
                user: _id,
                latitude,
                longitude,
                created_at: (0, moment_1.default)().format('x'),
            });
            await tracking.save(); // Save new tracking
            return res.status(constants_1.CREATED).end();
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
    /**
     * Get user tracking from begin and end of date
     * @param req
     * @param res
     * @returns
     */
    async get(req, res) {
        try {
            const { user, date } = req.body;
            const end_date = parseInt((0, moment_1.default)(date).endOf('day').format('x'));
            const begin_date = parseInt((0, moment_1.default)(date).startOf('day').format('x'));
            const result = await tracking_models_1.default.find({ created_at: { $lte: end_date, $gte: begin_date }, user });
            return res.status(constants_1.SUCCESS).json({ result });
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
}
exports.default = new TrackingController();
