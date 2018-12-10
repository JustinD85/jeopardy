function get(Element) {
  return document.querySelector(Element);
}

function getAll(Element) {
  return document.querySelectorAll(Element);
}

function createEl(element) {
  return document.createElement(element);
}

module.exports = { get, getAll, createEl };