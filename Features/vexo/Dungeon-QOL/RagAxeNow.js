import config from "../../../config"
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { onChatPacket } from "../../../../BloomCore/utils/Events";

// modified uwu addons

const triggers = [
    "[BOSS] Wither King: I no longer wish to fight, but I know that will not stop you.",
    "[BOSS] Livid: I can now turn those Spirits into shadows of myself, identical to their creator."]

triggers.forEach(trigger=> {
    registerWhen(onChatPacket((msg) => {
        if (!config.RagAxeAlert) return
        World.playSound("note.pling", 1.0, 2.0);
        Client.showTitle("&fRAG AXE NOW!", "", 0, 50, 5)
    }).setCriteria(trigger), () => config.RagAxeAlert);})