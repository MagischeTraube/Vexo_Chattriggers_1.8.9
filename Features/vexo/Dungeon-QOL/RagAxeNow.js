import config from "../../../config"
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { onChatPacket } from "../../../../BloomCore/utils/Events";


const M7 = "[BOSS] Wither King: I no longer wish to fight, but I know that will not stop you."
const M5 = "[BOSS] Livid: I can now turn those Spirits into shadows of myself, identical to their creator."


registerWhen(onChatPacket((event) => {
    if (!config.RagAxeAlert) return
    World.playSound("note.pling", 1.0, 2.0);
    Client.showTitle("&fRAG AXE NOW!", "", 0, 50, 5)
}).setCriteria(M5, M7), () => config.RagAxeAlert);