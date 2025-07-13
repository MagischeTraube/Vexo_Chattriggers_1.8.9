import { registerWhen } from "../../../../BloomCore/utils/Utils";
import config from "../../../config";


registerWhen(register("renderEntity", (entity, poss, pt, event) => {
    if (!config.printEntity) return
    if (entity.getName().includes("")) ChatLib.chat(entity.getName())
}), () => config.printEntity);