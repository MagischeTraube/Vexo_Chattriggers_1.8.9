import config from "../config";
import { data } from "./data";

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