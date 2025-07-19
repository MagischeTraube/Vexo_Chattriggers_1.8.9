import config from '../../../config'
import { registerWhen } from "../../../../BloomCore/utils/Utils"
import { onChatPacket } from "../../../../BloomCore/utils/Events";

let isInP5 = false;
let notifiedAllLeap = false;

registerWhen(onChatPacket((event) => {
    isInP5 = true;
}).setCriteria("[BOSS] Necron: Let's make some space!"), () => config.allLeaped);

// Credits FreshNotifier
function getAllPlayers() { // not working perfectly
    const players = World
        .getAllPlayers()
        .filter(player =>
            (player.getUUID().version() === 4 || player.getUUID().version() === 1) && // Players and Watchdog have version 4, nicked players have version 1, this is done to exclude NPCs
            player.ping === 1 && // -1 is watchdog and ghost players, also there is a ghost player with high ping value when joining a world
            player.getY() < 15
        )
        .map(player => player.name)
        .filter((x, i, a) => a.indexOf(x) == i); // Distinct, sometimes the players are duplicated in the list
    
    let playersCount = players.length;
    return playersCount;
}

registerWhen(register("tick", () => {
    if (getAllPlayers() === 5) {
        World.playSound("note.pling", 1.0, 2.0);
        Client.showTitle("&fALL LEAPED!", "", 0, 50, 5);
        notifiedAllLeap = true;
    }
}), () => config.allLeaped && isInP5 && !notifiedAllLeap)

register(`worldUnload`, () => {
    isInP5 = false;
    notifiedAllLeap = false;
});