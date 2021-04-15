const express = require('express');
const captureRouter = express.Router();
const helper = require('./utils');
const {
  validateData,
  getCaptures,
  postCapture,
  getCaptureById,
} = require('../services/capture_service');

captureRouter
  .route('/')
  .get(helper.handlerWrapper(getCaptures))
  .post(validateData, helper.handlerWrapper(postCapture));

// captureRouter
//   .route('/:capture/potential_trees')
//   .get(helper.handlerWrapper(getMockPotentialTrees));

captureRouter
  .route('/:capture_id')
  .get(helper.handlerWrapper(getCaptureById))
  .patch(
    helper.handlerWrapper(async (req, res) => {
      res.status(200);
    }),
  )
  .delete(
    helper.handlerWrapper(async (req, res) => {
      res.status(204);
    }),
  );

module.exports = captureRouter;
