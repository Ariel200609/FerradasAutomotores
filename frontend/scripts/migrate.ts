import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { vehicles } from '../src/data/vehicles';
import { fileURLToPath } from 'url';

// Because this is a module or might be run via vite-node, we define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
  projectId: 'fq2dvp1o',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sks8QK5obFtjZP8WEq7VMfUXFG0hXYZLPZecPNIK3lWbCT0MahhEGoZuWZ588FPtCab3SoFAgf8pyarKacT9w3Kh8iHi5tTtHUGXGWGhk3OXTRo2OoQ8gUQrLEfYeCxoa6dchicXvG63xbPa1fpoa8bi4BINgQGpbhKQgGz6WaM7lhA7QHip'
});

async function migrate() {
  console.log(`Comenzando migración de ${vehicles.length} vehículos a Sanity...`);

  for (const vehicle of vehicles) {
    try {
      console.log(`Procesando: ${vehicle.brand} ${vehicle.model} (${vehicle.year})`);

      // Determinar la carpeta base de la imagen
      let imagePaths = [];
      if (vehicle.images && vehicle.images.length > 0) {
        const firstImagePath = vehicle.images[0]; // ej: /Raptor/raptor(1).jpg o /AmarokV6.jpg
        const dirName = path.dirname(firstImagePath); // ej: /Raptor o /
        
        const publicDir = path.join(__dirname, '..', 'public');
        
        if (dirName === '/' || dirName === '\\') {
          // Está en la raíz de public, solo subimos esa imagen
          imagePaths.push(path.join(publicDir, firstImagePath));
        } else {
          // Es un directorio, subimos todas las imágenes de ese directorio
          const fullDirPath = path.join(publicDir, dirName);
          if (fs.existsSync(fullDirPath)) {
            const files = fs.readdirSync(fullDirPath);
            const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
            // Ordenar para que la principal quede primero si es posible
            imageFiles.sort();
            for (const file of imageFiles) {
              imagePaths.push(path.join(fullDirPath, file));
            }
          } else {
            // Si no existe la carpeta, por las dudas metemos solo la ruta de la primera
            imagePaths.push(path.join(publicDir, firstImagePath));
          }
        }
      }

      console.log(`  - Subiendo ${imagePaths.length} imágenes...`);
      const uploadedImages = [];

      for (const imgPath of imagePaths) {
        if (fs.existsSync(imgPath)) {
          const stream = fs.createReadStream(imgPath);
          // Upload asset
          const asset = await client.assets.upload('image', stream, {
            filename: path.basename(imgPath)
          });
          uploadedImages.push({
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id }
          });
          console.log(`    Subida: ${path.basename(imgPath)}`);
        } else {
          console.log(`    Imagen no encontrada localmente: ${imgPath}`);
        }
      }

      // Crear el documento de Sanity
      const sanityDoc = {
        _type: 'vehicle',
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        condition: vehicle.condition,
        fuel: vehicle.fuel,
        mileage: vehicle.mileage || 0,
        priceUsd: vehicle.priceUsd,
        engine: vehicle.engine,
        transmission: vehicle.transmission,
        drivetrain: vehicle.drivetrain,
        powerHp: vehicle.powerHp,
        torqueNm: vehicle.torqueNm,
        doors: vehicle.doors,
        color: vehicle.color,
        bodyType: vehicle.bodyType,
        images: uploadedImages.length > 0 ? uploadedImages : undefined
      };

      const result = await client.create(sanityDoc);
      console.log(`  ✅ Migrado correctamente: ${result._id}`);

    } catch (error: any) {
      console.error(`  ❌ Error al migrar ${vehicle.brand} ${vehicle.model}:`, error.message);
    }
  }

  console.log('¡Migración completada!');
}

migrate();
