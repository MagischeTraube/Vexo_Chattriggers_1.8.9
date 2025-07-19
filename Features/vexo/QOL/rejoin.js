import config from "../../../config";
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { prefix_vexo } from "../../../utils/util";

let rejoining = false;


registerWhen(register("chat", () => {
    ChatLib.chat(`${prefix_vexo} §aRejoining in 65 Seconds...`);
    ChatLib.command("pc Kicked! Rejoining in 65 seconds", true);
    rejoining = true;
    setTimeout(() => {
        ChatLib.command("play skyblock", false);
    }, 65000);
}).setCriteria("You were kicked while joining that server!"), () => config.rejoin);

registerWhen(register("Chat", () => {
    if(!rejoining) return;
    else {
        ChatLib.command(`pc I'm in Skyblock now`, true);
        rejoining = false;
    }
}).setCriteria("Welcome to Hypixel SkyBlock!"), () => config.rejoin)
