import config from "../../../config"
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { GuiEditor } from "../../../utils/GuiEditor";
import { tempTitleCountdown } from "../../../utils/tempOverlay";

GuiEditor("ffrz", '&9Fire Freeze: &65.0')


registerWhen(register("chat", (msg) => {
    if (!config.ffrz) return;
    tempTitleCountdown("ffrz", "&9Fire Freeze:", 100, 100, "&6NOW!")
}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?").setContains(), () => config.ffrz);