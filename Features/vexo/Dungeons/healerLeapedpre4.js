import { registerWhen } from "../../../../BloomCore/utils/Utils";
import config from "../../../config";
import { data } from "../../../utils/data";
import { getClass, GuiEditor } from "../../../utils/util";

GuiEditor("healerLeapedpre4", "&6HEALER LEAPED!")

let notifiedHealerLeaped = false; 
let isInP2 = false;
let isBers = false;


registerWhen(register("chat", (msg) => {
    if (getClass() == "Berserk") {
        isBers = true;
        ChatLib.chat(getClass())
    }

    isInP2 = true;
    return msg;
}).setCriteria("[BOSS] Storm: I'd be happy to show you what that's like!"), () => config.healerLeapedpre4);

registerWhen(register("tick", () => {
    if (getAllPlayers().filter(player => player.y < 138).length === 2) {
        notifiedHealerLeaped = true;
        tempTitle("healerLeapedpre4", "&6HEALER LEAPED!", 30)
    }
}), () => (config.healerLeapedpre4 && isInP2 && !notifiedHealerLeaped && isBers))

register(`worldUnload`, () => {
    isInP2 = false;
    notifiedHealerLeaped = false;
    isBers = false;
});