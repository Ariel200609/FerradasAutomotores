import React, { useState } from "react";
import { Plus, Upload, Save, Eye, AlertCircle, Terminal, Copy, Check } from "lucide-react";
import { Vehicle } from "../data/vehicles";
import { 
  generateVehicleId, 
  validateVehicle, 
  generateVehicleCode, 
  generateInstructions,
  generateTerminalCommands,
  generateVehicleFolderName,
  saveVehicle as saveVehicleUtil,
  getSavedVehicles
} from "../utils/vehicleUtils";

interface NewVehicle extends Omit<Vehicle, 'id'> {
  id?: number;
}

const AdminView: React.FC = () => {
  const [newVehicle, setNewVehicle] = useState<NewVehicle>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    images: [],
    condition: "new",
    fuel: "",
    mileage: 0,
    priceUsd: 0,
    transmission: "",
    drivetrain: "",
    bodyType: "",
    engine: "",
    powerHp: 0,
    torqueNm: 0,
    doors: 4,
    color: "",
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [savedVehicles, setSavedVehicles] = useState<Vehicle[]>(getSavedVehicles());

  const handleInputChange = (field: keyof NewVehicle, value: any) => {
    setNewVehicle(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar errores de validación cuando el usuario edita
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    setIsUploading(true);
    const newImages: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        // Crear nombre de archivo organizado usando la utilidad
        const folderName = generateVehicleFolderName(newVehicle.brand, newVehicle.model);
        const fileName = `image_${uploadedImages.length + i + 1}.jpg`;
        
        // En un entorno real, aquí subirías a un servidor
        // Por ahora, creamos URLs temporales para preview
        const imageUrl = URL.createObjectURL(file);
        newImages.push(`/${folderName}/${fileName}`);
      }
    }
    
    setUploadedImages(prev => [...prev, ...newImages]);
    setNewVehicle(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    
    setIsUploading(false);
  };

  const getVehicleWithId = (): Vehicle => {
    const nextId = generateVehicleId([...savedVehicles]);
    return {
      ...newVehicle,
      id: nextId
    } as Vehicle;
  };

  const handleSaveVehicle = () => {
    // Validar datos
    const errors = validateVehicle(newVehicle);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Crear vehículo con ID
    const vehicleWithId = getVehicleWithId();
    
    // Guardar usando la utilidad
    saveVehicleUtil(vehicleWithId);
    
    // Actualizar estado local
    setSavedVehicles(getSavedVehicles());
    
    alert('¡Vehículo guardado! Código generado y listo para copiar.');
    setPreviewMode(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Plus className="text-red-600" />
              Agregar Nuevo Vehículo
            </h1>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Eye size={20} />
              {previewMode ? 'Editar' : 'Vista Previa'}
            </button>
          </div>

          {/* Errores de validación */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-red-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-red-900">Errores de validación:</h4>
                  <ul className="list-disc list-inside text-red-800 mt-2">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!previewMode ? (
            <div className="space-y-6">
              {/* Información Básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca *
                  </label>
                  <input
                    type="text"
                    value={newVehicle.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ej: Toyota, Ford, Volkswagen"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    value={newVehicle.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ej: Hilux SRX, Ranger Raptor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año *
                  </label>
                  <input
                    type="number"
                    value={newVehicle.year}
                    onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="1990"
                    max="2030"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condición *
                  </label>
                  <select
                    value={newVehicle.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value as 'new' | 'used')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="new">Nuevo (0 KM)</option>
                    <option value="used">Usado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Combustible *
                  </label>
                  <input
                    type="text"
                    value={newVehicle.fuel}
                    onChange={(e) => handleInputChange('fuel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Ej: Diesel, Nafta, Gasolina"
                  />
                </div>

                {newVehicle.condition === 'used' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kilometraje
                    </label>
                    <input
                      type="number"
                      value={newVehicle.mileage || 0}
                      onChange={(e) => handleInputChange('mileage', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ej: 50000"
                    />
                  </div>
                )}
              </div>

              {/* Especificaciones Técnicas */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Especificaciones Técnicas (Opcional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motor
                    </label>
                    <input
                      type="text"
                      value={newVehicle.engine || ''}
                      onChange={(e) => handleInputChange('engine', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ej: 2.8L Turbo Diesel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transmisión
                    </label>
                    <input
                      type="text"
                      value={newVehicle.transmission || ''}
                      onChange={(e) => handleInputChange('transmission', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ej: Manual, Automática"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tracción
                    </label>
                    <input
                      type="text"
                      value={newVehicle.drivetrain || ''}
                      onChange={(e) => handleInputChange('drivetrain', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ej: 4x4, 4x2, AWD"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Potencia (HP)
                    </label>
                    <input
                      type="number"
                      value={newVehicle.powerHp || ''}
                      onChange={(e) => handleInputChange('powerHp', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ej: 200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <input
                      type="text"
                      value={newVehicle.color || ''}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Ej: Blanco, Negro, Rojo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puertas
                    </label>
                    <input
                      type="number"
                      value={newVehicle.doors || 4}
                      onChange={(e) => handleInputChange('doors', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="2"
                      max="5"
                    />
                  </div>
                </div>
              </div>

              {/* Subida de Imágenes */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Upload size={20} />
                  Imágenes del Vehículo
                </h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload size={48} className="text-gray-400 mb-2" />
                    <p className="text-lg font-medium text-gray-700">
                      Arrastra imágenes aquí o haz clic para seleccionar
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, JPEG hasta 10MB cada una
                    </p>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-sm text-gray-500">Imagen {index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleSaveVehicle}
                  disabled={!newVehicle.brand || !newVehicle.model || !newVehicle.fuel}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  Guardar Vehículo
                </button>
              </div>
            </div>
          ) : (
            /* Vista Previa */
            <div className="space-y-6">
              {/* Código TypeScript */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Código para vehicles.ts:
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generateVehicleCode(getVehicleWithId()))}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copiado!' : 'Copiar Código'}
                  </button>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
                  {generateVehicleCode(getVehicleWithId())}
                </pre>
              </div>

              {/* Comandos de terminal */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Terminal size={20} />
                    Comandos de Terminal:
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generateTerminalCommands(getVehicleWithId()).join('\n'))}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <Copy size={16} />
                    Copiar Comandos
                  </button>
                </div>
                <pre className="text-green-400 text-sm">
                  {generateTerminalCommands(getVehicleWithId()).join('\n')}
                </pre>
              </div>

              {/* Instrucciones paso a paso */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">Instrucciones Paso a Paso:</h4>
                    <ol className="list-decimal list-inside text-blue-800 space-y-2">
                      {generateInstructions(getVehicleWithId()).map((instruction, index) => (
                        <li key={index} className="leading-relaxed">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Información del vehículo */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3">Resumen del Vehículo:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-800">Marca:</span> {newVehicle.brand}
                  </div>
                  <div>
                    <span className="font-medium text-green-800">Modelo:</span> {newVehicle.model}
                  </div>
                  <div>
                    <span className="font-medium text-green-800">Año:</span> {newVehicle.year}
                  </div>
                  <div>
                    <span className="font-medium text-green-800">Condición:</span> {newVehicle.condition === 'new' ? 'Nuevo (0 KM)' : 'Usado'}
                  </div>
                  <div>
                    <span className="font-medium text-green-800">Imágenes:</span> {newVehicle.images.length} imagen(es)
                  </div>
                  <div>
                    <span className="font-medium text-green-800">Carpeta:</span> {generateVehicleFolderName(newVehicle.brand, newVehicle.model)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
