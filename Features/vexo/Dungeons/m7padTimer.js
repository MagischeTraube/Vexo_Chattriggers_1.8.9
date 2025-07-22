import config from "../../../config"
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { GuiEditor } from "../../../utils/GuiEditor";
import { tempTitleCountdown } from "../../../utils/tempOverlay";

GuiEditor("padTimer", "Pad &agreen &rin: &bNow!")


registerWhen(register("chat", () => {
    if (!config.padTimer) return;
    tempTitleCountdown("padTimer", "Pad &agreen &rin:", 171, 100, "&bNOW")
}).setCriteria(/\[BOSS\] Storm: (ENERGY HEED MY CALL|THUNDER LET ME BE YOUR CATALYST)!/), () => config.padTimer);