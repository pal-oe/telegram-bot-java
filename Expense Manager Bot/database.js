function getSpreadsheetID() {
    return "1KYJLMOr_wSNJA5NL2uQeag1Bu8XQcr6Q4f8SqSPXNHo";
  }
  
  function getSheet(a) {
    return a
  }
  
  /** @param {ctx} ctx */
  function getCategories() {
    //This method returns array of arrays of categories
    var sheet = SpreadsheetApp.openById(getSpreadsheetID()).getSheetByName("category table");
  
    var data = sheet.getDataRange().getValues();
    return data;
  }
  
  /** @param {ctx} ctx */
  function writeBudgetToTable(data = {}) {
    try {
      let sheet = SpreadsheetApp.openById(getSpreadsheetID()).getSheetByName("budgets");
      var lastRow = sheet.getLastRow();
      var newRow = lastRow + 1;
  
      sheet.getRange(newRow, 1).setValue(newRow - 1);//id
      sheet.getRange(newRow, 2).setValue(data.category);//category name
      sheet.getRange(newRow, 3).setValue(data.chat_id);//chat_id
      sheet.getRange(newRow, 4).setValue(data.totalAmount);//initial amount
      sheet.getRange(newRow, 5).setValue(data.totalAmount);//left amount
      sheet.getRange(newRow, 6).setValue(new Date());
  
      SpreadsheetApp.flush()
  
    }
    catch (e) {
      console.log(e)
    }
  }
  
  /** @param {ctx} ctx */
  function getWeeklyData() {
    let sheet = SpreadsheetApp.openById(getSpreadsheetID()).getSheetByName("budgets");
    var lastRow = sheet.getLastRow();
  
    var dataRange = sheet.getRange("A2:F" + lastRow);
    var dataValues = dataRange.getValues();
  
    var currentDate = new Date();
    var firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
    var lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  
    var filteredData = dataValues.filter(function (row) {
      var rowDataDate = new Date(row[5]);
      return rowDataDate >= firstDayOfWeek && rowDataDate <= lastDayOfWeek;
    });
  
    // Print the filtered data
    for (var i = 0; i < filteredData.length; i++) {
      console.log(filteredData[i]);
    }
  }
  
  /** @param {ctx} ctx */
  function removeEmptyRows(sheetName = "budgets") {
    let sheet = SpreadsheetApp.openById(getSpreadsheetID()).getSheetByName(sheetName);
  
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var dataRange = sheet.getRange(1, 1, lastRow, lastColumn); // Get the range of the entire sheet
    var values = dataRange.getValues();
  
    for (var i = values.length - 1; i >= 0; i--) {
      var row = values[i];
      var isEmpty = true;
      for (var j = 0; j < row.length; j++) {
        if (row[j] !== "") {
          isEmpty = false;
          break;
        }
      }
      if (isEmpty) {
        sheet.deleteRow(i + 1);
      }
    }
  }
  
  function getDataByChatId(chatId = 856048902) {
    var sheet = SpreadsheetApp.openById(getSpreadsheetID()).getSheetByName("budgets");
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn);
  
    var values = dataRange.getValues();
  
    var filteredData = values.filter(function (row) {
      return row[2] === chatId;
    });
  
    // console.log(filteredData)
    return filteredData;
  }
  
  function deleteBudgetById(id) {
    var sheet = SpreadsheetApp.openById(getSpreadsheetID()).getSheetByName("budgets");
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var dataRange = sheet.getRange(2, 1, lastRow - 1, lastColumn); // Assuming data starts from row 2 and ends at the last row
  
    var values = dataRange.getValues();
  
    for (var i = values.length - 1; i >= 0; i--) {
      if (values[i][0] === id) { // Assuming id is in the first column (column A)
        sheet.deleteRow(i + 2); // Rows are 1-indexed, so we add 2 to the index
      }
    }
  }
  
  function adjustIds() {
    var sheet = SpreadsheetApp.openById(getSpreadsheetID()).getSheetByName("budgets");
    var lastRow = sheet.getLastRow();
    var dataRange = sheet.getRange(2, 1, lastRow - 1, 1); // Assuming ids are in the first column and data starts from row 2
  
    var values = dataRange.getValues();
  
    var previousId = 0;
    let current_id = 1
    for (var i = 0; i < values.length; i++) {
      var id = values[i][0];
      console.log(id)
      if (id === current_id) {
        continue;
      }
      sheet.getRange(i + 2, 1).setValue(current_id);
      current_id = current_id + 1;
     // Rows are 1-indexed, so we add 2 to the index
      previousId = id;
    }
  }
      