import { GuiEditor } from "../../../utils/GuiEditor"
import  Dungeon from "../../../../BloomCore/dungeons/Dungeon"
import config from "../../../config";
import { tempTitle } from "../../../utils/tempOverlay";
import { registerWhen } from "../../../../BloomCore/utils/Utils";

GuiEditor("ScoreMilestoneAlert", "GO IN! 301 SCORE");


let inDungeon = false;
let notifiedScoreMilestone = false;

registerWhen(register("chat", (msg) => { 
    let inDungeon = true;

    return msg;
}).setCriteria("Starting in 1 second."), () => config.ScoreMilestoneAlert);

registerWhen(register("tick", () => { 
    let current_score = Dungeon.score;
    let current_deaths = Dungeon.deaths;

    if (current_score >= 301 && current_deaths == 0) {
        tempTitle("ScoreMilestoneAlert", `GO IN! ${current_score} SCORE`)
        notifiedScoreMilestone = true;
    } 

    if (current_score >= 302 && current_deaths >= 1) {
        tempTitle("ScoreMilestoneAlert", `GO IN! ${current_score} SCORE`)
        notifiedScoreMilestone = true;
    } 
    
}), () => config.ScoreMilestoneAlert && inDungeon && !notifiedScoreMilestone);

register(`worldUnload`, () => {
    inDungeon = false;
    notifiedScoreMilestone = false;
});