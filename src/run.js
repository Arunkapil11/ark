"use strict";
const http = require('http');
const express = require('express');
const app = express();



app.get("/", (request, response) => {

  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  console.log("done")
}, 2800);
process.on("unhandledRejection", err => {
console.log(err.stack);
});
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./structures/client"));
const config = require("../configs/config");
(async () => {
    const client = new client_1.default(config.token, config, {
        cache: false,
        prefix: config.prefix,
        gateway: {
            autoReconnect: true,
            compress: true
        }
    });
    await client.initCommands();
    console.log(`Initialised ${client.commands.length} commands`);
    await client.run();
    console.log("Bot started!");
})();
