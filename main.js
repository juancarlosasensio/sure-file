let form = document.querySelector('form');
let csvField = document.getElementById('csv-text')
let jsonField = document.getElementById('json-text')
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
csvField.addEventListener('input', getCSVString)
form.addEventListener('submit', logCurrentCSVString)
    // What is the current value of the CSV string we will convert to JSON?

    //What do we need to do with this currentValue to be able to convert it to JSON?
    // -> Get column headers. For each record, get the value for each column

    //How do we do this?    
function logCurrentCSVString(e) {
  let currentCSVString = getCSVString(csvField);
  if (currentCSVString) { 
    let arr = csvStringToArray(currentCSVString);
    let headers = getCSVHeaders(arr);
    jsonField.value = buildJSON(headers, arr)
  } else { console.log('Nothing to print') }
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