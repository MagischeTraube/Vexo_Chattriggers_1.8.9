import request from "../../requestV2";
import { getVersion, prefix_vexo } from "./util";

const MODULE_NAME = "vexo";
const LOCAL_VERSION = getVersion()
const GITHUB_REPO = "MagischeTraube/Vexo_Chattriggers_1.8.9";
const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const TEMP_DIR = `./config/ChatTriggers/modules/Vexo/updates`;
const TEMP_ZIP_PATH = `${TEMP_DIR}/${MODULE_NAME}_update.zip`;
const MODULE_DIR = `./config/ChatTriggers/modules/Vexo/`;


export function checkForUpdates() {
    request({
        url: API_URL,
        headers: { 'User-Agent': 'Mozilla/5.0' },
    }).then(response => {
        const data = JSON.parse(response);
        const REMOTE_VERSION = data.tag_name;
        const DOWNLOAD_URL = data.assets[0]?.browser_download_url;

        if (!DOWNLOAD_URL) throw new Error("No download URL found in the release!");
        
        if (REMOTE_VERSION !== LOCAL_VERSION) {
            ChatLib.chat(`${prefix_vexo} &eNew Version ${REMOTE_VERSION} found!  Updating...`);
            downloadAndInstallUpdate(DOWNLOAD_URL);
        } else {
            ChatLib.chat(`${prefix_vexo} &aYou already have the latest version ${LOCAL_VERSION}`);
        }
    }).catch(error => {
        ChatLib.chat(`${prefix_vexo} &cUpdate-Check failed: ${error.message}`);
    });
}

function downloadAndInstallUpdate(downloadUrl) {
    try {
        const dir = new java.io.File(TEMP_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
            ChatLib.chat(`${prefix_vexo} &aFolder created: ${TEMP_DIR}`);
        }
    } catch (e) {
        ChatLib.chat(`${prefix_vexo} &cFolder error: ${e}`);
        return false;
    }

    try {
        const url = new java.net.URL(downloadUrl);
        const connection = url.openConnection();
        connection.setRequestProperty("User-Agent", "Mozilla/5.0");
        
        const inputStream = connection.getInputStream();
        const file = new java.io.File(TEMP_ZIP_PATH);
        const outputStream = new java.io.FileOutputStream(file);
        
        const buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
        let bytesRead;
        let totalBytes = 0;
        
        while ((bytesRead = inputStream.read(buffer)) > 0) {
            outputStream.write(buffer, 0, bytesRead);
            totalBytes += bytesRead;
        }
        
        outputStream.close();
        inputStream.close();
        
        if (file.length() === 0) {
            throw new Error("File is empty (0 bytes)");
        }
        
        const zipFile = new java.util.zip.ZipFile(file);
        zipFile.close();

        FileLib.unzip(TEMP_ZIP_PATH, MODULE_DIR);
        
        ChatLib.chat(`${prefix_vexo} &aUpdate successful! Use &6/ct reload&a.`);
        return true;
    } catch (e) {
        ChatLib.chat(`${prefix_vexo} &Error: ${e}`);
        return false;
    }
}