import express from 'express';
import AWS = require('aws-sdk');
import dotenv from 'dotenv';

dotenv.config();

// import roomController from '../controllers/roomController';

const router = express.Router();

router.get('/', async (req, res) => {
  const { IMAGE_ENDPOINT, IMAGE_ACCESS_KEY, IMAGE_SECRET_KEY } = process.env;

  const region = 'kr-standard';
  const accessKey = IMAGE_ACCESS_KEY!;
  const secretKey = IMAGE_SECRET_KEY!;

  const S3 = new AWS.S3({
    endpoint: IMAGE_ENDPOINT!,
    region: region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  const params = {
    Bucket: 'pupago',
    Prefix: 'profiles/',
  };

  const objectResponse = await S3.listObjectsV2(params).promise();
  const imageContents = objectResponse.Contents;
  if (imageContents === undefined) {
    return;
  }
  const imageLinks = imageContents
    ?.map((element: AWS.S3.Object) => `${IMAGE_ENDPOINT!}/pupago/${element.Key}`)
    .slice(1);
  const imageLink = imageLinks[Math.floor(Math.random() * 14)];

  res.json(imageLink);
});

export default router;
