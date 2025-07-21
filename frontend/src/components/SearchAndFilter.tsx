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
  <div className="mb-12 flex flex-col md:flex-row gap-6 justify-center items-center">
    <div className="relative w-full max-w-xs md:max-w-md">
      {/* Input de búsqueda con ícono */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
      <input
        type="text"
        placeholder="Buscar marca o modelo..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-3 w-full rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-400 shadow-md transition-all duration-200 focus:shadow-lg"
      />
    </div>
    <div className="flex gap-3 flex-wrap justify-center">
      {/* Botones de filtro de condición */}
      <button
        onClick={() => setFilterCondition("all")}
        className={`px-7 py-3 rounded-xl font-bold text-base transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400
          ${filterCondition === "all" ? "bg-red-600 text-white scale-105" : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"}`}
      >
        Todos
      </button>
      <button
        onClick={() => setFilterCondition("new")}
        className={`px-7 py-3 rounded-xl font-bold text-base transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400
          ${filterCondition === "new" ? "bg-red-600 text-white scale-105" : "bg-gray-700 text-gray-300 hover:bg-gray-700 hover:scale-105"}`}
      >
        0 KM
      </button>
      <button
        onClick={() => setFilterCondition("used")}
        className={`px-7 py-3 rounded-xl font-bold text-base transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400
          ${filterCondition === "used" ? "bg-red-600 text-white scale-105" : "bg-gray-700 text-gray-300 hover:bg-gray-700 hover:scale-105"}`}
      >
        Usados
      </button>
    </div>
  </div>
);

export default SearchAndFilter; 