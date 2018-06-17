# Custom Google Form for Public File Upload
A Google Apps Script and associated HTML file, to generate a form which allows public uploading of file attachments.
It saves the attachment in a Google Drive folder.
It registers the answer in a Google Spreadsheet.
It sends a confirmation email to the submitter.
It shares the attachment with the submitter's email account.


Please note that I am a noob, and that some functions or variables have names in spanish.

## Usage
The .html form collects data, calls a function onSubmit, which passes the submission to the GAS code.

There are two versions: "normal api" and "drive api" which differ somewhat in features. The latter handles file sharing permissions to a group of commenters and makes the file publicly available to any viewer, and the form has an extra field.

## Notes
The GAS structure is based on this code https://ctrlq.org/code/19747-google-forms-upload-files.
I kept the handy validation function, which limits attachment file size and returns error information.

IMO, this code improves over the original in some ways:
The CSS and jQuery libraries have been updated, and list options styling from MaterializeCSS is used.
Validation works; pressing the submit button while leaving any invalid or blank field results in alerts.
The only thing I really would like to improve is the "uploading" part after submission. It does not seem to be very... robust.

## Issues
Google is not very consistent on setting permissions, regarding recently created files. I assume that this has to do with "lag" in the inheritance of permissions from the parent folder, which overwrite the permissions i want to set from the script.
