import AWS = require('aws-sdk');
import dotenv from 'dotenv';
import profileImageController from '../controllers/profileImageController';

dotenv.config();

const initializeS3 = async () => {
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

  return S3;
};

const getImageLinks = async (S3: AWS.S3, bucketName: string, folderName: string) => {
  const params = {
    Bucket: bucketName,
    Prefix: `${folderName}/`,
  };

  const objectResponse = await S3.listObjectsV2(params).promise();
  const imageContents = objectResponse.Contents;
  if (imageContents === undefined) {
    throw new Error();
  }
  const imageLinks = imageContents
    .map((element: AWS.S3.Object) => `${process.env.IMAGE_ENDPOINT!}/pupago/${element.Key}`)
    .slice(1);

  return imageLinks;
};

const pickRandomElement = (array: string[]) => {
  return array[Math.floor(Math.random() * (array.length - 1))];
};

const profileImageService = {
  initializeS3,
  getImageLinks,
  pickRandomElement,
};

export default profileImageService;
