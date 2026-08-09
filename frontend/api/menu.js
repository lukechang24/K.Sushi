import { google } from "googleapis";

export default async function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Load credentials from environment variable
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1JLl_FF37f-jgml5r3URjhHFePvDbPm4lAedjiXDux5E";

    // Step 1: Get all sheet names
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetsList = spreadsheet.data.sheets;
    const ranges = sheetsList.map(sheet => sheet.properties.title);

    // Step 2: Batch get all sheets' data
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    });

    // Step 3: Map each sheet into objects
    const data = response.data.valueRanges.map((valueRange, i) => ({
      sheetName: ranges[i],
      values: valueRange.values || [],
    }));

    const allSheetsData = {};

    for (const sheetInfo of data) {
      const sheetTitle = sheetInfo.sheetName;
      const values = sheetInfo.values;
      if (!values || values.length === 0) {
        allSheetsData[sheetTitle] = [];
        continue;
      }

      const headers = values[0];
      const rows = values.slice(1);
      const mappedRows = rows.map(row => {
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || "";
        });
        return obj;
      });

      allSheetsData[sheetTitle] = mappedRows;
    }

    res.status(200).json(allSheetsData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error reading data from Google Sheets." });
  }
}
