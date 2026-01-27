
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2023-05-03',
});

const images = [
  'public/assets/images/global_city_masterplan.jpg',
  'public/assets/images/global_city_soho.jpg',
  'public/assets/images/global_city_fountain.jpg',
  'public/assets/images/global_city_park.jpg',
];

async function uploadImages() {
  for (const imgPath of images) {
    try {
      const fileName = path.basename(imgPath);
      const asset = await client.assets.upload('image', fs.createReadStream(imgPath), {
          filename: fileName
      });
      console.log(`FILE: ${fileName} | ID: ${asset._id}`);
    } catch (err) {
      console.error(`Error uploading ${imgPath}:`, err.message);
    }
  }
}

uploadImages();
