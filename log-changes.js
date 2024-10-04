const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'file-change-log.txt');
const scriptFilePath = path.join(__dirname, 'log-changes.js');

// Get the current date and time
const getDate = () => {
  return new Date().toISOString();
};

// Capture the event type and changed file path
const fileEvent = process.argv[2]; // e.g., "change", "add", "unlink"
const changedFilePath = process.argv[3]; // Path of the file

// Prevent logging changes to `log-changes.js` and the log file itself
if (!changedFilePath.endsWith('log-changes.js') && !changedFilePath.endsWith('file-change-log.txt')) {
  // Log the event with date, event type, and file path
  fs.appendFileSync(
    logFilePath,
    `[${getDate()}] Event: ${fileEvent}, File: ${changedFilePath}\n`,
    'utf8'
  );

  console.log(`[${getDate()}] Event: ${fileEvent}, File: ${changedFilePath} was logged.`);
}
