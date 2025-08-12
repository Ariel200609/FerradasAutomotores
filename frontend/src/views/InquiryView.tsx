import React, { useMemo, useState, useEffect } from "react";
import { vehicles } from "../data/vehicles";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "5492923695246"; // número destino

const InquiryView: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [vehiculoId, setVehiculoId] = useState<number | "">("");
  const [permuta, setPermuta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const selectedVehicle = useMemo(
    () => vehicles.find(v => v.id === vehiculoId),
    [vehiculoId]
  );

  // Preseleccionar vehículo por query param ?vehiculoId=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('vehiculoId');
    if (idParam) {
      const id = Number(idParam);
      if (!Number.isNaN(id)) setVehiculoId(id);
    }
  }, []);

  const waText = useMemo(() => {
    const line = (k: string, v?: string) => (v && v.trim() ? `\n${k}: ${v}` : "");
    const vLine = selectedVehicle
      ? `\nVehículo: ${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.year})`
      : "";
    const extra = permuta ? "\nInteresa permuta: Sí" : "";
    return encodeURIComponent(
      `Hola Ferradas Automotores, quiero más info.${vLine}${line("Nombre", nombre)}${line("Email", email)}${extra}${line("Mensaje", mensaje)}`
    );
  }, [selectedVehicle, nombre, email, mensaje, permuta]);

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  const canSend = !!nombre.trim();

  return (
    <section className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <SEO
        title="Consulta / Quiero este vehículo | Ferradas Automotores"
        description="Enviá tu consulta por WhatsApp con los datos del vehículo y tus datos de contacto."
        canonical="https://ferradasautomotores.com/consultar"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-red-600 hover:underline">
            <span>←</span>
            <span>Volver al inicio</span>
          </Link>
        </div>
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Enviar consulta</h1>
          <p className="text-gray-500 mt-2">Te contactamos a la brevedad por WhatsApp.</p>
        </header>

        <div className="bg-white rounded-xl shadow p-5 md:p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nombre y apellido *</label>
              <input className="w-full border rounded-lg px-3 py-2" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
              <input className="w-full border rounded-lg px-3 py-2" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Ej: 2923 123456" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input className="w-full border rounded-lg px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@mail.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Vehículo</label>
              <select className="w-full border rounded-lg px-3 py-2" value={vehiculoId} onChange={e => setVehiculoId(e.target.value ? Number(e.target.value) : "")}> 
                <option value="">Seleccionar…</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.brand} {v.model} ({v.year})</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Mensaje</label>
              <textarea className="w-full border rounded-lg px-3 py-2" rows={4} value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Hola, me interesa…" />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input id="permuta" type="checkbox" className="h-4 w-4" checked={permuta} onChange={e => setPermuta(e.target.checked)} />
              <label htmlFor="permuta" className="text-sm text-gray-700">Me interesa permuta</label>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={canSend ? waUrl : undefined}
              onClick={(e) => { if (!canSend) e.preventDefault(); }}
              target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white shadow ${canSend ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M.057 24l1.687-6.163a11.867 11.867 0 1 1 4.325 4.3L.057 24zm6.597-3.807c1.676.995 3.276 1.593 5.256 1.593 5.653 0 10.253-4.6 10.253-10.253S17.563 1.28 11.91 1.28 1.657 5.88 1.657 11.533c0 2.02.598 3.745 1.593 5.256l-.998 3.657 3.402-.953zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.52-.074-.149-.669-1.611-.916-2.207-.242-.58-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.793.372-.272.297-1.04 1.016-1.04 2.477s1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.412z"/></svg>
              Enviar por WhatsApp
            </a>
            <p className="text-xs text-gray-500">Para adjuntar fotos de permuta, envialas en el chat de WhatsApp luego de abrirlo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryView;


