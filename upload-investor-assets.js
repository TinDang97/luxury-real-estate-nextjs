require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-24',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const investors = [
  { slug: 'masterise-homes', name: 'Masterise Homes' },
  { slug: 'vinhomes', name: 'Vinhomes' },
  { slug: 'capitaland', name: 'CapitaLand' },
  { slug: 'sun-group', name: 'Sun Group' }
];

const languages = ['en', 'vn', 'ko'];

async function uploadImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(filePath),
    });
    return asset._id;
  } catch (err) {
    console.error(`Error uploading ${filePath}:`, err.message);
    return null;
  }
}

async function startUpload() {
  console.log('Starting investor asset upload and update...');

  for (const investor of investors) {
    console.log(`\nProcessing ${investor.name}...`);

    const logoId = await uploadImage(`public/assets/images/investors/${investor.slug}-logo.png`);
    const coverId = await uploadImage(`public/assets/images/investors/${investor.slug}-cover.png`);
    const missionId = await uploadImage(`public/assets/images/investors/${investor.slug}-mission.png`);

    const updateData = {};
    if (logoId) updateData.logo = { _type: 'image', asset: { _type: 'reference', _ref: logoId } };
    if (coverId) updateData.coverImage = { _type: 'image', asset: { _type: 'reference', _ref: coverId } };
    if (missionId) updateData.missionImage = { _type: 'image', asset: { _type: 'reference', _ref: missionId } };

    if (Object.keys(updateData).length === 0) continue;

    for (const lang of languages) {
      try {
        const query = `*[_type == "investor" && slug.current == $slug && language == $lang][0]`;
        const existing = await client.fetch(query, { slug: investor.slug, lang });

        if (existing) {
          console.log(`Updating ${investor.name} (${lang})...`);
          await client.patch(existing._id).set(updateData).commit();
        } else {
          console.warn(`Investor document not found for ${investor.name} (${lang})`);
        }
      } catch (err) {
        console.error(`Error updating ${investor.name} (${lang}):`, err.message);
      }
    }
  }

  console.log('\nAsset upload and update complete!');
}

startUpload();
