function compare() {
  var inputCurrent = <HTMLInputElement> document.getElementById("input-current");
  var inputAvailable = <HTMLInputElement> document.getElementById("input-available");

  var inputCurrentArray = inputCurrent.value.split("\n");
  var inputAvailableArray = inputAvailable.value.split("\n");
  var counter = 0;
  var finding = "";

  for (var _i = 0; _i < inputCurrentArray.length; _i++) {
    var current = inputCurrentArray[_i];
    var referenceNumber = extractNumber(current);
    var highestNumber = 0;

    for (var _o = 0; _o < inputAvailableArray.length; _o++) {
      var available = inputAvailableArray[_o];

      if (current.substr(0, lastUnderscorePosition(current)) == available.substr(0, lastUnderscorePosition(available))) {
        var availableVersion = extractNumber(available);
        if (referenceNumber < availableVersion && availableVersion > highestNumber) {
          finding = available;
          highestNumber = availableVersion;
        }
      }
    }

    if (finding.length > 0) {
      addRow(counter++, current, finding);
    }
  }

  for (var _o = 0; _o < inputAvailableArray.length; _o++) {
    var available = inputAvailableArray[_o];
    var hasFindings = true;
    for (var _i = 0; _i < inputCurrentArray.length; _i++) {
      var current = inputCurrentArray[_i];
      if (current.substr(0, lastUnderscorePosition(current)) == available.substr(0, lastUnderscorePosition(available))) {
        hasFindings = false;
        break;
      }
    }
    if (hasFindings) {
      addRow(counter++, "", available);
    }
  }
}


function addRow(counter: number, current: string, finding: string) {
  var resultTable = <HTMLTableElement> document.getElementById("resultTableBody");
  var row = <HTMLTableRowElement> resultTable.insertRow(counter);
  var numberCell = row.insertCell(0);
  numberCell.innerHTML = counter.toLocaleString();
  var findingsCell = row.insertCell(1);
  findingsCell.innerHTML = current;
  var currentCell = row.insertCell(2);
  currentCell.innerHTML = finding;
}

function extractNumber(inputString: string) {
  var matches = inputString.match(/\d+$/);
  if (matches) {
    var number = Number(matches[0]);
    return number;
  }
  return -1;
}

function lastUnderscorePosition(inputString: string) {
  for (var _i = inputString.length; _i >= 0; _i--) {
    var char = inputString[_i];
    if (char == "_") {
      return _i;
    }
  }
}
