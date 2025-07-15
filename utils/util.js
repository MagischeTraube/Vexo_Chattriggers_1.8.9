export const prefix_vexo = "§3[vexo]"

export function isInDungeon() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) { }
}

export const playercoords = () => {
    x = Player.getX()
    y = Player.getY()
    z = Player.getZ()
    return [Math.round(x),Math.round(y),Math.round(z)];
}