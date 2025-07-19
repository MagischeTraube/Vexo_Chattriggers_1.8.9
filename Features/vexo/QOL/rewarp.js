import config from "../../../config";
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { getDistance, playercoords, prefix_vexo } from "../../../utils/util";
import { DevMessage } from "../../../utils/DevMessage";

let rewarpprogress = false;


function rewarpfunction() {
    rewarpprogress = true;
    ChatLib.command("is", false);
    DevMessage("rewarpfunction warped to island")
    setTimeout(() => {
        DevMessage("rewarpfunction warping!")
        ChatLib.command(config.rewarpto, false);
        DevMessage("rewarpfunction warped to config.rewarpto")
        rewarpprogress = false;
    }, 5000);
}

export const RewarpCommand = register("command", () => {
    rewarpfunction();
}).setName("rewarp");

registerWhen(register("chat", (msg) => {
    if (!config.rewarpmonolith) return;
    rewarpfunction();
}).setCriteria("MONOLITH! You found a mysterious Dark Monolith").setContains(), () => config.rewarpmonolith)

registerWhen(register("step", () => {
    if (!config.rewarpcoordstoggle || rewarpprogress || !config.rewarp) return;
    let [x, y, z] = playercoords();
    let [gesx, gesy, gesz] = config.rewarpcoords.split(",")
    DevMessage(`Rewarp coords: x: ${gesx} | y: ${gesy} | z: ${gesz}`);

    if (getDistance(x, y, z, gesx, gesy, gesz) <= 3) {
        ChatLib.chat(`${prefix_vexo} §aRewarping`);
        DevMessage(`Close to coords with x: ${x} | y: ${y} | z: ${z}`);
    }
}).setFps(5), () => config.rewarpcoords && !rewarpprogress)