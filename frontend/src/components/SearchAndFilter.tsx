// SearchAndFilter.tsx
// Componente de búsqueda y filtrado para la sección de vehículos.
// Permite buscar por marca o modelo y filtrar por condición (nuevo, usado, todos).
// Recibe props controladas para el término de búsqueda y el filtro seleccionado.

import React from "react";
import { Search } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  filterCondition: "all" | "new" | "used";
  setFilterCondition: (v: "all" | "new" | "used") => void;
}

const SearchAndFilter: React.FC<Props> = ({ searchTerm, setSearchTerm, filterCondition, setFilterCondition }) => (
  <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
    <div className="relative">
      {/* Input de búsqueda con ícono */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Buscar marca o modelo..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 w-full md:w-80"
      />
    </div>
    <div className="flex gap-2">
      {/* Botones de filtro de condición */}
      <button
        onClick={() => setFilterCondition("all")}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filterCondition === "all" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
      >
        Todos
      </button>
      <button
        onClick={() => setFilterCondition("new")}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filterCondition === "new" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-700"}`}
      >
        0 KM
      </button>
      <button
        onClick={() => setFilterCondition("used")}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${filterCondition === "used" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-700"}`}
      >
        Usados
      </button>
    </div>
  </div>
);

export default SearchAndFilter; 