import config from "../../../config";
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { playercoords, prefix_tera } from "../../../utils/util";

let rewarpprogress = false;

const rewarpfunction = () => {
    let rewarpprogress = true;
    ChatLib.command("is", false);
    setTimeout(() => {
        ChatLib.command(config.rewarpto, false);
        let rewarpprogress = false;
    }, 3500);}


export const RewarpCommand = register("command", () => {
    rewarpfunction();
}).setName("rewarp");

register("chat", (msg) => {
    if (!config.rewarpmonolyth) return;
    rewarpfunction();
}).setCriteria("MONOLITH! You found a mysterious Dark Monolith").setContains();



register("step", () => {
    if (!config.rewarpcoordstoggle || rewarpprogress || !config.rewarp) return;
    let [x, y, z] = playercoords();
    let gesx = 26.5;
    let gesy = 180;
    let gesz = 105.5;
    if (((gesx - 1) <= x) && (x <= (gesx + 1)) && ((gesy - 1) <= y) && (y <= (gesy + 1)) && (((gesz - 1) <= z) && (z <= (gesz + 1)))) {
        ChatLib.chat(`${prefix_tera} §aRewarping`);
        ChatLib.chat(`x: ${x} y: ${y} z: ${z}`);
    }
}).setFps(5);