function get(Element) {
  return document.querySelector(Element);
}

function getAll(Element) {
  return document.querySelectorAll(Element);
}

function createElementWith(element, elementName, elementText, htmlText) {

  let tempElement = document.createElement(element);
  let elSelectorType = elementName.split('');
  let type = elSelectorType.shift();
  elSelectorType = elSelectorType.join('');

  if (type === '.') {
    tempElement.classList.add(elSelectorType); 
  }
  if (type === '#') {
    tempElement.id = elSelectorType;
  }
  if (elementText && elementText !== undefined && elementText !== '') {
    tempElement.innerText = elementText;
  }
  if (htmlText && htmlText !== undefined && htmlText !== '') {
    tempElement.innerHTML = htmlText;
  }
  return tempElement;
}
if (typeof module !== 'undefined') {
  module.exports = { get, getAll, createElementWith };
}
