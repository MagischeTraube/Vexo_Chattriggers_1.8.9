import { registerWhen } from "../../../../BloomCore/utils/Utils"
import config from "../../../config"
import { isInDungeon } from "../../../utils/util"

register(`worldLoad`, () => {
    inDungeon = isInDungeon();
});

register(`worldUnload`, () => {
    inDungeon = false;
});

registerWhen(register("renderEntity", (entity, poss, pt, event) => {
    if (entity.getName() === "Sheep") {    
        cancel(event)
    }
}), () => (config.NoMageSheep && inDungeon))