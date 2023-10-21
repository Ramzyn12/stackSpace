// Import required modules
const fs = require('fs');

// Define the base URL and headers
const baseUrl = 'https://zillow-base1.p.rapidapi.com/WebAPIs/zillow/search?location=Brownsville%2C%20TX&page=';
const headers = {
  'X-RapidAPI-Key': '9d5f48c667mshcf0881338a109cdp154bdfjsne5c82dfd8e57',
  'X-RapidAPI-Host': 'zillow-base1.p.rapidapi.com'
};

// Define async function to fetch data
async function fetchData() {
  let allData = [];  // Array to hold all data across pages
  
  for (let i = 1; i <= 10; i++) {  // Loop to fetch pages 1 to 10
    const url = baseUrl + i;  // Construct URL for current page
    
    try {
      const response = await fetch(url, { method: 'GET', headers: headers });
      const data = await response.json();  // Assume the API returns JSON
      allData = allData.concat(data);  // Append data from current page to allData array
      
      console.log(`Fetched page ${i}`);
      
      if (i < 10) {  // No need to wait after fetching the last page
        await new Promise(resolve => setTimeout(resolve, 3000));  // Wait for 3 seconds
      }
      
    } catch (error) {
      console.error(`Error fetching page ${i}:`, error);
    }
  }
  
  // Write all fetched data to data.json
  fs.writeFileSync('data.json', JSON.stringify(allData, null, 2));
  console.log('Data saved to data.json');
}

// Execute fetchData function
fetchData();
