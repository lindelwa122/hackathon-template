/*
Install dependences:
npm install @faker-js/faker node-fetch

This is the output that would be shown:

{
  "name": "Lwazi Dlamini",
  "dob": "1998-02-05",
  "age": 26,
  "gender": "Male",
  "location": "Durban",
  "job": "Web Developer",
  "employer": "Old Mutual",
  "email": "lwazid@example.com",
  "id_number": "9802055432084"
}

//Example usage 
generateUserSchemaCompatible('9802055432084').then(console.log);

*/


// api/utils/ai_database.js

const faker = require('@faker-js/faker').faker;
const fetch = require('node-fetch');

// Helper: Parse South African ID
function parseSouthAfricanID(idNumber) {
  try {
    const yy = parseInt(idNumber.slice(0, 2));
    const mm = parseInt(idNumber.slice(2, 4));
    const dd = parseInt(idNumber.slice(4, 6));
    const ssss = parseInt(idNumber.slice(6, 10));

    const year = yy > 25 ? 1900 + yy : 2000 + yy;
    const dob = new Date(year, mm - 1, dd);
    const gender = ssss >= 5000 ? 'Male' : 'Female';

    return { dob, gender };
  } catch {
    return { dob: null, gender: null };
  }
}

// Generate user data for testing or seeding
async function generateUserSchemaCompatible(idNumber) {
  const fullName = faker.person.fullName({ sex: 'male' });

  const [firstName, lastName] = fullName.split(' ');
  const username = faker.internet.userName({ firstName, lastName }).toLowerCase();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const password = faker.internet.password({ length: 10, memorable: false });

  const carModels = [
    'Toyota Corolla', 'VW Polo', 'Hyundai i20', 'Ford Fiesta',
    'BMW 1 Series', 'Audi A3', 'Mercedes-Benz A-Class',
    'Kia Picanto', 'Nissan Micra', 'Honda Jazz'
  ];

  const numberPlate = `ND ${faker.number.int({ min: 100, max: 999 })} ${faker.number.int({ min: 100, max: 999 })} GP`;
  const releaseYear = '2015-01-01';

  return {
    firstName,
    lastName,
    username,
    email,
    password,
    id: "0123456789123",
    car: {
      model: faker.helpers.arrayElement(carModels),
      numberPlate,
      releaseDate: releaseYear,
    }
  };
}

module.exports = generateUserSchemaCompatible;



