"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_models_1 = __importDefault(require("../models/session.models"));
const constants_1 = require("../../../constants/");
const moment_1 = __importDefault(require("moment"));
class SessionController {
    /**
     * Save start and finish session
     * @param req
     * @param res
     * @returns
     */
    async save(req, res) {
        try {
            const { action } = req.body;
            const _id = req._id;
            const session = new session_models_1.default({
                user: _id,
                action,
                created_at: (0, moment_1.default)().format('x'),
            });
            await session.save(); // Save new session
            return res.status(constants_1.CREATED).end();
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
    /**
     * Get user sessions from begin and end of date
     * @param req
     * @param res
     * @returns
     */
    async get(req, res) {
        try {
            const { user, date } = req.body;
            // Get current date and add milliseconds
            const end_date = parseInt((0, moment_1.default)(date).endOf('day').format('x'));
            const begin_date = parseInt((0, moment_1.default)(date).startOf('day').format('x'));
            const sessions = await session_models_1.default.find({ created_at: { $lte: end_date, $gte: begin_date }, user });
            return res.status(constants_1.SUCCESS).json({ sessions });
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
}
exports.default = new SessionController();
