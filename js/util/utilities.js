function get(Element) {
  return document.querySelector(Element);
}

function getAll(Element) {
  return document.querySelectorAll(Element);
}

function createEl(element) {
  return document.createElement(element);
}
if (typeof module !== 'undefined') {
  module.exports = { get, getAll, createEl };
}
