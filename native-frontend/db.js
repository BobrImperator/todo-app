export function save(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function read(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
