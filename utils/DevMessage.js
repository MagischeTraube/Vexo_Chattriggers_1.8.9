import config from "../config";

const prefix_vexodebug = "§3[vexo-DEBUG]"

export function DevMessage(messages) {
    if (!config.DevMessages) return;

    if (Array.isArray(messages)) {
        messages.forEach(message => {
            if (typeof message === "object" && message !== null) {
                let text = "";
                if (message.id && message.remainingTicks !== undefined) {
                    text = `{ID: ${message.id}, Ticks: ${message.remainingTicks}}`;
                } else {
                    try {
                        text = JSON.stringify(message, null, 0);
                    } catch (e) {
                        text = `[Object] - Could not stringify: ${e.message}`;
                    }
                }
                ChatLib.chat(prefix_vexodebug + " &7" + text);
            } else {
                ChatLib.chat(prefix_vexodebug + " &7" + message);
            }
        });
    } else {
        if (typeof messages === "object" && messages !== null) {
            try {
                const text = JSON.stringify(messages, null, 0);
                ChatLib.chat(prefix_vexodebug + " &7" + text);
            } catch (e) {
                ChatLib.chat(prefix_vexodebug + " &7" + `[Object] - Could not stringify: ${e.message}`);
            }
        } else {
            ChatLib.chat(prefix_vexodebug + " &7" + messages);
        }
    }
}