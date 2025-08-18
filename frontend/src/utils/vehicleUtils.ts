// vehicleUtils.ts
// Utilidades para la gestión automática de vehículos

import { Vehicle } from "../data/vehicles";

/**
 * Genera un nombre de carpeta consistente para las imágenes de un vehículo
 */
export const generateVehicleFolderName = (brand: string, model: string): string => {
  return `${brand}${model}`
    .replace(/\s+/g, '')  // Remover espacios
    .replace(/[^a-zA-Z0-9]/g, '') // Remover caracteres especiales
    .toLowerCase();
};

/**
 * Genera un ID único para un nuevo vehículo
 */
export const generateVehicleId = (existingVehicles: Vehicle[]): number => {
  const maxId = Math.max(...existingVehicles.map(v => v.id), 0);
  return maxId + 1;
};

/**
 * Valida los datos de un vehículo antes de guardarlo
 */
export const validateVehicle = (vehicle: Partial<Vehicle>): string[] => {
  const errors: string[] = [];

  if (!vehicle.brand?.trim()) {
    errors.push("La marca es obligatoria");
  }

  if (!vehicle.model?.trim()) {
    errors.push("El modelo es obligatorio");
  }

  if (!vehicle.year || vehicle.year < 1990 || vehicle.year > 2030) {
    errors.push("El año debe estar entre 1990 y 2030");
  }

  if (!vehicle.fuel?.trim()) {
    errors.push("El tipo de combustible es obligatorio");
  }

  if (!vehicle.condition) {
    errors.push("La condición (nuevo/usado) es obligatoria");
  }

  if (vehicle.condition === 'used' && (!vehicle.mileage || vehicle.mileage < 0)) {
    errors.push("El kilometraje es obligatorio para vehículos usados");
  }

  if (vehicle.images && vehicle.images.length === 0) {
    errors.push("Se requiere al menos una imagen");
  }

  return errors;
};

/**
 * Formatea el precio en USD
 */
export const formatPrice = (price?: number): string => {
  if (!price) return "Consultar";
  return `USD $${price.toLocaleString()}`;
};

/**
 * Formatea el kilometraje
 */
export const formatMileage = (mileage?: number): string => {
  if (!mileage) return "0 km";
  return `${mileage.toLocaleString()} km`;
};

/**
 * Genera las rutas de imágenes basadas en el patrón de la aplicación
 */
export const generateImagePaths = (
  brand: string, 
  model: string, 
  imageCount: number
): string[] => {
  const folderName = generateVehicleFolderName(brand, model);
  const paths: string[] = [];
  
  for (let i = 1; i <= imageCount; i++) {
    paths.push(`/${folderName}/image_${i}.jpg`);
  }
  
  return paths;
};

/**
 * Genera el código TypeScript para agregar al archivo vehicles.ts
 */
export const generateVehicleCode = (vehicle: Vehicle): string => {
  const optionalFields = [];
  
  if (vehicle.mileage) optionalFields.push(`    mileage: ${vehicle.mileage},`);
  if (vehicle.priceUsd) optionalFields.push(`    priceUsd: ${vehicle.priceUsd},`);
  if (vehicle.transmission) optionalFields.push(`    transmission: "${vehicle.transmission}",`);
  if (vehicle.drivetrain) optionalFields.push(`    drivetrain: "${vehicle.drivetrain}",`);
  if (vehicle.bodyType) optionalFields.push(`    bodyType: "${vehicle.bodyType}",`);
  if (vehicle.engine) optionalFields.push(`    engine: "${vehicle.engine}",`);
  if (vehicle.powerHp) optionalFields.push(`    powerHp: ${vehicle.powerHp},`);
  if (vehicle.torqueNm) optionalFields.push(`    torqueNm: ${vehicle.torqueNm},`);
  if (vehicle.doors) optionalFields.push(`    doors: ${vehicle.doors},`);
  if (vehicle.color) optionalFields.push(`    color: "${vehicle.color}",`);

  return `  // ${vehicle.brand} ${vehicle.model}
  {
    id: ${vehicle.id},
    brand: "${vehicle.brand}",
    model: "${vehicle.model}",
    year: ${vehicle.year},
    images: [${vehicle.images.map(img => `"${img}"`).join(', ')}],
    condition: "${vehicle.condition}",
    fuel: "${vehicle.fuel}",${optionalFields.length > 0 ? '\n' + optionalFields.join('\n') : ''}
  },`;
};

/**
 * Genera instrucciones paso a paso para agregar el vehículo
 */
export const generateInstructions = (vehicle: Vehicle): string[] => {
  const folderName = generateVehicleFolderName(vehicle.brand, vehicle.model);
  
  return [
    `1. Crear la carpeta 'frontend/public/${folderName}/'`,
    `2. Subir ${vehicle.images.length} imagen(es) a esa carpeta`,
    `3. Renombrar las imágenes según las rutas generadas`,
    `4. Copiar el código generado`,
    `5. Abrir 'frontend/src/data/vehicles.ts'`,
    `6. Pegar el código antes del último '];'`,
    `7. Guardar el archivo`,
    `8. El vehículo aparecerá automáticamente en la web`
  ];
};

/**
 * Crea las instrucciones para la terminal/comando
 */
export const generateTerminalCommands = (vehicle: Vehicle): string[] => {
  const folderName = generateVehicleFolderName(vehicle.brand, vehicle.model);
  
  return [
    `# Crear carpeta de imágenes`,
    `mkdir "frontend/public/${folderName}"`,
    ``,
    `# Copiar imágenes a la carpeta (reemplaza 'ruta/a/tus/imagenes' con la ruta real)`,
    `# cp ruta/a/tus/imagenes/* "frontend/public/${folderName}/"`,
    ``,
    `# El código TypeScript se genera automáticamente arriba ⬆️`
  ];
};

/**
 * Obtiene vehículos guardados en localStorage
 */
export const getSavedVehicles = (): Vehicle[] => {
  try {
    return JSON.parse(localStorage.getItem('newVehicles') || '[]');
  } catch {
    return [];
  }
};

/**
 * Guarda un vehículo en localStorage
 */
export const saveVehicle = (vehicle: Vehicle): void => {
  const savedVehicles = getSavedVehicles();
  savedVehicles.push(vehicle);
  localStorage.setItem('newVehicles', JSON.stringify(savedVehicles));
};

/**
 * Elimina un vehículo de localStorage
 */
export const deleteVehicle = (vehicleId: number): void => {
  const savedVehicles = getSavedVehicles();
  const filtered = savedVehicles.filter(v => v.id !== vehicleId);
  localStorage.setItem('newVehicles', JSON.stringify(filtered));
};
