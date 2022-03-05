"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_models_1 = __importDefault(require("../models/user.models"));
const constants_1 = require("../../../constants/");
class UsersMiddleware {
    /**
     * Get phone and check if user exist
     * @param req
     * @param res
     * @param next
     * @returns
     */
    async checkUser(req, res, next) {
        try {
            const { phone } = req.body;
            const userExist = await user_models_1.default.findOne({ 'primary_data.phone': phone }); // Check if user exist
            if (userExist) {
                return res.status(constants_1.BAD_REQUEST).json({ message: 'El usuario ya existe' });
            }
            next();
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
    /**
     * Get Id by phone
     * @param req
     * @param res
     * @param next
     * @returns
     */
    async getId(req, res, next) {
        try {
            const { phone } = req.body;
            const user = await user_models_1.default.findOne({ 'primary_data.phone': phone }); // Check if user exist      
            if (!user) {
                return res.status(constants_1.BAD_REQUEST).json({ message: 'El usuario no existe' });
            }
            req._id = user._id.toString();
            req.phone = phone;
            next();
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
}
exports.default = new UsersMiddleware();
