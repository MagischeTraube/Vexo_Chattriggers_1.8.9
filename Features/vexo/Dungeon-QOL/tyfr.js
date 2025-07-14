import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { prefix_infa } from "../../../utils/util"

let setTyfr = false;
const triggers =[
    "Score:",
    "Tokens Earned:"
]


export const TYFRCommand = register("command", () => {
    if (!setTyfr) {
        ChatLib.chat(`${prefix_infa} §aTYFR activated! – waiting for the end of the run`);  
    }
    else {
        ChatLib.chat(`${prefix_infa} §4TYFR deactivated!`); 
    }
    
    setTyfr = !setTyfr;
}).setName("tyfr");

triggers.forEach(trigger=> {
    registerWhen(register("chat", (msg) => {
        if (!setTyfr) return msg;
        setTyfr = false;

        ChatLib.command("p leave", false);

        setTimeout(() => {
            ChatLib.command("ac tyfr", false);
        }, 1000);

        return msg;
    }).setCriteria(trigger).setContains(), () => setTyfr)})


register(`worldUnload`, () => {
    setTyfr = false;
});