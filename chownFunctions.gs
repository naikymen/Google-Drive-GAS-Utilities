// Chown a folder
function chownFolder(folderId, targetUser) {
  var folder = DriveApp.getFolderById(sourceFolderId);
  folder.setOwner(targetUser);
}


// Chown subfolders
function chownSubfolders(sourceFolderId, targetUser) {
  var sourceFolder = DriveApp.getFolderById(sourceFolderId);

  var folders = sourceFolder.getFolders();  //folders contiene las carpetas dentro del target FolderIterator
  
  while(folders.hasNext()) {
    var subFolder = folders.next();
    subFolder.setOwner(targetUser)
    
    chownFolders(subFolder, targetUser); // Se vuelve a llamar a sí mismo para lograr recursividad.
  }
}


// List folders by owner
function listFoldersByOwner() {
  Logger.log('Start')
  
  var folders = DriveApp.searchFolders('"some.email@gmail.com" in owners');
  var logSsID = 'some spreadsheet id';
  var targetUser = "some.other.email@gmail.com";
  
  var ss = SpreadsheetApp.openById(logSsID);
  SpreadsheetApp.setActiveSpreadsheet(ss);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  while(folders.hasNext()) {
    var folder = folders.next()
    
    var lastRow = sheet.getLastRow();  // Conseguir el numero de la ultima fila con datos
    sheet.getRange(lastRow+1,1,1,3).setValues([[ folder.getName(), folder.getId(), getFolderPath(folder.getId())]]);
    SpreadsheetApp.flush();
  }
  

  var lastRow = sheet.getLastRow();  // Conseguir el numero de la ultima fila con datos
  sheet.getRange(lastRow+1,1,1,3).setValues([['End', 'End', 'End']]);
  SpreadsheetApp.flush();
  
  Logger.log('End')
}


// List files by owner
function listFilesByOwner() {
  // No funciona con archivos no-Google
  // Eso incluye todo, como: PDFs, JPGs, DOCX, etc...
  Logger.log('Start');
  
  var files = DriveApp.searchFiles('"frubox.moderadores@gmail.com" in owners');
  var logSsID = '18QS6PTsA-H5aAiroPI4Dc75_DtdqDmmZNRNV6nbhubY';
  var targetUser = "fru.box.unsam@gmail.com";
  
  var ss = SpreadsheetApp.openById(logSsID);
  SpreadsheetApp.setActiveSpreadsheet(ss);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  while(files.hasNext()) {
    var file = files.next();
    var fileName = file.getName();
    
    // Remove "/" from filenames
    if (fileName.indexOf("/") >= 0) {
      Logger.log(fileName)
      file.setName(fileName.replace(/\//g, '-'))
    }
    
    var lastRow = sheet.getLastRow();  // Conseguir el numero de la ultima fila con datos
    sheet.getRange(lastRow+1,1,1,3).setValues([[ file.getName(), file.getId(), getFilePath(file.getId())]]);
    SpreadsheetApp.flush();
  }
  

  var lastRow = sheet.getLastRow();  // Conseguir el numero de la ultima fila con datos
  sheet.getRange(lastRow+1,1,1,3).setValues([['End', 'End', 'End']]);
  SpreadsheetApp.flush();
  
  Logger.log('End')
}


function getFolderPath(folderID) {
    var folder = DriveApp.getFolderById(folderID),
      folders = [],
      parent = folder.getParents();

    while (parent.hasNext()) {
      
      parent = parent.next();
      
      // Display the URLs of the contining folders
      //Logger.log("Folder URL: " + parent.getUrl());

      folders.push(parent.getName());

      parent = parent.getParents();

    }

    if (folders.length) {
      // Display the full folder path
      //Logger.log("Folder path: " + folders.reverse().join("/"));
      return folders.reverse().join("/")
    }
}


function getFilePath(fileID) {
    var file = DriveApp.getFolderById(fileID),
      files = [],
      parent = file.getParents();

    while (parent.hasNext()) {
      
      parent = parent.next();
      
      // Display the URLs of the contining folders
      //Logger.log("Folder URL: " + parent.getUrl());

      files.push(parent.getName());

      parent = parent.getParents();

    }

    if (files.length) {
      // Display the full folder path
      //Logger.log("Folder path: " + folders.reverse().join("/"));
      return files.reverse().join("/")
    }
}
