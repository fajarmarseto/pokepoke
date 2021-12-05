export function getLocalStorage(key) {
  const locatStorage = localStorage.getItem(key);
  return locatStorage !== null ? JSON.parse(locatStorage) : [];
}

export function setLocalStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}
