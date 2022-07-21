"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const shelljs_1 = __importDefault(require("shelljs"));
const provider = new ethers_1.ethers.providers.JsonRpcProvider("http://localhost:11451");
(async () => {
    let blockNumber = await provider.getBlockNumber();
    console.log("Start to record blockNumber is ", blockNumber);
    while (true) {
        try {
            const blockNumberNow = await provider.getBlockNumber();
            console.log("Current blockNumber is ", blockNumberNow);
            const blockInterval = blockNumberNow - blockNumber;
            console.log("Block interval is ", blockInterval);
            if (blockInterval < 100) {
                console.log("Block interval is too short, restart the node");
                shelljs_1.default.exec("pm2 restart rei-fans-node");
            }
            blockNumber = blockNumberNow;
            await new Promise((resolve) => setTimeout(resolve, 120000));
        }
        catch (error) {
            console.log(error);
        }
    }
})();
//# sourceMappingURL=check.js.map