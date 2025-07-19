export const prefix_vexo = "§3[vexo]"

export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

export function playercoords() {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    return [Math.round(x),Math.round(y),Math.round(z)];
}

export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
}

export function getDistance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)
}

// Credits FreshNotifier
export function getAllPlayers() {
    const players = World
        .getAllPlayers()
        .filter(player =>
            (player.getUUID().version() === 4 || player.getUUID().version() === 1) && // Players and Watchdog have version 4, nicked players have version 1, this is done to exclude NPCs
            player.ping === 1 // -1 is watchdog and ghost players, also there is a ghost player with high ping value when joining a world
        )
        .map(player => ({ name: player.name, x: player.getX(), y: player.getY(), z: player.getZ() })) // Store name and coordinates
        .filter((x, i, a) => a.indexOf(x) == i); // Distinct, sometimes the players are duplicated in the list

    return players;
}