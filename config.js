import {
    @ButtonProperty,@CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty,
    @NumberProperty,
} from '../Vigilance/index';

import { getVersion } from "./utils/util";

const version = getVersion()

@Vigilant("vexo", "§3vexo",  {
    getCategoryComparator: () => (a, b) => {
        const categories = [
            'Dungeons', 
            'QOL', 
            'Dev',
        ];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },

    getSubcategoryComparator: () => (a, b) => {
        const subcategories = [
            // Dungeons ///////////////////////////////////
            'Alerts',
            'Refill',
            'Render',
            'Timers',
            //////////////////////////////////////////////////

            // QOL ///////////////////////////////////////////
            'Rewarp',
            'Kicked',
            //////////////////////////////////////////////////

            // Dev ///////////////////////////////////////////
            'Entity',
            'Logs',
            //////////////////////////////////////////////////
        ];
        return subcategories.indexOf(a.name) - subcategories.indexOf(b.name);
    },

    getPropertyComparator: () => (a, b) => {
        const order = [
            // Dungeons ///////////////////////////////////
            // Alerts
            'Score Milestone Alert',
            'Move Score Milestone GUI',
            'Pre4 Healer Leaped Alert',
            'Move Healer Leaped GUI',
            'Rag Axe Alert',
            'Move Rag Axe Alert GUI',
            'All Leaped',
            'Move All Leaped GUI',
            //Refill
            'Refill Boom',
            //Render
            'No Mage Sheep',
            //Timers
            'M3 Timer',
            'Move M3 Timer GUI',
            'Pad Timer',
            'Move Pad Timer GUI',
            //////////////////////////////////////////////////

            // QOL ///////////////////////////////////////////
            // Kicked
            'Auto Rejoin on Kick',
            //Rewarp
            'Rewarp',
            'Rewarp to',
            'Rewarp monolith',
            'Rewarp on Coords',
            'Rewarp Coords',
            //////////////////////////////////////////////////

            // Dev ///////////////////////////////////////////
            // Entity
            'Print Entitys',
            'Mob ESP',
            //Log
            'Debug Messages',
            //////////////////////////////////////////////////
        ];
        return order.indexOf(a.attributes.name) - order.indexOf(b.attributes.name);
    }
})

class Settings {
    ///////////////////////////////////////////////
    // vexo ///////////////////////////////////////
    ///////////////////////////////////////////////


    /// GUIS //////////////////////////////////////
    // Dungeons

    ScoreMilestoneAlertGUI = new Gui()
    healerLeapedpre4GUI = new Gui()
    RagAxeAlertGUI = new Gui()
    allLeapedGUI = new Gui()
    ffrzGUI = new Gui()
    padTimerGUI = new Gui()

    // QOL

    // Dev

    ///////////////////////////////////////////////

    ///////////////////////////////////////////////
    /// Propertys /////////////////////////////////
    ///////////////////////////////////////////////

    // Dungeons ///////////////////////////////////

    // Alerts
    @SwitchProperty({
        name: "Score Milestone Alert",
        description: "Notifies you when your dungeon score is 301,\nor 302 if your party has one or more deaths.",
        category: "Dungeons",
        subcategory: "Alerts",
    })
    ScoreMilestoneAlert = false;

    @ButtonProperty({
        name: "Move Score Milestone GUI",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Alerts",
        placeholder: "Move",
    })
    MoveScoreMilestoneAlert() {
        this.ScoreMilestoneAlertGUI.open()
    };

    @SwitchProperty({
        name: "Pre4 Healer Leaped Alert",
        description: "Alerts you when the healer has leaped to you",
        category: "Dungeons",
        subcategory: "Alerts",
    })
    healerLeapedpre4 = false;

    @ButtonProperty({
        name: "Move Healer Leaped GUI",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Alerts",
        placeholder: "Move",
    })
    MovehealerLeapedpre4() {
        this.healerLeapedpre4GUI.open()
    };

    @SwitchProperty({
        name: "Rag Axe Alert",
        description: "Tells you when to Rag Axe in P5",
        category: "Dungeons",
        subcategory: "Alerts",
    })
    RagAxeAlert = false;

    @ButtonProperty({
        name: "Move Rag Axe Alert GUI",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Alerts",
        placeholder: "Move",
    })
    MoveRagAxeAlert() {
        this.RagAxeAlertGUI.open()
    };

    @SwitchProperty({
        name: "All Leaped",
        description: "Alerts you when everyone is in P5",
        category: "Dungeons",
        subcategory: "Alerts",
    })
    allLeaped = false;

