export function getSource(creep, defaultValue) {
    const sources = creep.room.find(FIND_SOURCES);
    const sourceIndex = (creep.memory.tag ?? defaultValue) % sources.length;
    return sources[sourceIndex];
}