const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

// Load your service account credentials
const KEYFILEPATH = "./credentials.json";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

const spreadsheetId = "1JLl_FF37f-jgml5r3URjhHFePvDbPm4lAedjiXDux5E"; // paste your Google Sheet ID here

async function fetchAllSheetsData() {
  // Step 1: Get all sheet names
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetsList = spreadsheet.data.sheets;
  const ranges = sheetsList.map(sheet => sheet.properties.title);

  // Step 2: Batch get all sheets' data
  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
  });

  // Step 3: Return or process the data
  const data = response.data.valueRanges.map((valueRange, i) => ({
    sheetName: ranges[i],
    values: valueRange.values || [],
  }));

	const allSheetsData = {};

	for (const sheetInfo of data) {
		const sheetTitle = sheetInfo.sheetName;
		const values = sheetInfo.values
		if (!values || values.length === 0) {
      allSheetsData[sheetTitle] = [];
      continue;
    }

    // Map to array of objects using the first row as headers
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
	return allSheetsData
}

app.get("/menu", async (req, res) => {
  try {
		const data = await fetchAllSheetsData()
    if (!data || data.length === 0) {
      return res.status(404).send("No data found.");
    }
    // Optionally, parse rows into JSON here for easier frontend consumption
		
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading data from Google Sheets.");
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
