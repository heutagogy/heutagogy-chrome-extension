const fs = require('fs'); //eslint-disable-line
const AdmZip = require('adm-zip'); //eslint-disable-line
const chromeWebstoreUpload = require('chrome-webstore-upload'); //eslint-disable-line

console.log('Creating zip archive...');
const zip = new AdmZip();

zip.addLocalFolder('./build', 'heutagogy');
zip.writeZip('heutagogy.zip');

const webStore = chromeWebstoreUpload({
  extensionId: process.env.WEBSTORE_EXTENSION_ID,
  clientId: process.env.WEBSTORE_CLIENT_ID,
  clientSecret: process.env.WEBSTORE_CLIENT_SECRET,
  refreshToken: process.env.WEBSTORE_REFRESH_TOKEN,
});

console.log('Fetching token...');
webStore.fetchToken().then((token) => {
  const zipFile = fs.createReadStream('./heutagogy.zip');

  console.log('Uploading...');
  webStore.uploadExisting(zipFile, token).then((res) => {
    console.log(res);

    if (res.uploadState === 'SUCCESS') {
      console.log('Publishing...');
      webStore.publish().then((publishResult) => {
        console.log(publishResult);
      });
    }
  });
});
