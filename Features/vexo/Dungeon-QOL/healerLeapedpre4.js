import { registerWhen } from "../../../../BloomCore/utils/Utils";
import config from "../../../config";
import { data } from "../../../utils/data";
import { getClass, GuiEditor } from "../../../utils/util";

GuiEditor("healerLeapedpre4", "&6HEALER LEAPED!")

let healerLeapedpre4Overlay = new Text("&6HEALER LEAPED!");
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


// Credits FreshNotifier
function getAllPlayers() { // not working perfectly
    const players = World
        .getAllPlayers()
        .filter(player =>
            (player.getUUID().version() === 4 || player.getUUID().version() === 1) && // Players and Watchdog have version 4, nicked players have version 1, this is done to exclude NPCs
            player.ping === 1 && // -1 is watchdog and ghost players, also there is a ghost player with high ping value when joining a world
            player.getY() < 138
        )
        .map(player => player.name)
        .filter((x, i, a) => a.indexOf(x) == i); // Distinct, sometimes the players are duplicated in the list
    
    let playersCount = players.length;
    return playersCount;
}

registerWhen(register("tick", () => {
    if (getAllPlayers() === 2) {
        notifiedHealerLeaped = true;
        tempTitle("healerLeapedpre4", "&6HEALER LEAPED!", 30)
    }
}), () => (config.healerLeapedpre4 && isInP2 && !notifiedHealerLeaped && isBers))

register(`worldUnload`, () => {
    isInP2 = false;
    notifiedHealerLeaped = false;
    isBers = false;
});