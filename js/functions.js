let backend_url = "http://localhost:5000"
let organism_groups = ['archaea', 'bacteria', 'fungi', 'plant', 'protozoa', 'vertebrate_mammalian', 'vertebrate_other', 'invertebrate', 'viral']
let domains = ['Archaea' , "Bacteria", "Virus", "Eukaryota"]
let ncbi_domain_references = {
    "Archaea" : "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=2157" ,
    "Bacteria" : "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=2" ,
    "Virus" : "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=10239" ,
    "Eukaryota" : "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=2759" ,

}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

function denistyToMegabasePairs(density){
    return (density * 1000000).toFixed(3);
}

function formatChromosomeForHtml(chromosome) {
    return chromosome.replace(".", "_");
}

function divideToPercent(x,y){
    return ((x/y)*100).toFixed(2);
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
