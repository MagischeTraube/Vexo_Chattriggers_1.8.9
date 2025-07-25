import { data } from "./data";
import { DevMessage } from "./DevMessage";

const S32PacketConfirmTransaction = "net.minecraft.network.play.server.S32PacketConfirmTransaction"

const activeTitles = [];

export function tempTitle(GuiName, text, ticks) {
    DevMessage(`tempTitle got: ${GuiName} ${text} ${ticks}`)

    let textOverlay = new Text(text);
    textOverlay.setScale(data[GuiName].scale)

    DevMessage("tempTitle created textOverlay")

    activeTitles.push({
        id: GuiName,
        Overlay: textOverlay,
        originalText: text,
        remainingTicks: ticks,
        isCountdown: false
    });

    DevMessage(`tempTitle pushed: ${GuiName}`)
    DevMessage(activeTitles)

    tickCounter.register();
    drawTitle.register();

    DevMessage("Registered tickCounter and drawTitle!")
}

export function tempTitleCountdown(GuiName, text, ticks, showTimeLeftTicks, countdownEndedText) {
    DevMessage(`tempTitleCountdown got: ${GuiName} ${text} ${ticks}`)

    let textOverlay = new Text(text);
    textOverlay.setScale(data[GuiName].scale)

    DevMessage("tempTitleCountdown created textOverlay")

    activeTitles.push({
        id: GuiName,
        Overlay: textOverlay,
        originalText: text,
        remainingTicks: ticks + 10, // 10 ticks to show NOW!
        isCountdown: true,
        showCountdownTimeTicks: showTimeLeftTicks,
        coutdownOverText: countdownEndedText
    });

    DevMessage(`tempTitleCountdown pushed: ${GuiName}`)
    DevMessage(activeTitles)

    tickCounter.register();
    drawTitle.register();

    DevMessage("Registered tickCounter and drawTitle!")
}


const tickCounter = register("packetReceived", (packet) => {
    if (packet.func_148890_d() > 0) return;

    DevMessage("Tick!")
    DevMessage(activeTitles)

    for (let i = activeTitles.length - 1; i >= 0; i--) {
        activeTitles[i].remainingTicks--;

        if (activeTitles[i].remainingTicks <= 0) {
            removeTempTitle(activeTitles[i].id);
        }
    }

    if (activeTitles.length === 0) {
        DevMessage("tickCounter unregister!")
        tickCounter.unregister();
        drawTitle.unregister();
    }
}).setFilteredClass(Java.type(S32PacketConfirmTransaction)).unregister();


const drawTitle = register('renderOverlay', () => {
    activeTitles.forEach(title => {
        DevMessage("Drawing!")

        if (title.isCountdown) {
            DevMessage(`${title.originalText} ${title.remainingTicks} left`)
            if (title.remainingTicks <= (title.showCountdownTimeTicks + 10) && title.remainingTicks > 10) {
                Overlay = title.Overlay.setString(`${title.originalText} ${Math.round(((title.remainingTicks-10)/20)*10)/10}s`);
                Overlay.draw(data[title.id].x, data[title.id].y);

            } else if (title.remainingTicks <= 10 && title.remainingTicks >= 0) {
                Overlay = title.Overlay.setString(`${title.originalText} ${title.coutdownOverText}`);
                Overlay.draw(data[title.id].x, data[title.id].y);
            }
        } 
        else {
            Overlay = title.Overlay;
            Overlay.draw(data[title.id].x, data[title.id].y);
        }
    });
}).unregister();

export function removeTempTitle(GuiName) {
    DevMessage(`removeTempTitle ${GuiName}`)
    for (let i = activeTitles.length - 1; i >= 0; i--) {
        if (activeTitles[i].id === GuiName) {
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