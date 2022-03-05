"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Routes
const user_routes_1 = __importDefault(require("./app/users/routes/user.routes"));
const tracking_routes_1 = __importDefault(require("./app/tracking/routes/tracking.routes"));
const session_routes_1 = __importDefault(require("./app/sessions/routes/session.routes"));
// Database
require("./database/database");
// Settings
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.set('port', process.env.PORT || 3001);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Routes usage
app.use('/api/session', session_routes_1.default);
app.use('/api/user', user_routes_1.default);
app.use('/api/tracking', tracking_routes_1.default);
exports.default = app;
