const knex = require('../server/infra/database/knex');

function parsePoint(json) {
  const jsonCopy = { ...json };
  Object.keys(jsonCopy).forEach((key) => {
    if (jsonCopy[key].match && jsonCopy[key].match(/^POINT\(.*\)$/)) {
      jsonCopy[key] = knex.raw(`ST_PointFromText('${jsonCopy[key]}', 4326)`);
    }
  });
  return jsonCopy;
}

module.exports = {
  async addTree(json) {
    return knex('tree').insert(parsePoint(json)).returning('*');
  },
  async addCapture(json) {
    return knex('capture').insert(parsePoint(json)).returning('*');
  },
  async delTree(id) {
    await knex('tree').where('id', id).del();
  },
  async delCapture(id) {
    await knex('capture').where('id', id).del();
  },
  knex,
};
