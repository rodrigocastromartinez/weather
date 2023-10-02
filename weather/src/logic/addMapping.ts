export const ICON_MAP = new Map()

addMapping([0, 1], ['sun', 'Sunny'])
addMapping([2], ['cloud-sun', 'Partially Cloudy'])
addMapping([3], ['cloud', 'Cloudy'])
addMapping([45, 48], ['smog', 'Foggy'])
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], ['cloudy-showers-heavy', 'Storm'])
addMapping([71, 73, 75, 77, 85, 86], ['snowflake', 'Snow'])
addMapping([95, 96, 99], ['cloud-bolt', 'Thunder storm'])

function addMapping(values: number[], icon: string[]) {
    values.forEach(value => {
        ICON_MAP.set(value, icon)
    })
}