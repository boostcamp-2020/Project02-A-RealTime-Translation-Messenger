import { Request, Response } from 'express';
import request from 'request';
import dotenv from 'dotenv';

import StatusCode from '../@types/statusCode';

dotenv.config();

const { NCP_BASE_URL, X_NCP_APIGW_API_KEY_ID, X_NCP_APIGW_API_KEY } = process.env;

const detection = async (req: Request, res: Response) => {
  const query = req.body.query;
  const options = {
    url: `${NCP_BASE_URL!}/langs/v1/dect`,
    form: { query: query },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': X_NCP_APIGW_API_KEY_ID,
      'X-NCP-APIGW-API-KEY': X_NCP_APIGW_API_KEY,
    },
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode === StatusCode.OK) {
      res.status(StatusCode.OK).json(JSON.parse(body));
    } else {
      res.status(response.statusCode).json(error);
    }
  });
};

const translation = async (req: Request, res: Response) => {
  const options = {
    url: `${NCP_BASE_URL!}/nmt/v1/translation`,
    form: req.body,
    headers: {
      'X-NCP-APIGW-API-KEY-ID': X_NCP_APIGW_API_KEY_ID,
      'X-NCP-APIGW-API-KEY': X_NCP_APIGW_API_KEY,
    },
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode === StatusCode.OK) {
      res.status(StatusCode.OK).json(JSON.parse(body).message.result);
    } else {
      res.status(response.statusCode).json(error);
    }
  });
};

const papagoController = {
  detection,
  translation,
};

export default papagoController;
