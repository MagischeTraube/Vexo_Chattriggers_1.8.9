import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { prefix_vexo } from "../../../utils/util";
import config from "../../../config";


registerWhen(register("chat", (msg) => {
    ChatLib.chat(`${prefix_vexo} §aGetting Superboom TNT`);
    if (!config.sbtnt) return msg;

    ChatLib.command("od sb", true);

    return msg;
}).setCriteria("Starting in 2 seconds.").setContains(), () => config.sbtnt);