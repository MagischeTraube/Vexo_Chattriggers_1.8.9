import { data } from "./data";
import { DevMessage } from "./DevMessage";

const activeTitles = [];

export function tempTitle(GuiName, text, ticks) {
    DevMessage(`tempTitle got: ${GuiName} ${text} ${ticks}`)


    textOverlay = new Text(text);
    textOverlay.setScale(data[GuiName].scale)

    DevMessage("tempTitle created textOverlay")

    activeTitles.push({
        id: GuiName,
        Overlay: textOverlay,
        remainingTicks: ticks
    });
    
    DevMessage(`tempTitle pushed: ${GuiName}`)

    DevMessage(activeTitles)

    tickCounter.register();
    drawTitle.register();

    DevMessage("Registered tickCounter and drawTitle!")
}

const tickCounter = register("packetReceived", (packet) => {
    DevMessage("Tick!")

    for (let i = activeTitles.length - 1; i >= 0; i--) {

        activeTitles[i].remainingTicks--;

        if (activeTitles[i].remainingTicks <= 0) {
            removeTempTitle(activeTitles[i].id)
        }
    }

    if (activeTitles.length === 0) {
        tickCounter.unregister();
        drawTitle.unregister();
    }
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister();

const drawTitle = register('renderOverlay', () => {
    activeTitles.forEach(title => {
        DevMessage("Drawing!")
        title.Overlay.draw(data[title.id].x, data[title.id].y);
    });
}).unregister();

export function removeTempTitle(GuiID) {
    for (let i = activeTitles.length - 1; i >= 0; i--) {
        if (activeTitles[i].id === GuiID) {
            activeTitles.splice(i, 1);
            if (activeTitles.length === 0) {
                tickCounter.unregister();
                drawTitle.unregister();
            }
            return true;
        }
    }
    return false;
}