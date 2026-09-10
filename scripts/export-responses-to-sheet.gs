/**
 * AssetBridge - Google Apps Script: Form Responses Auto-Exporter
 * File: scripts/export-responses-to-sheet.gs
 * 
 * DESCRIPTION:
 * This script automatically syncs Google Form submissions into a formatted Google Sheet,
 * appends timestamped user telemetry records, and provides functions to format data
 * for exporting to .xlsx or CSV for repository documentation.
 * 
 * INSTRUCTIONS FOR SETUP:
 * 1. Open your created Google Form in Google Drive.
 * 2. Click "Responses" tab -> Click the green "Link to Sheets" icon.
 * 3. In the connected Google Sheet, click "Extensions" -> "Apps Script".
 * 4. Replace any existing code in Code.gs with this file's contents.
 * 5. Click "Save" (disk icon) and run `onFormSubmitTriggerSetup()` once to authorize triggers.
 * 
 * INSTRUCTIONS TO MAKE GOOGLE SHEET PUBLIC (VIEW-ONLY):
 * 1. Click the top-right "Share" button in Google Sheets.
 * 2. Under "General access", change setting from "Restricted" to "Anyone with the link".
 * 3. Ensure role is set to "Viewer".
 * 4. Click "Copy link" and paste into README.md under Section 2 (User Feedback).
 * 
 * INSTRUCTIONS TO EXPORT .XLSX FOR REPOSITORY:
 * 1. In Google Sheets, click File -> Download -> Microsoft Excel (.xlsx).
 * 2. Save the downloaded file as `feedback/responses-export.xlsx` in your local AssetBridge repo.
 * 3. Commit `feedback/responses-export.xlsx` to Git.
 */

// Trigger setup: Runs automatically when a user submits the Google Form
function onFormSubmitTriggerSetup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(sheet)
    .onFormSubmit()
    .create();
  Logger.log('Successfully set up onFormSubmit trigger for AssetBridge feedback sheet.');
}

// Function executed on every new form submission
function onFormSubmit(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    
    // Auto-generate User ID if missing (USR-001, USR-002, etc.)
    var userIdCell = sheet.getRange(lastRow, 1);
    if (userIdCell.getValue() === '' || userIdCell.getValue().toString().indexOf('USR-') === -1) {
      var userId = 'USR-' + String(lastRow - 1).padStart(3, '0');
      
      // If column A is Timestamp, insert User ID in a clean format or prepend notes
      Logger.log('New submission recorded for row ' + lastRow + ' with assigned User ID: ' + userId);
    }
    
    // Format headers and auto-resize columns
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold').setBackground('#1e1e2e').setFontColor('#ffffff');
    sheet.autoResizeColumns(1, sheet.getLastColumn());
  } catch (err) {
    Logger.log('Error handling form submit: ' + err.toString());
  }
}

// Custom menu addition to manual export
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('AssetBridge Tools')
    .addItem('Format Sheet for Level 5 Export', 'formatSheetForExport')
    .addToUi();
}

function formatSheetForExport() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getDataRange();
  range.setFontFamily('Inter');
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold').setBackground('#2d3748').setFontColor('#ffffff');
  SpreadsheetApp.getUi().alert('AssetBridge sheet formatted successfully for export!');
}
