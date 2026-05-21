import { createClient } from '@sanity/client';


const client = createClient({
  projectId: 'fq2dvp1o',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sks8QK5obFtjZP8WEq7VMfUXFG0hXYZLPZecPNIK3lWbCT0MahhEGoZuWZ588FPtCab3SoFAgf8pyarKacT9w3Kh8iHi5tTtHUGXGWGhk3OXTRo2OoQ8gUQrLEfYeCxoa6dchicXvG63xbPa1fpoa8bi4BINgQGpbhKQgGz6WaM7lhA7QHip'
});

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function fixVehicles() {
  const vehicles = await client.fetch('*[_type == "vehicle"]');
  console.log(`Found ${vehicles.length} vehicles to patch`);

  for (const v of vehicles) {
    const patches = {};
    let needsPatch = false;

    // 1. Check if it needs a slug
    if (!v.slug || !v.slug.current) {
      const slugCurrent = slugify(`${v.brand}-${v.model}-${Math.floor(Math.random()*1000)}`);
      patches.slug = { _type: 'slug', current: slugCurrent };
      needsPatch = true;
    }

    // 2. Check if images need _key
    if (v.images && v.images.length > 0) {
      const fixedImages = v.images.map(img => {
        if (!img._key) {
          return { ...img, _key: Math.random().toString(36).substring(2, 12) };
        }
        return img;
      });
      // if any image didn't have _key
      if (v.images.some(img => !img._key)) {
        patches.images = fixedImages;
        needsPatch = true;
      }
    }

    if (needsPatch) {
      try {
        await client.patch(v._id).set(patches).commit();
        console.log(`✅ Patched vehicle ${v._id} (${v.brand} ${v.model})`);
      } catch (err) {
        console.error(`❌ Failed to patch vehicle ${v._id}: ${err.message}`);
      }
    } else {
      console.log(`⏭️ No patch needed for ${v._id}`);
    }
  }
}

fixVehicles();
