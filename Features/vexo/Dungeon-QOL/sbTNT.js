import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { prefix_vexo } from "../../../utils/util";
import config from "../../../config";

registerWhen(register("chat", (msg) => {
    ChatLib.chat(`${prefix_vexo} §aGetting Superboom TNT`);
    if (!config.sbtnt) return msg;


    setTimeout(() => {
        ChatLib.command("od sb", true);
    }, 100);

    return msg;
}).setCriteria("Starting in 4 seconds.").setContains(), () => config.sbtnt);