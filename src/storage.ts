export function add(key: string, value: any): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}
export function remove(key: string): void {
  window.localStorage.removeItem(key);
}

export function edit(key: string, value: any): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function get(key: any): any {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function clear(): void {
  window.localStorage.clear();
}

export function loadLocalStorage() {
  const keys = Object.keys(localStorage);
  const sortedKeys = keys.sort((a, b) => Number(a) - Number(b));
  return sortedKeys;
}
