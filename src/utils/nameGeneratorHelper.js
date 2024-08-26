const faker = require('@faker-js/faker').fakerTR;
const fakerForeign = require('@faker-js/faker').faker;

const getNameByCountry = (country) => {
    switch (country) {
        case('TR'):
            return faker.person.fullName({sex: 'male'});
        default:
            return fakerForeign.person.fullName({sex: 'male'});
    }
};

console.log('Turkish Random Name:', getNameByCountry('TR'));
console.log('Foreign Random Name:', getNameByCountry('US'));