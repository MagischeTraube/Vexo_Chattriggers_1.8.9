import config from "../../../config"
import { data } from "../../../utils/data"
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { GuiEditor } from "../../../utils/util";

let countdownActive = false;
let countdownEnd = 0;
let ffrzOverlay = new Text("");
let showNowOverlayUntil = 0;


registerWhen(register("chat", (msg) => {
    if (!config.ffrz) return;
    countdownActive = true;
    countdownEnd = Date.now() + 5000;
    showNowOverlayUntil = 0;
}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?").setContains(), () => config.ffrz);

GuiEditor("ffrz", '&9Fire Freeze: &65.0')

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