const { writeFile } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';

// we have access to our environment variables in the process.env
const stackConfig = {
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  branch: process.env.CONTENTSTACK_BRANCH || 'main',
  region: process.env.CONTENTSTACK_REGION || 'us',
};
const environmentFileContent = `
export const environment = {
  production: true
};

export const Config = {
  api_key: '${process.env.CONTENTSTACK_API_KEY}',
  delivery_token: '${process.env.CONTENTSTACK_DELIVERY_TOKEN}',
  environment: '${process.env.CONTENTSTACK_ENVIRONMENT}',
  branch: '${process.env.CONTENTSTACK_BRANCH || 'main'}',
  region: '${process.env.CONTENTSTACK_REGION || 'us'}',
  preview_token:'${process.env.CONTENTSTACK_PREVIEW_TOKEN}',
  preview_host:'${process.env.CONTENTSTACK_PREVIEW_HOST}',
  api_host:'${process.env.CONTENTSTACK_API_HOST}',
  app_host:'${process.env.CONTENTSTACK_APP_HOST}',
  live_preview:${process.env.CONTENTSTACK_LIVE_PREVIEW || true}
};`;

// write the content to the respective file if env exists
if (
  process.env.CONTENTSTACK_API_KEY &&
  process.env.CONTENTSTACK_DELIVERY_TOKEN &&
  process.env.CONTENTSTACK_ENVIRONMENT
)
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
  });
