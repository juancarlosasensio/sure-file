let form = document.querySelector('form');
let csvField = document.getElementById('csv-text')
let jsonField = document.getElementById('json-text')
let clearCSVButton = document.querySelector('button[data-behavior^=clear-input]')
const TEST_STR = `"Id","UserName"
"1","Sam Smith"
"2","Fred Frankly"
"1","Zachary Zupers"`
const TEST_ARR = csvStringToArray(TEST_STR);
const TEST_HDRS = getCSVHeaders(TEST_ARR);
const TEST_ROW_DATA = [...TEST_ARR].slice(1)
// console.log(csvField, jsonField);
// console.log(TEST_STR)
// console.log(TEST_ARR)
// console.log(TEST_ROW_DATA)
// console.log(TEST_HDRS)

clearCSVButton.addEventListener('click', clearTextInput)
csvField.addEventListener('input', getCSVString)
form.addEventListener('submit', displayCSVStringAsJSON)
    // What is the current value of the CSV string we will convert to JSON?

    //What do we need to do with this currentValue to be able to convert it to JSON?
    // -> Get column headers. For each record, get the value for each column

    //How do we do this?    
function displayCSVStringAsJSON(e) {
  let currentCSVString = getCSVString(csvField);
  if (currentCSVString) { 
    let arr = csvStringToArray(currentCSVString);
    let headers = getCSVHeaders(arr);
    jsonField.value = buildJSON(headers, arr)
  } else { 
    jsonField.value = "";
  }
  e.preventDefault();
}

function buildJSON(headersArr, rowsDataArr) {
  let rowsDataCopy = [...rowsDataArr];
  let output = [];
  let rowsData = rowsDataCopy.slice(1);
  rowsData.forEach(row => {
    let fields = row.split(',')
    let rowObj = {};
    for (let i = 0; i < headersArr.length; i++) {
      rowObj[headersArr[i]] = fields[i];
    }
    output.push(rowObj);
  })
  return JSON.stringify(output);
}

function csvStringToArray(string) {
  let arr = String(string).trim().split("\n");
  return arr;
}

function getCSVHeaders(arr) {
  let headers = arr[0].split(',');
  return headers;
}

function getCSVString(input) {
  return String(input.value).trim();
}

//Clear input text
function clearTextInput(e) {
  e.preventDefault()
  if (!e.target.dataset.behavior || e.target.dataset.behavior != 'clear-input-text' ) {
    console.warn("Button element doesn't have data-attr.")
    return;
  } else {
    let form = e.target.closest('form');
    let inputName = e.target.dataset.clearInput;
    let inputToClear = form.querySelector(`textarea[data-input-name~=${inputName}]`)
    inputToClear.value = "";
    jsonField.value = "";
  }
}