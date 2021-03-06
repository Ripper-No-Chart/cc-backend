"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const chalk_1 = __importDefault(require("chalk"));
app_1.default.listen(app_1.default.get('port'), () => {
    console.log(`Server on port ${chalk_1.default.greenBright(app_1.default.get('port'))} ✔`);
});
