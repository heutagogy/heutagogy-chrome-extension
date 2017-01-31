const fs = require('fs');
var AdmZip = require('adm-zip');

console.log("Creating zip archive...");
var zip = new AdmZip();
zip.addLocalFolder('./build', 'heutagogy');
zip.writeZip('heutagogy.zip');

const webStore = require('chrome-webstore-upload')({
  extensionId: process.env.WEBSTORE_EXTENSION_ID,
  clientId: process.env.WEBSTORE_CLIENT_ID,
  clientSecret: process.env.WEBSTORE_CLIENT_SECRET,
  refreshToken: process.env.WEBSTORE_REFRESH_TOKEN
});

console.log("Fetching token...");
webStore.fetchToken().then(token => {
  const zipFile = fs.createReadStream('./heutagogy.zip');
  console.log("Uploading...");
  webStore.uploadExisting(zipFile, token).then(res => {
    console.log(res);

    if (res.uploadState === 'SUCCESS') {
      console.log("Publishing...");
      webStore.publish().then(res => {
        console.log(res);
      });
    }
  });
});
