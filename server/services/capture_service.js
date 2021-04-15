const captureModel = require('../models/capture_model');

// STRUCTURE QUERIES

async function getCaptures(req, res, next) {
  captureModel
    .read()
    .then((data) => res.status(200).json({ captures: data }))
    .catch(next);
}

async function postCapture(req, res, next) {
  console.log('POST CAPTURE', req.body);

  // destructure to create variables of incoming data & set defaults
  const {
    id,
    reference_id,
    tree_id,
    image_url = '',
    estimated_geometric_location,
    gps_accuracy,
    lat,
    lon,
    planter_id,
    planter_photo_url = '',
    planter_username,
    planting_organization_id,
    device_identifier,
    species_id,
    domain_specific_data,
    morphology,
    age,
    note = '',
    status = 'approved',
    timestamp,
    //attributes = [],
  } = req.body;

  //create new capture object and set date/time values
  const newCapture = {
    id: id,
    reference_id,
    tree_id,
    image_url,
    estimated_geometric_location,
    gps_accuracy,
    lat,
    lon,
    planter_id,
    planter_photo_url,
    planter_username,
    planting_organization_id,
    device_identifier,
    species_id,
    domain_specific_data,
    morphology,
    age,
    note,
    status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    //attributes,
  };

  captureModel
    .create(newCapture)
    .then((data) => {
      console.log('CREATED DATA');
      res.status(201).send(data);
    })
    .catch(next);
}

async function getCaptureById(req, res, next) {
  const { capture_id } = req.params;
  captureModel
    .readById(capture_id)
    .then((data) => res.status(200).send(data))
    .catch(next);
}

// HELPER FUNCTIONS
function validateData(req, res, next) {
  console.log('VALIDATE DATA');

  const requiredProps = [
    'id',
    'reference_id',
    'image_url',
    'estimated_geometric_location',
    'lat',
    'lon',
    'planter_id',
    'planter_photo_url',
    'planter_username',
  ];
  //TODO: Any other data to require --- tree_id? planting_organization_id? species_id? morphology? age? note? attributes?

  try {
    // validate incoming data is all there
    for (let prop of requiredProps) {
      if (req.body[prop] === undefined) {
        throw new Error({
          message: `Missing required value: ${prop}`,
        });
      }
    }
    //check id and tree_id are type uuid, string
    //check image_url and planter_photo_url are urls
    //check username is a strings
    //check lat,lon are numbers
    //check id is a uuid provided by the client
    //what is reference_id?
    /*
    uuid:
        'id',
        'tree_id',
    string
        'planter_username',
        'device_identifier',
        'morphology',
        'note',
        'status',
    string & url format
        'image_url',
        'planter_photo_url',
    number
        'reference_id',
        'lat',
        'lon',
        'gps_accuracy',
        'planter_id',
        'planting_organization_id',
        'species_id',
        'age',
        'timestamp',   // will be converted to Date ISO format but needs to be submitted as a number
    other ------ (example: "SRID=4326;POINT(2 2)")
        'estimated_geometric_location',
    other ------ (?)
        'domain_specific_data',
    json
        'attributes',
    date
        'created_at',
        'updated_at',

    */
    next();
  } catch (error) {
    res.status(400).send(error);
    //next(err);
  }
}

module.exports = {
  getCaptures,
  postCapture,
  getCaptureById,
  validateData,
  // the below format doesn't work with the handlerWrapper
  // postCapture: [validateData, postCapture],
  // getCaptureById: [validateData, getCaptureById],
};
