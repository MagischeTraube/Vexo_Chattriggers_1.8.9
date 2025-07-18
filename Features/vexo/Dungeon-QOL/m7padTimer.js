import config from "../../../config"
import { data } from "../../../utils/data"
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { GuiEditor } from "../../../utils/util";

let serverTicks = 0;
let padTimerActive = false;
let nowOverlayTicks = 0;
const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction"); 
const GP = 'Pad &agreen &rin: &b'
padTimerOverlay = new Text("");

GuiEditor("padTimer", `${GP}Now!`)

register("chat", () => {
    if (!config.padTimer) return;
    padTimerActive = true;
    serverTicks = 196;
}).setCriteria(/\[BOSS\] Storm: (ENERGY HEED MY CALL|THUNDER LET ME BE YOUR CATALYST)!/);

/*register("packetReceived", (packet) => {
    if (!padTimerActive) return;
    if (packet.func_148890_d() <= 0) serverTicks--;
    if (serverTicks == 75);
    if (serverTicks == 65);
    if (serverTicks == 55);
    if (serverTicks == 45);
    if (serverTicks == 35);
    if (serverTicks == 25);
    if (serverTicks < 25) {
        padTimerActive = false;
        serverTicks = 0;
        nowOverlayTicks = 100; 
    }
}).setFilteredClass(S32PacketConfirmTransaction);*/

register("renderOverlay", () => {
    if (!config.padTimer) return;
    if (!padTimerActive && nowOverlayTicks <= 0) {
        padTimerOverlay.setString("");
        return;
    }
    if (padTimerActive && serverTicks >= 25)
        padTimerOverlay.setString(`${GP}${(serverTicks - 25) / 20}s`);

    else if (padTimerActive && serverTicks < 25)
        padTimerOverlay.setString(`${GP}: Now!`);

    else if (!padTimerActive && nowOverlayTicks > 0)
        padTimerOverlay.setString(`${GP}: Now!`);

    padTimerOverlay.setScale(data.padTimer.scale);
    padTimerOverlay.draw(data.padTimer.x, data.padTimer.y);
    if (!padTimerActive && nowOverlayTicks > 0) {
        nowOverlayTicks--
    };
});