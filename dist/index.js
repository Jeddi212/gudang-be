"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LOAD ENVIRONMENT FIRST
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const web_1 = require("./src/utils/web");
const port = 3000;
web_1.app.listen(port, () => {
    console.log(`gudang backend is listening on port ${port}`);
});
