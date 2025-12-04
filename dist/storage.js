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
export function getFilteredBy(searchWord) {
    const keys = Object.keys(localStorage).filter((key) => key.includes(searchWord));
    const sortedKeys = keys.sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ""), 10);
        const numB = parseInt(b.replace(/\D/g, ""), 10);
        return numA - numB;
    });
    return sortedKeys;
}
//# sourceMappingURL=storage.js.map