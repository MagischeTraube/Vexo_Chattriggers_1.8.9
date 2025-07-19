import { registerWhen } from "../../../../BloomCore/utils/Utils";
import config from "../../../config";
import RenderLibV2J from "../../../../RenderLibV2J"; 


registerWhen(register("renderEntity", (entity, poss, pt, event) => {
    if (!config.StarESP) return;

    if (entity.getName().includes("✯")) {
        let entX = entity.getRenderX();
        let entY = entity.getRenderY();
        let entZ = entity.getRenderZ();
        RenderLibV2J.drawEspBoxV2(entX, entY - 2, entZ, 1, 2, 1, 255/255, 255/255, 255/255, 100, true, 1);
    }
}), () => config.StarESP);