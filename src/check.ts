import { ethers } from "ethers";
import shell from "shelljs";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:11451");

(async () => {
  let blockNumber = await provider.getBlockNumber();
  console.log(
    new Date().toUTCString(),
    "Start to record blockNumber is ",
    blockNumber
  );

  while (true) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 120000));
      const blockNumberNow = await provider.getBlockNumber();
      console.log(
        new Date().toUTCString(),
        "Current blockNumber is: ",
        blockNumberNow
      );
      const blockInterval = blockNumberNow - blockNumber;
      console.log(
        new Date().toUTCString(),
        "Block interval is: ",
        blockInterval
      );
      if (blockInterval < 10) {
        console.log(
          new Date().toUTCString(),
          "Block interval is too short, restart the node"
        );
        shell.exec("pm2 restart rei-fans-node");
      }
      blockNumber = blockNumberNow;
    } catch (error) {
      console.log(error);
    }
  }
})();
