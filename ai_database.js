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
generatePersonFromID('9802055432084').then(console.log);

*/


import { faker } from '@faker-js/faker';
import fetch from 'node-fetch';

// Parse South African ID to get DOB, gender, and age
function parseSouthAfricanID(idNumber) {
  try {
    const yy = parseInt(idNumber.substring(0, 2));
    const mm = parseInt(idNumber.substring(2, 4));
    const dd = parseInt(idNumber.substring(4, 6));
    const ssss = parseInt(idNumber.substring(6, 10));

    const year = yy > 25 ? 1900 + yy : 2000 + yy;
    const dob = new Date(year, mm - 1, dd);
    const gender = ssss >= 5000 ? 'Male' : 'Female';
    const age = new Date().getFullYear() - year;

    return { dob: dob.toISOString().split('T')[0], gender, age };
  } catch (error) {
    return { dob: null, gender: null, age: null };
  }
}

// Call Hugging Face model (FLAN-T5 via Hugging Face Inference API)
async function callLLM(prompt) {
  const HF_API_TOKEN = 'your-huggingface-token'; // 🔒 replace with your real token
  const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-small', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const result = await response.json();
  return result[0]?.generated_text || '';
}

// Main generator
export async function generatePersonFromID(idNumber) {
  const { dob, gender, age } = parseSouthAfricanID(idNumber);

  if (!dob) {
    return { error: 'Invalid ID number format.' };
  }

  const name = gender === 'Male' ? faker.person.fullName({ sex: 'male' }) : faker.person.fullName({ sex: 'female' });
  const city = faker.location.city();
  const job = faker.person.jobTitle();
  const company = faker.company.name();
  const email = faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] });

  const sentence = `My name is ${name}, I was born on ${dob}. I'm ${age} years old, ${gender}, living in ${city}, and I work as a ${job} at ${company}. You can contact me at ${email}.`;

  const prompt = `Extract the following structured personal information from this text and return it as a JSON dictionary: name, dob, age, gender, location, job, employer, email, id_number.\n\n${sentence}`;

  const output = await callLLM(prompt);

  try {
    const json = JSON.parse(output);
    return { ...json, id_number: idNumber };
  } catch {
    return { raw_output: output, id_number: idNumber };
  }
}


