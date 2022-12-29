"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const api_1 = __importDefault(require("./routes/api"));
//creates express application
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200'
}));
app.use((0, morgan_1.default)('combined'));
//app.use(json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.use('/v1', api_1.default);
exports.default = app;
