import config from "../config"

export const GUICommand = register("command", () => {
    return config.openGUI();
}).setName("vexo");