"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_models_1 = __importDefault(require("../models/user.models"));
const constants_1 = require("../../../constants");
class UserController {
    /**
     * Create a single user
     * @param req
     * @param res
     * @returns
     */
    async createUser(req, res) {
        try {
            const { primary_data, billing_data } = req.body;
            const user = new user_models_1.default({
                primary_data,
                billing_data,
            });
            await user.save(); // Save new user
            return res.status(constants_1.CREATED).end();
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
    /**
     * Edit user
     * @param req
     * @param res
     * @returns
     */
    async editUser(req, res) {
        try {
            const { primary_data, billing_data } = req.body;
            const _id = req._id;
            await user_models_1.default.updateOne({ _id }, { $set: { primary_data, billing_data } });
            return res.status(constants_1.SUCCESS).json({ message: 'Usuario editado' });
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
    /**
     * Get all users list
     * @param req
     * @param res
     * @returns
     */
    async getUsers(req, res) {
        try {
            const result = await user_models_1.default.find({});
            return res.status(constants_1.SUCCESS).json({ result });
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
    /**
     * Get single user
     * @param req
     * @param res
     * @returns
     */
    async getUser(req, res) {
        try {
            const result = (await user_models_1.default.find({ _id: req.body })).pop();
            return res.status(constants_1.SUCCESS).json({ result });
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
    /**
     * Delete single user
     * @param req
     * @param res
     * @returns
     */
    async deleteUser(req, res) {
        try {
            const _id = req._id;
            await user_models_1.default.findByIdAndDelete(_id);
            return res.status(constants_1.SUCCESS).json({ message: 'Usuario eliminado' });
        }
        catch (e) {
            return res.status(constants_1.INTERNAL_ERROR).json({ error: e.message });
        }
    }
}
exports.default = new UserController();
