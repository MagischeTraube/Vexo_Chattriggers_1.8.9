import config from '../../../config'
import { registerWhen } from "../../../../BloomCore/utils/Utils"
import { onChatPacket } from "../../../../BloomCore/utils/Events";
import { getAllPlayers } from '../../../utils/util';

let isInP5 = false;
let notifiedallLeaped = false;

registerWhen(onChatPacket((event) => {
    isInP5 = true;
}).setCriteria("[BOSS] Necron: Let's make some space!"), () => config.allLeaped);

registerWhen(register("tick", () => {
    if (getAllPlayers().filter(player => player.y < 20).length === 5) {
        World.playSound("note.pling", 1.0, 2.0);
        Client.showTitle("&fALL LEAPED!", "", 0, 50, 5);
        notifiedallLeaped = true;
    }
}), () => config.allLeaped && isInP5 && !notifiedallLeaped)

register(`worldUnload`, () => {
    isInP5 = false;
    notifiedallLeaped = false;
});