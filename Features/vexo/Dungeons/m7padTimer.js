import config from "../../../config"
import { data } from "../../../utils/data"
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { GuiEditor } from "../../../utils/GuiEditor";
import { tempTitleCountdown } from "../../../utils/tempOverlay";

GuiEditor("padTimer", `${GP}Now!`)

registerWhen(register("chat", () => {
    if (!config.padTimer) return;
    tempTitleCountdown("padTimer", "Pad &agreen &rin: &b", 171)
}).setCriteria(/\[BOSS\] Storm: (ENERGY HEED MY CALL|THUNDER LET ME BE YOUR CATALYST)!/), () => config.padTimer);