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

export function getFilteredBy(searchWord: string): any {
  const keys: string[] = Object.keys(localStorage).filter((key) =>
    key.includes(searchWord)
  );
  const sortedKeys = keys.sort((a, b): number => {
    const numA = parseInt(a.replace(/\D/g, ""), 10);
    const numB = parseInt(b.replace(/\D/g, ""), 10);
    return numA - numB;
  });
  return sortedKeys;
}
