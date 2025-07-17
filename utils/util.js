export const prefix_vexo = "§3[vexo]"

export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

export const playercoords = () => {
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