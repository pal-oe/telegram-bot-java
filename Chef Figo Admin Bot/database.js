function getSpreadsheetID() {
    return "1XOBd_yAcQ8v-4QlqkO0KmAC4juQxTdXT8L-BpKOMgnQ";
  }
  
  function getSheet(a) {
    return a
  }
  
  
  
  function writeCakeToSpreadsheet(tata = {}) {
    var spreadsheetId = getSpreadsheetID()
    var sheetName = getSheet("cake table");
  
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    var lastRow = sheet.getLastRow();
    var newRow = lastRow + 1;
  
  
    cakeID = newRow - 1
    sheet.getRange(newRow, 1).setValue(cakeID);
    sheet.getRange(newRow, 2).setValue(tata.cakename);
    sheet.getRange(newRow, 3).setValue(tata.cakecategory);
    sheet.getRange(newRow, 4).setValue(tata.cakedesign);
    sheet.getRange(newRow, 5).setValue(tata.cakeflavor);
    sheet.getRange(newRow, 6).setValue(tata.cakeoccasion);
    sheet.getRange(newRow, 7).setValue(tata.cakesize);
    sheet.getRange(newRow, 8).setValue(tata.cakeprice);
    sheet.getRange(newRow, 9).setValue(tata.cakephoto);
  
    sheet.getLastColumn();
    return cakeID;
  }
  
  
  
  //get cake from table
  
  function getCakeFromSpreadsheet(cakeId) {
    var spreadsheetId = getSpreadsheetID();
    var sheetName = getSheet("cake table");
  
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    var lastRow = sheet.getLastRow();
  
    for (var i = 1; i <= lastRow; i++) {
      var currentCakeId = sheet.getRange(i, 1).getValue();
      if (currentCakeId === cakeId) {
        var cake = {
          cakeId: currentCakeId,
          cakename: sheet.getRange(i, 2).getValue(),
          cakecategory: sheet.getRange(i, 3).getValue(),
          cakedesign: sheet.getRange(i, 4).getValue(),
          cakeflavor: sheet.getRange(i, 5).getValue(),
          cakeoccasion: sheet.getRange(i, 6).getValue(),
          cakesize: sheet.getRange(i, 7).getValue(),
          cakeprice: sheet.getRange(i, 8).getValue(),
          cakephoto: sheet.getRange(i, 9).getValue()
        };
  
        return cake;
      }
    }
  
    return null;
  }
  
  //---------------------------------------------------------------
  //---------------------------------------------------------------
  
  // Function to get customer data from the spreadsheet
  function getCustomerDataFromSpreadsheet() {
    var spreadsheetId = getSpreadsheetID();
    var sheetName = getSheet("customer table");
  
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    const data = sheet.getDataRange().getValues();
  
    const customerData = data.map((row, index) => ({
      id: row[0],
      name: row[1],
      username: row[2],
      address: row[3],
      chatID: row[4], 
      contact: row[5],
      totalOrder: row[6],
    }));
    //console.log(customerData)
    return customerData;
  }
  