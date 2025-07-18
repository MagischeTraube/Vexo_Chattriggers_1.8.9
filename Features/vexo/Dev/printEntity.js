import { registerWhen } from "../../../../BloomCore/utils/Utils";
import config from "../../../config";
import { DevMessage } from "../../../utils/util";


registerWhen(register("renderEntity", (entity, poss, pt, event) => {
    if (!config.printEntity) return
    
    if (entity.getName()) {
        DevMessage(entity.getName())
    }
}), () => config.printEntity);