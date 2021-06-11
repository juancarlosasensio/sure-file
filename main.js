let form = document.querySelector('form');
let csvField = document.getElementById('csv-text')
let jsonField = document.getElementById('json-text')
let clearCSVButton = document.querySelector('button[data-behavior^=clear-input]')
let codeEl = document.querySelector('code');
let fileDownloadBtn = document.createElement('button')
let clearTextInFormInputs = clearTextInElements(csvField, jsonField)

fileDownloadBtn.appendChild(document.createTextNode('Download file'))

clearCSVButton.addEventListener('click', clearTextInFormInputs)
form.addEventListener('submit', displayConvertedString)
fileDownloadBtn.addEventListener('click', downloadFile)

// Use FileSaver.js to save and download file
//https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js
//https://github.com/eligrey/FileSaver.js
function downloadFile(e) {
  e.preventDefault();
  let blob = new Blob(
    [JSON.parse(jsonField.value)], { type: "application/json"}
  )
  saveAs(blob, 'newFile.json') 
}

function displayConvertedString(e) {
  let currentValue = getInputValue(csvField);
  if (currentValue) { 
    let data = csvToJson(currentValue)
    if (isJson(data))
      updateDomNodesWithValue(JSON.stringify(data), jsonField, codeEl);
      form.appendChild(fileDownloadBtn)
  } else { 
    updateDomNodesWithValue("", jsonField)
    updateDomNodesWithValue("//converted file will appear here", codeEl)
  }
  e.preventDefault();
}

function updateDomNodesWithValue(str, ...domNodes) {
  let areValidNodes = !domNodes.map(
    function isNode(node) { 
      return isElementNode(node) 
    }).includes(false)
  if (areValidNodes) {
    domNodes.forEach(function updateValue(node) {
      if (isValidTextInput(node)) {
        node.value = String(str);
      } else {
        node.textContent = String(str);
      }
    })
  }
}

function isValidTextInput(node) {
  let tagName = node.tagName.toLowerCase()
  if (tagName == 'input' || tagName == 'textarea') {
    return true;
  }
}

function isElementNode(domNode) {
  return domNode.ELEMENT_NODE == 1
}

// Use Papaparse.js to parse .csv string 
// https://www.papaparse.com/docs#results
function csvToJson(str) {
  let config = {
    header: true, 
    dynamicTyping: true
  }
  return JSON.stringify(Papa.parse(str, config).data); 
}

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function getInputValue(input) {
  return String(input.value).trim();
}

function clearTextInElements(...els) {
  let copyOfEls = [...els]
  return (
    function clearText(e) {
      e.preventDefault()
      if (!e.target.dataset.behavior || e.target.dataset.behavior != 'clear-input-text' ) {
        console.warn("Button element doesn't have data-attr.")
        return;
      } else {
        updateDomNodesWithValue("", ...copyOfEls)
      }
    }
  )
}