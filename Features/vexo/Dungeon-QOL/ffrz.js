import config from "../../../config"
import { data } from "../../../utils/data"
import { registerWhen } from "../../../../BloomCore/utils/Utils";

let countdownActive = false;
let countdownEnd = 0;
let ffrzOverlay = new Text("");
let showNowOverlayUntil = 0;


registerWhen(register("chat", (msg) => {
    // ChatLib.chat(`§aTest 0,5`);
    if (!config.ffrz) return;
    countdownActive = true;
    countdownEnd = Date.now() + 5000;
    showNowOverlayUntil = 0;
}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?").setContains(), () => config.ffrz);


register("renderOverlay", () => {
    if (countdownActive) {
        let remaining = countdownEnd - Date.now();
        if (remaining <= 0) {
            countdownActive = false;
            showNowOverlayUntil = Date.now() + 500;
        }
    }


    if (!countdownActive && (showNowOverlayUntil === 0 || showNowOverlayUntil < Date.now())) {
        showNowOverlayUntil = 0;
        ffrzOverlay.setString(""); 
        return;
    }
    
    
    let ffrzText;
    if (countdownActive) {
        let seconds = Math.max(0, countdownEnd - Date.now()) / 1000;
        seconds = seconds.toFixed(1);
        ffrzText = `&9Fire Freeze: &6${seconds}`;
    } else {
        ffrzText = `&9Fire Freeze: &aNow`;
    }
    ffrzOverlay.setString(ffrzText);
    ffrzOverlay.setScale(data.ffrz.scale);
    ffrzOverlay.draw(data.ffrz.x, data.ffrz.y)


})


register("renderOverlay", () => {
    if (config.ffrzGUI.isOpen()) {
        ffrzOverlay.setString('&9Fire Freeze: &65.0')
        ffrzOverlay.setScale(data.ffrz.scale)
        ffrzOverlay.draw(data.ffrz.x, data.ffrz.y)
    }
})

register("dragged", (dx, dy, x, y, bn) => {
    if (!config.ffrzGUI.isOpen() || bn == 2) return
    data.ffrz.x = x
    data.ffrz.y = y
    data.save()
})

register("scrolled", (x, y, dir) => {
    if (!config.ffrzGUI.isOpen()) return
    if (dir == 1) data.ffrz.scale += 0.05
    else data.ffrz.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.ffrzGUI.isOpen() || bn != 2) return
    data.ffrz.x = Renderer.screen.getWidth() / 2
    data.ffrz.y = Renderer.screen.getHeight() / 2 + 10
    data.ffrz.scale = 1
    data.save()
})