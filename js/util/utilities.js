function createElWithId(ele, elName, elText, htmlText) {

  let tempElement = document.createElement(ele);
  elName = elName.substr(1);

  tempElement.id = elName;

  return addTextOrHTML(tempElement, elText, htmlText);
}

function createElWithClass(ele, elName, elText, htmlText) {

  let tempElement = document.createElement(ele);
  elName = elName.substr(1);

  tempElement.classList.add(elName);
  
  return addTextOrHTML(tempElement, elText, htmlText);
}

function addTextOrHTML(tempElement, elText, htmlText) {

  if (elText && elText !== undefined && elText !== '') {
    tempElement.innerText = elText;
  }
  if (htmlText && htmlText !== undefined && htmlText !== '') {
    tempElement.innerHTML = htmlText;
  }
  return tempElement;
}

if (typeof module !== 'undefined') {
  module.exports = { createElWithId, createElWithClass, addTextOrHTML };
}
