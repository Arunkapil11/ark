"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const detritus_client_1 = require("detritus-client");
const fs_1 = require("fs");
const validator_1 = __importDefault(require("../utils/validator"));
class Client extends detritus_client_1.CommandClient {
    constructor(token, config, options) {
        super(token, options);
        this.queue = new Map();
        this.noEOI = config.noEOI;
        this.messages = config.messages;
        this.roleName = config.roleName;
        this.boundTo = config.boundTo;
        this.timeouts = config.timeouts;
        validator_1.default(config).catch(console.error);
    }
    async initCommands() {
        for (const cmd of fs_1.readdirSync("./src/commands/").filter(c => c.endsWith(".js"))) {
            const command = await Promise.resolve().then(() => __importStar(require(`../commands/${cmd}`))).then(v => v.default);
            this.add({
                ...command,
                run: command.run.bind(null, this),
                responseOptional: true
            });
        }
        return this.commands;
    }
}
exports.default = Client;
