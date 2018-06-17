function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("Page Title")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);  // I am not sure if this is needed.
}


// This function is called from the HTML form by reader.onloadend()
// Variables here must coincide with those passed from the forms.html file.
// Modify accordingly!
function uploadFileToGoogleDrive(data, filename, nombre, turno, tp, docente, email, dni) {
  
  try {
    
    var dropbox = "modify here!";
    var commenterEmail = "modify here!";
    var spreadsheetLogId = "modify here!"
    var folder = DriveApp.getFolderById(dropbox);
    
    try{
      var subFolder =  folder.getFoldersByName(tp).next();
    }
    catch(e) {
      var subFolder =  folder.createFolder(tp);
    }

    var contentType = data.substring(5,data.indexOf(';'));
    
    var fileName = turno + "_" + tp + "_" + docente + "_" + nombre + "_" + email + "_" + filename;
    
    var bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7));

    var blob = Utilities.newBlob(bytes, contentType, filename);
    
    var permissionsResource = {
    'role': 'reader',
    'type': 'anyone',
    'withLink': true
    };
    
    var filesResource = {
      'title': fileName,
      'mimeType': contentType,
      'description': 'lab report',
      "parents": [
        {
          "kind": "drive#parentReference",
          "id": subFolder.getId()
        }
      ],
      "permissions": [
        permissionsResource
      ]
    };
    
    // Insert
    var dfile = Drive.Files.insert(filesResource, blob);
    
    // Get id and file throug the regular Drive functions
    var file = DriveApp.getFileById(dfile.id);
    var fileId = file.getId();
    
    // For the records!
    mandarMail(email, file, tp, nombre);
    registrar(email, file.getUrl(), tp, nombre, turno, docente, dni, spreadsheetLogId);
    
    
    // Share to everyone
    Drive.Permissions.insert(permissionsResource, fileId);
    // Share to commenters
    permissionInsertSilentGroupCommenter(fileId, commenterEmail);
    
    return "OK";
    
  } catch (f) {
    return f.toString();
  }
  
}


function registrar (email, file, tp, nombre, turno, docente, dni, spreadsheetId) {
  var doc = SpreadsheetApp.openById(spreadsheetId);
  var sheet = doc.getSheets()[0]
  
  var date = new Date();
  sheet.appendRow([
    date,
    dni,
    nombre, 
    email, 
    file, 
    tp, 
    turno, 
    docente]);
  SpreadsheetApp.flush();
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


function permissionInsertSilentGroupCommenter(fileId, email){
  
  Drive.Permissions.insert(
    {
      'role': 'reader',
      "additionalRoles": ['commenter'],
      'type': 'group',
      'value': email
    },
    fileId,
    {
      'sendNotificationEmails': 'false'
    }
  );
}
