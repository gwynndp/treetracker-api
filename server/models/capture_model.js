const { knex: db } = require('../infra/database/knex');
const { v4: uuidv4 } = require('uuid');
const treetracker = process.env.DATABASE_SCHEMA
  ? `${process.env.DATABASE_SCHEMA}.capture`
  : 'capture';

// DATABASE QUERIES

async function read() {
  return db.from(`${treetracker}`).select('*');
  //the .then() will run and print out the successful data
  // .then((data) => {
  //   console.log('read data', data);
  //   return data;
  // });
  //better NOT to have the catch block here because it prevents the error from being passed to the service where we can send it in the response
}

async function create(newCapture) {
  console.log('CREATE');
  return db.insert(newCapture).into(`${treetracker}`).returning('*');
}

async function readById(capture_id) {
  return db.from(`${treetracker}`).select('*').where('id', capture_id);
}

module.exports = {
  read,
  create,
  readById,
};