    @ButtonProperty({
        name: "Move All Leaped GUI",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Alerts",
        placeholder: "Move",
    })
    MoveallLeaped() {
        this.allLeapedGUI.open()
    };

    // Refill
    @SwitchProperty({
        name: "Refill Boom",
        description: "Refills Superboom-TNT at the biginning of a dungeon\n(normal boom = shorter cd)",
        category: "Dungeons",
        subcategory: "Refill",
    })
    sbtnt = false;

    // Render
    @SwitchProperty({
        name: "No Mage Sheep",
        description: "Prevents Mage Sheep from rendering",
        category: "Dungeons",
        subcategory: "Render",
    })
    NoMageSheep = false;

    // Timers
    @SwitchProperty({
        name: "M3 Timer",
        description: "Displays the Fire freeze timer on the screen",
        category: "Dungeons",
        subcategory: "Timers",
    })
    ffrz = false;

    @ButtonProperty({
        name: "Move M3 Timer GUI",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Timers",
        placeholder: "Move",
    })
    MoveffrzGUI() {
        this.ffrzGUI.open()
    };

    @SwitchProperty({
        name: "Pad Timer",
        description: "Displays the Pad Timer on the screen",
        category: "Dungeons",
        subcategory: "Timers",
    })
    padTimer = false;

    @ButtonProperty({
        name: "Move Pad Timer GUI",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Timers",
        placeholder: "Move",
    })
    MovepadTimer() {
        this.padTimerGUI.open()
    };

    ///////////////////////////////////////////////
    
    // QOL ////////////////////////////////////////

    // Kicked
    @SwitchProperty({
        name: "Auto Rejoin on Kick",
        description: "Automatically notifies the party that you were kicked and rejoins in 65 seconds",
        category: "QOL",
        subcategory: "Kicked",
    })
    rejoin = false;

    // Rewarp
    @SwitchProperty({
        name: "Rewarp",
        description: "Warps u to is and back to is and back to the dwarven mines",
        category: "QOL",
        subcategory: "Rewarp",
    })
    rewarp = false;

    @TextProperty({
        name: "Rewarp to",
        description: "The location you want to rewarp to, put the warp command without the /",
        category: "QOL",
        subcategory: "Rewarp",
        placeholder: "warp mines",
    })
    rewarpto = "warp mines";

    @SwitchProperty({
        name: "Rewarp monolith",
        description: "rewarps after finding a monolith",
        category: "QOL",
        subcategory: "Rewarp",
    })
    rewarpmonolith = false;

    @SwitchProperty({
        name: "Rewarp on Coords",
        description: "Not working Right Now",
        category: "QOL",
        subcategory: "Rewarp",
    })
    rewarpcoordstoggle = false;

    @TextProperty({
        name: "Rewarp Coords",
        description: "Put the coords you want to rewarp to, format: x,y,z without spaces",
        category: "QOL",
        subcategory: "Rewarp",
        placeholder: "0,0,0",
    })
    rewarpcoords = "0,0,0";

    ///////////////////////////////////////////////

    // Dev ////////////////////////////////////////

    // Entity
    @SwitchProperty({
        name: "Print Entitys",
        description: "Prints all entities to chat for debugging purposes (will lag your game)",
        category: "Dev",
        subcategory: "Entity",
    })
    printEntity = false;

    @SwitchProperty({
        name: "Mob ESP",
        description: "Highlights starred mobs with a box",
        category: "Dev",
        subcategory: "Entity",
    })
    StarESP = false;

    // Logs
    @SwitchProperty({
        name: "Debug Messages",
        description: "Shows debug messages in console for development",
        category: "Dev",
        subcategory: "Logs",
    })
    DevMessages = false;

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Dungeons", `&aMod Created by Traube_V2 and InfernoLloyd\n Version ${version}`);

        // Dungeons
        this.addDependency("Move Score Milestone GUI", "Score Milestone Alert");
        this.addDependency("Move Healer Leaped GUI", "Pre4 Healer Leaped Alert");
        this.addDependency("Move Rag Axe Alert GUI", "Rag Axe Alert");
        this.addDependency("Move All Leaped GUI", "All Leaped");
        this.addDependency("Move M3 Timer GUI", "M3 Timer");
        this.addDependency("Move Pad Timer GUI", "Pad Timer");
        
        // QOL
        this.addDependency("Rewarp to", "Rewarp");
        this.addDependency("Rewarp monolith", "Rewarp");
        this.addDependency("Rewarp on Coords", "Rewarp");
        this.addDependency("Rewarp Coords", "Rewarp on Coords");
        
        // Dev

    }
}

export default new Settings()