function getSpreadsheetID() {
    return "<spreadsheet id>";
  }
  
  function getSheet(a) {
    return a
  }
  
  /** @param {ctx} ctx*/
  function updateTotalOrder(id1) {
    try{
      var customerObject = getCustomerByID(id1);
    customerObject.totalorder += 1;
  
    var spreadsheetId = getSpreadsheetID()
    var sheetName = getSheet("customer table");
  
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  
    var data = sheet.getDataRange().getValues();
  
    for (var i = 0; i < data.length; i++) {
      if (id1 === data[i][4]) {
        sheet.getRange(i+1, 7).setValue(customerObject.totalorder);
        break
      }}
    }catch(error){
        console.log(error)
      }
  
  }
  
  function writeCustomerToSpreadsheet(tata) {
    var spreadsheetId = getSpreadsheetID()
    var sheetName = getSheet("customer table");
  
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    var lastRow = sheet.getLastRow();
    var newRow = lastRow + 1;
  
    sheet.getRange(newRow, 1).setValue(newRow - 1);
    sheet.getRange(newRow, 2).setValue(tata.name);
    sheet.getRange(newRow, 3).setValue(tata.username);
    sheet.getRange(newRow, 4).setValue(tata.address);
    sheet.getRange(newRow, 5).setValue(tata.id);
    sheet.getRange(newRow, 6).setValue(tata.contact);
    sheet.getRange(newRow, 7).setValue(0);
  
    sheet.getLastColumn();
  }
  
  
  /** @param {ctx} ctx */
  function isRegistered(customerChatId) {
    var sheet = SpreadsheetApp.openById(getSpreadsheetID())
      .getSheetByName(getSheet("customer Table"));
  
    var data = sheet.getDataRange().getValues();
  
    for (var i = 0; i < data.length; i++) {
      if (customerChatId === data[i][4]) {
        return true
      }
    }
    return false
  }
  
  
  
  function getCustomerByID(customerChatId = 856048902) {
    var sheet = SpreadsheetApp.openById(getSpreadsheetID())
      .getSheetByName(getSheet("customer Table"));
  
    var data = sheet.getDataRange().getValues();
  
    for (var i = 0; i < data.length; i++) {
      if (customerChatId === data[i][4]) {
        data = data[i];
        break
      }
    }
  
    customerData = {
      name: data[1],
      username: data[2],
      address: data[3],
      id: data[4],
      contact: data[5],
      totalorder: data[6]
    }
  
    return customerData;
  }
  
  function writeOrderToSpreadsheet(order = {}) {
    var spreadsheetId = getSpreadsheetID()
    var sheetName = getSheet("order table");
  
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    currentDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd")
    var lastRow = sheet.getLastRow();
    var newRow = lastRow + 1;
  
  
    sheet.getRange(newRow, 1).setValue(newRow - 1);
    sheet.getRange(newRow, 2).setValue(order.cake_id);
    sheet.getRange(newRow, 3).setValue(order.quantity);
    sheet.getRange(newRow, 4).setValue(order.special_requests);
    sheet.getRange(newRow, 5).setValue(order.price);
    sheet.getRange(newRow, 6).setValue(order.transaction);
    sheet.getRange(newRow, 7).setValue(currentDate);
  
    sheet.getLastColumn();
  }
  
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
  
  // function writeOrderToSpreadsheet(order = {}) {
  //   var spreadsheetId = getSpreadsheetID();
  //   var sheetName = getSheet("order table");
  
  //   var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  //   var currentDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd");
  //   var lastRow = sheet.getLastRow();
  //   var newRow = lastRow + 1;
  
  //   sheet.getRange(newRow, 1).setValue(newRow - 1);
  //   sheet.getRange(newRow, 2).setValue(order.cakeId);
  //   sheet.getRange(newRow, 3).setValue(order.quantity);
  //   sheet.getRange(newRow, 4).setValue(order.specialRequest);
  //   sheet.getRange(newRow, 5).setValue(order.price);
  //   sheet.getRange(newRow, 6).setValue(currentDate);
  
  //   sheet.getLastColumn();
  // }
  
  
