"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middlewares_1 = __importDefault(require("../../users/middlewares/user.middlewares"));
const session_controllers_1 = __importDefault(require("../controllers/session.controllers"));
const router = (0, express_1.Router)();
router.post('/save', user_middlewares_1.default.getId, session_controllers_1.default.save);
router.post('/get', session_controllers_1.default.get);
exports.default = router;
