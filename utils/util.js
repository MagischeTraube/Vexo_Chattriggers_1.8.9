import { data } from "./data"
import config from "../config"

export const prefix_vexo = "§3[vexo]"

export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

export function DevMessage(messages) {
    const prefix_vexodebug = "§3[vexo-DEBUG]"

    if (!config.DevMessages) return;

    if (Array.isArray(messages)) {
        messages.forEach(message => {
            if (typeof message === "object" && message !== null) {
                let text = "";
                if (message.id && message.remainingTicks !== undefined) {
                    text = `{ID: ${message.id}, Ticks: ${message.remainingTicks}}`;
                } else {
                    try {
                        text = JSON.stringify(message, null, 0);
                    } catch (e) {
                        text = `[Object] - Could not stringify: ${e.message}`;
                    }
                }
                ChatLib.chat(prefix_vexodebug + " &7" + text);
            } else {
                ChatLib.chat(prefix_vexodebug + " &7" + message);
            }
        });
    } else {
        if (typeof messages === "object" && messages !== null) {
            try {
                const text = JSON.stringify(messages, null, 0);
                ChatLib.chat(prefix_vexodebug + " &7" + text);
            } catch (e) {
                ChatLib.chat(prefix_vexodebug + " &7" + `[Object] - Could not stringify: ${e.message}`);
            }
        } else {
            ChatLib.chat(prefix_vexodebug + " &7" + messages);
        }
    }
}

export function playercoords() {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    return [Math.round(x),Math.round(y),Math.round(z)];
}

export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
}

export function GuiEditor(GuiName, previewText) {
    const guiConfig = config[`${GuiName}GUI`];
    const guiData = data[GuiName];
    const overlay = new Text("")

    register("renderOverlay", () => {
        if (guiConfig.isOpen()) {
            overlay.setString(previewText);
            overlay.setScale(guiData.scale);
            overlay.draw(guiData.x, guiData.y);
        }
    });

    register("dragged", (dx, dy, x, y, button) => {
        if (!guiConfig.isOpen() || button === 2) return;
        guiData.x = x;
        guiData.y = y;
        data.save();
    });

    register("scrolled", (x, y, direction) => {
        if (!guiConfig.isOpen()) return;
        guiData.scale += (direction > 0) ? 0.05 : -0.05;
        data.save();
    });

    register("guiMouseClick", (x, y, button) => {
        if (!guiConfig.isOpen() || button !== 2) return;
        guiData.x = Renderer.screen.getWidth() / 2;
        guiData.y = Renderer.screen.getHeight() / 2 + 10;
        guiData.scale = 1;
        data.save();
    });
}


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

// Credits FreshNotifier
export function getAllPlayers() {
    const players = World
        .getAllPlayers()
        .filter(player =>
            (player.getUUID().version() === 4 || player.getUUID().version() === 1) && // Players and Watchdog have version 4, nicked players have version 1, this is done to exclude NPCs
            player.ping === 1 // -1 is watchdog and ghost players, also there is a ghost player with high ping value when joining a world
        )
        .map(player => ({ name: player.name, x: player.getX(), y: player.getY(), z: player.getZ() })) // Store name and coordinates
        .filter((x, i, a) => a.indexOf(x) == i); // Distinct, sometimes the players are duplicated in the list

    return players;
}