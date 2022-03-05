"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middlewares_1 = __importDefault(require("../../users/middlewares/user.middlewares"));
const tracking_controllers_1 = __importDefault(require("../controllers/tracking.controllers"));
const router = (0, express_1.Router)();
router.post('/create', user_middlewares_1.default.getId, tracking_controllers_1.default.create);
router.post('/get', tracking_controllers_1.default.get);
exports.default = router;
