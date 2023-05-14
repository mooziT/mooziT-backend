const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const s3 = new AWS.S3();
  
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  
  // Send the key to the client
  const response = {
    statusCode: 200,
    body: key
  };
  
  callback(null, response);
};