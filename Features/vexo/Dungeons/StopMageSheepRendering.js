import { registerWhen } from "../../../../BloomCore/utils/Utils"
import config from "../../../config"
import { getClass } from "../../../utils/util"

const S34PacketMaps = Java.type("net.minecraft.network.play.server.S34PacketMaps")
let isMage = false;


register(`worldUnload`, () => {
    isMage = false;
});

registerWhen(register("chat", (msg) => { 
    runStartRegister.register()

    return msg;
}).setCriteria("Starting in 1 second."), () => config.NoMageSheep);

const runStartRegister = register("PacketReceived", () => {
    runStartRegister.unregister();

    setTimeout(() => {
        if (getClass() == "Mage") {
            isMage = true;
        }
    }, 1000)

}).setFilteredClass(S34PacketMaps).unregister()

registerWhen(register("renderEntity", (entity, poss, pt, event) => {
    if (entity.getName() === "Sheep") {    
        cancel(event)
    }
}), () => config.NoMageSheep && isMage)