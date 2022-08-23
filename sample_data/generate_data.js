
var fs = require('fs');

let total_customers = 50
let jsonFile = "./sample_data/customers.json"


dates = [
    1661160770155,
    1661060770155,
    1660160770155,
    1660060770155,
    1651160770155,
    1651060770155,
    1650160770155,
    1650060770155,
    1641160770155,
    1641060770155,
    1640160770155,
    1640060770155,
    1631160770155,
    1631060770155,
    1630160770155,
    1630060770155,
    1621160770155,
    1621060770155,
    1620160770155,
    1620060770155,
    1611160770155,
    1611060770155,
    1610160770155,
    1610060770155,
    1601160770155,
    1601060770155,
    1600160770155,
    1600060770155
]

names = [
"Karl Urban",
"Cliff Curtis",
"Russell Crowe",
"Jemaine Clement",
"Martin Henderson",
"Lucy Lawless",
"Melanie Lynskey",
"Anna Hutchison",
"Emma Lahana",
"Pamela Stephenson"
]

numbers = [
"0228636065",
"0208182856",
"0284523291",
"0276330688",
"0890460889"
]

addreses = [
    "70 Clemett Place,Pines Beach, Kaiapoi, 7630, New Zealand.",
    "108 Dallow Place, Sunnyvale, Waitakere, 0612, New Zealand.",
    "116 Scanlan Street, Waterloo, Lower Hutt, 5011, New Zealand.",
    "204 Brougham Street, The Wood, Nelson, 7010, New Zealand.",
    "158 Keppel Street New, Bottle Lake, Christchurch, 8083, New Zealand.",
]

statuses = [
    "ACTIVE",
    "NON_ACTIVE",
    "LEAD"
]

function getID(i){
  num_length = total_customers.toString().length
  id_num = i.toString()
  while (id_num.length < num_length) {
    id_num = "0" + id_num
  }
  return "c"+id_num
  // ID should be Hexadecimal
}

function getEmail(i, name){
 return name.toLowerCase().replace(" ", ".") + i + "@gmail.com";
}

var customers = []

for (let i = 0; i <= total_customers; i++) {
    customer = {"__v": 0}
    customer['_id'] = {"$oid": getID(i)}
    customer['status'] = statuses[i % statuses.length]
    customer['name'] = names[i % names.length]
    customer['address'] = addreses[i % addreses.length]
    customer['mobile_number'] = numbers[i % numbers.length]
    customer['creation_date'] = { "$numberLong": dates[i % dates.length].toString() }
    customer['email'] = getEmail(i, customer['name'])

    customers.push(customer)
}
customers = JSON.stringify(customers)

fs.writeFile(jsonFile, customers, function(err) {
  if (err) {
      console.log(err);
  }
  console.log("Data written to " + jsonFile)
  console.log("Done ")

});
