export function get(Element) {
  return document.querySelector(Element);
}

export function getAll(Element) {
  return document.querySelectorAll(Element);
}

export function createEl(element) {
  return document.createElement(element);
}