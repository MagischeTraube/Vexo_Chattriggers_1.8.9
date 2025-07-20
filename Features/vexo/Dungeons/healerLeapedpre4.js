import { registerWhen } from "../../../../BloomCore/utils/Utils";
import config from "../../../config";
import { GuiEditor } from "../../../utils/GuiEditor";
import { tempTitle } from "../../../utils/tempOverlay";
import { getAllPlayers, getClass } from "../../../utils/util";

GuiEditor("healerLeapedpre4", "&6HEALER LEAPED!")

let notifiedHealerLeaped = false; 
let isInP2 = false;
let isBers = false;


registerWhen(register("chat", (msg) => {
    if (getClass() == "Berserk") {
        isBers = true;
    }
    isInP2 = true;
    return msg;
}).setCriteria("[BOSS] Storm: I'd be happy to show you what that's like!"), () => config.healerLeapedpre4);

registerWhen(register("tick", () => {
    if (getAllPlayers().filter(player => player.y < 138).length == 2) {
        World.playSound("note.pling", 1.0, 2.0);
        tempTitle("healerLeapedpre4", "&6HEALER LEAPED!", 30)
        notifiedHealerLeaped = true
    }
}), () => (config.healerLeapedpre4 && isInP2 && !notifiedHealerLeaped && isBers))

register(`worldUnload`, () => {
    isInP2 = false;
    notifiedHealerLeaped = false;
    isBers = false;
});