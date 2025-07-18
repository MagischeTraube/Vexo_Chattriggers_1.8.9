import { data } from "./data"
import config from "../config"

export const prefix_vexo = "§3[vexo]"

export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
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