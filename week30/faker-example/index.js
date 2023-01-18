var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

function makedata() {
console.log("Company Name: ", faker.company.name())
console.log("Company catchphrase: ", faker.company.catchPhrase())
console.log("Avatar Image: ", faker.image.avatar())
}