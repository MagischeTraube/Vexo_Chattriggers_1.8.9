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

@Vigilant("vexo", "§4vexo",  {
    getCategoryComparator: () => (a, b) => {
        const categories = ['Dungeon-QOL', 'QOL', 'Dev'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    ffrzGUI = new Gui()
    padTimerGUI = new Gui()
    healerLeapedpre4GUI = new Gui()
    RagAxeAlertGUI = new Gui()

    ///////////////////////////////////////////////
    // vexo ///////////////////////////////////////
    ///////////////////////////////////////////////

    @SwitchProperty({
        name: "Refill Boom",
        description: "Refills Superboom-TNT at the biginning of a dungeon\n(normal boom = shorter cd)",
        category: "Dungeon-QOL",
        subcategory: "Refill"
    })
    sbtnt = false;

    @SwitchProperty({
        name: "M3 Timer",
        description: "Displays the Fire freeze timer on the screen",
        category: "Dungeon-QOL",
        subcategory: "Timers"
    })
    ffrz = false;

    @ButtonProperty({
        name: "Move M3 Timer GUI",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeon-QOL",
        subcategory: "Timers",
        placeholder: "Move"
    })
    MoveffrzGUI() {
        this.ffrzGUI.open()
    };

    @SwitchProperty({
        name: "Pad Timer",
        description: "Displays the Pad Timer on the screen",
        category: "Dungeon-QOL",
        subcategory: "Storm"
    })
    padTimer = false;

    @ButtonProperty({
        name: "Move Pad Timer GUI",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeon-QOL",
        subcategory: "Storm",
        placeholder: "Move",
    })
    MovepadTimer() {
        this.padTimerGUI.open()
    };
    
    @SwitchProperty({
        name: "Rewarp",
        description: "Warps u to is and back to is and back to the dwarven mines",
        category: "QOL",
        subcategory: "Rewarp"
    })
    rewarp = false;

    @TextProperty({
        name: "Rewarp to",
        description: "The location you want to rewarp to, put the warp command without the /",
        category: "QOL",
        subcategory: "Rewarp",
        placeholder: "warp mines"
    })
    rewarpto = "warp mines";

    @SwitchProperty({
        name: "Rewarp monolyth",
        description: "rewarps after finding a monolyth",
        category: "QOL",
        subcategory: "Rewarp"
    })
    rewarpmonolyth = false;

    @SwitchProperty({
        name: "Rewarp on Coords",
        description: "Not working Right Now",
        category: "QOL",
        subcategory: "Rewarp"
    })
    rewarpcoordstoggle = false;

    @TextProperty({
        name: "Rewarp Coords",
        description: "Put the coords you want to rewarp to, format: x,y,z without spaces",
        category: "QOL",
        subcategory: "Rewarp",
        placeholder: "0,0,0"
    })
    rewarpcoords = "0,0,0";

    @SwitchProperty({
        name: "Print Entitys",
        description: "Prints all entities to chat for debugging purposes (will lag your game)",
        category: "Dev",
        subcategory: "Entity"
    })
    printEntity = false;

    @SwitchProperty({
        name: "Mob ESP",
        description: "Highlights starred mobs with a box",
        category: "Dev",
        subcategory: "Entity"
    })
    StarESP = false;

    @SwitchProperty({
        name: "Debug Messages",
        description: "Shows debug messages in console for development",
        category: "Dev",
        subcategory: "Logs"
    })
    DevMessages = false;

    @SwitchProperty({
        name: "No Mage Sheep",
        description: "Prevents Mage Sheep from rendering",
        category: "Dungeon-QOL",
        subcategory: "Render"
    })
    NoMageSheep = false;
    
    @SwitchProperty({
        name: "All Leaped",
        description: "Alerts you when everyone is in P5",
        category: "Dungeon-QOL",
        subcategory: "M7 P5"
    })
    allLeaped = false;


    @SwitchProperty({
        name: "Rag Axe Alert",
        description: "Tells you when to Rag Axe in P5",
        category: "Dungeon-QOL",
        subcategory: "Alerts"
    })
    RagAxeAlert = false;

    @ButtonProperty({
        name: "Move Rag Axe Alert Text",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeon-QOL",
        subcategory: "Alerts",
        placeholder: "Move",
    })
    MoveRagAxeAlert() {
        this.RagAxeAlertGUI.open()
    };

    @SwitchProperty({
        name: "Auto Rejoin on Kick",
        description: "Automatically notifies the party that you were kicked and rejoins in 65 seconds",
        category: "QOL",
        subcategory: "Kicked"
    })
    rejoin = false;

    @SwitchProperty({
        name: "Pre4 Healer Leap Alert",
        description: "Alerts you when the healer has leaped to you",
        category: "Dungeon-QOL",
        subcategory: "Alerts"
    })
    healerLeapedpre4 = false;

    @ButtonProperty({
        name: "Move Healer Leaped Text",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeon-QOL",
        subcategory: "Alerts",
        placeholder: "Move",
    })
    MovehealerLeapedpre4() {
        this.healerLeapedpre4GUI.open()
    };

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Dungeon-QOL", "&aMod Created by Traube_V2 and InfernoLloyd\n Version 1.0.1 ");

        this.addDependency("Rewarp Coords", "Rewarp");
        this.addDependency("Rewarp Coords", "Rewarp on Coords");
        this.addDependency("Rewarp on Coords", "Rewarp");
        this.addDependency("Rewarp monolyth", "Rewarp");
        this.addDependency("Rewarp to", "Rewarp");
        this.addDependency("Move M3 Timer GUI", "M3 Timer");
        this.addDependency("Move Pad Timer GUI", "Pad Timer");
        this.addDependency("Move Healer Leaped Text", "Pre4 Healer Leap Alert");
        this.addDependency("Move Rag Axe Alert Text", "Rag Axe Alert");
    }
}

export default new Settings()