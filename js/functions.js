// Prod vs Dev check
const backend_url = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
  ? 'http://localhost:5000'  // Dev
  : 'https://www.microsatellitesexplorer.com/hairpin_api';  // Prod

let organism_groups = ['archaea', 'bacteria', 'fungi', 'plant', 'protozoa', 'vertebrate_mammalian', 'vertebrate_other', 'invertebrate', 'viral']
let domains = ['Archaea', "Bacteria", "Virus", "Eukaryota"]
let ncbi_domain_references = {
  "Archaea": "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=2157",
  "Bacteria": "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=2",
  "Virus": "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=10239",
  "Eukaryota": "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=2759",

}
function capitalizeFirstLetter(string) {
  return string
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and lowercase the rest
    .join(' '); // Join the words back into a single string
}

function getCurrentTimestamp() {
  var now = new Date();
  var year = now.getFullYear();
  var month = ('0' + (now.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1
  var day = ('0' + now.getDate()).slice(-2);
  var hours = ('0' + now.getHours()).slice(-2);
  var minutes = ('0' + now.getMinutes()).slice(-2);
  var seconds = ('0' + now.getSeconds()).slice(-2);
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function denistyToMegabasePairs(density) {
  return (density * 1000000).toFixed(3);
}

function formatChromosomeForHtml(chromosome) {
  return chromosome.replace(".", "_");
}

function divideToPercent(x, y) {
  return ((x / y) * 100).toFixed(2);
}

function prettifyGroupName(group_name) {
  return capitalizeFirstLetter(group_name.split('_').join(' '));
}

function sortDataByFirstIndex(data) {
  Object.keys(data).forEach(key => {
    data[key].sort((a, b) => a[0] - b[0]);
  });
  return data;
}

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function processOrganismalData(data, idx) {
  let processed = [];
  // Step 1: Initial processing (round floats, leave integers and strings untouched)
  for (const d of data) {
    let row = [...d];

    for (let i = 0; i < row.length; i++) {
      const value = row[i];

      // Check if the value is numeric and not null or empty
      if (!isNaN(value) && value !== null && value !== '') {
        if (Number.isInteger(parseFloat(value))) {
          // Leave integers as-is for now
          row[i] = value;
        } else {

          // If is density measure
          if ([30, 31, 32, 33, 34, 35, 36].includes(i)) {
            row[i] = denistyToMegabasePairs(value)
          }
          else {
            row[i] = parseFloat(value).toFixed(2);
          }

        }
      }


      if (i == idx["organism_name"]) {
        let button = `<button class='btn btn-outline-primary gotoviz-btn' onclick="goToOrganism('${btoa(value)}')"><em>${value}</em></button>`;
        row[i] = button
      }
    }

    processed.push(row);
  }

  // Step 2: Format numbers with commas
  for (let row of processed) {
    for (let i = 0; i < row.length; i++) {
      const value = row[i];

      // Check if the value is numeric and not null or empty
      if (!isNaN(value) && value !== null && value !== '') {
        row[i] = parseFloat(value).toLocaleString('en-US', {
          minimumFractionDigits: value.toString().includes('.') ? 2 : 0,
          maximumFractionDigits: 2
        });
      }
    }
  }
  return processed;
}


function createGetDataIndexByName(headers, idx) {
  if (idx == "data") {
    data_index_by_name = {}
    headers.forEach(function (value, i) {
      data_index_by_name[value] = i
    });
  } else {
    metadata_index_by_name = {}
    headers.forEach(function (value, i) {
      metadata_index_by_name[value] = i
    });
  }
}


function capitalizeFirstLetterOfEachWord(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}


function goToOrganism(organisms_name) {
  for (let row of organism_data_all) {

    if (row[0] == atob(organisms_name)) {
      localStorage.setItem('organism_row_data', JSON.stringify({
        "organism_row": row,
        "idx": data_index_by_name
      }));
    }
  }
  location.href = `/organism_analysis.html`;
}