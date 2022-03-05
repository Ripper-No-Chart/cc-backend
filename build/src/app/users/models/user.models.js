"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    primary_data: {
        name: { type: String, required: true },
        last_name: { type: String, required: true },
        nickname: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    billing_data: {
        address: { type: String, required: false, default: '' },
        zip_code: { type: Number, required: false, default: 0 },
    },
    createdAt: { type: Number, inmutable: true },
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });
exports.default = (0, mongoose_1.model)('users', UserSchema);
