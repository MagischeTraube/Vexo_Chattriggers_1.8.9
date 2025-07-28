import { registerWhen } from "../../../../BloomCore/utils/Utils";
import config from "../../../config";
import { GuiEditor } from "../../../utils/GuiEditor";
import { tempTitle, tempTitleCountdown } from "../../../utils/tempOverlay";

GuiEditor("weirderTubaTimer", "&9Weirder Tuba expires in: 10")


registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if (name == "mob.wolf.howl" && pitch > 1.5) {
        tempTitleCountdown("weirderTubaTimer", "&9Weirder Tuba", 400, 60, "ready!")
        tempTitleCountdown("weirderTubaTimer", "&9Weirder Tuba expires", 600, 60, "now!")
    }
}), () => config.weirderTubaTimer);