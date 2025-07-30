import config from "./config"

import "./Features/vexo/Dungeons/ffrz"
import "./Features/vexo/Dungeons/m7padTimer"
import "./Features/vexo/Dungeons/sbTNT"
import "./Features/vexo/Dev/printEntity"
import "./Features/vexo/Dungeons/RagAxeNow"
import "./Features/vexo/Dungeons/allLeapedP5"
import "./Features/vexo/QOL/rejoin"
import "./Features/vexo/Dungeons/StopMageSheepRendering"
import "./Features/vexo/Dungeons/healerLeapedpre4"
import "./Features/vexo/Dungeons/ScoreMilestoneAlert"
import "./Features/vexo/Dungeons/weirderTubaTimer"

import { TYFRCommand } from "./Features/vexo/Dungeons/tyfr"
import { SuckTrapCommand } from "./Features/vexo/Dungeons/SuckTrap"
import { GUICommand } from "./Features/gui"

import { checkForUpdates } from "./utils/autoUpdate"

const UpdateChecker = register("tick", () => {
    checkForUpdates()
    UpdateChecker.unregister();
});
