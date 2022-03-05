"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const user_middlewares_1 = __importDefault(require("../middlewares/user.middlewares"));
const router = (0, express_1.Router)();
router.post('/create_user', user_middlewares_1.default.checkUser, user_controllers_1.default.createUser);
router.post('/edit_user', user_middlewares_1.default.getId, user_controllers_1.default.editUser);
router.post('/get_users', user_controllers_1.default.getUsers);
router.post('/get_user', user_controllers_1.default.getUser);
router.post('/delete_user', user_middlewares_1.default.getId, user_controllers_1.default.deleteUser);
exports.default = router;
