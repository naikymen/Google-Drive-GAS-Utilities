function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("Page Title")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);  // I am not sure if this is needed.
}


// Variables here coincide with those passed from the forms.html file.
// Modify accordingly! 

function uploadFileToGoogleDrive(data, filename, nombre, turno, tp, docente, email) {
  
  try {
    
    var dropbox = "folder_ID";  // Modify here!
    var folder = DriveApp.getFolderById(dropbox);
    
    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, filename),
        file = folder.createFile(blob);
    
    // Prepend a systematic string with information about the submission to the associated file.
    file.setName(turno + "_" + tp + "_" + docente + "_" + nombre + "_" + email + "_" + turno + "_" + file.getName())
    
    // Send a confirmation email
    mandarMail(email, file, tp, nombre);

    // Register the submission to a google sheets file
    registrar(email, file.getUrl(), tp, nombre, turno, docente);
    
    
    return "OK";
    
  } catch (f) {
    return f.toString();
  }
  
}

function registrar (email, file, tp, nombre, turno, docente) {
  var spreadsheet_ID = "spreadsheet_ID"  // Modify here!
  var doc = SpreadsheetApp.openById(spreadsheet_ID);
  var sheet = doc.getSheetByName("Sheet1");
  //var date = Utilities.formatDate(new Date(), "GMT+1", "yyyy/MM/dd")
  var date = new Date();
  sheet.appendRow([
    date,
    nombre, 
    email, 
    file, 
    tp, 
    turno, 
    docente]);
}


function mandarMail (email, file, tp, nombre) {
  
  // Share the uploaded file with the submitter's email account.
  file.addViewer(email);
  
  // Send an email to the submitter, as confirmation.
  MailApp.sendEmail(email, "Entrega de " + tp + " de Química General",
                    nombre + "," + "\n" +
                    "You have recieved this email because..." +  "\n" +
                    "The attached file ahs been uploaded to: " +
                    file.getUrl() + "\n" + "\n" +
                    "Please contact someone if you have questions" + "\n" + "\n" +
                    "Regards," + "\n" +
                    "The staff"
                    );
} 
