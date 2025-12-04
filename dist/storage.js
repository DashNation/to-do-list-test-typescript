export function add(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
export function remove(key) {
    window.localStorage.removeItem(key);
}
export function edit(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
export function get(key) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}
export function clear() {
    window.localStorage.clear();
}
export function loadLocalStorage() {
    const keys = Object.keys(localStorage);
    const sortedKeys = keys.sort((a, b) => Number(a) - Number(b));
    return sortedKeys;
}
//# sourceMappingURL=storage.js.map