import React from "react";

const brands = [
  { name: "Toyota", src: "/logos/toyota.png" },
  { name: "Volkswagen", src: "/logos/vw.png" },
  { name: "Ford", src: "/logos/ford.png" },
  { name: "Chevrolet", src: "/logos/chevrolet.png" },
  { name: "Fiat", src: "/logos/fiat.png" },
  { name: "Renault", src: "/logos/renault.png" },
  { name: "Peugeot", src: "/logos/peugeot.png" },
  { name: "Audi", src: "/logos/audi.png" },
];

// Duplicar para animación infinita
const brandsRow = [...brands, ...brands];

const rowStyle = {
  display: "flex",
  gap: "3rem",
  minWidth: "100%",
  alignItems: "center",
};

const animationDuration = 30; // segundos

const BrandsSection: React.FC = () => (
  <section className="py-12 bg-white border-y border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Fila superior: izquierda */}
      <div className="overflow-hidden w-full mb-6">
        <div
          style={{
            ...rowStyle,
            animation: `brands-left ${animationDuration}s linear infinite`,
          }}
          className="brands-row"
        >
          {brandsRow.map((brand, idx) => (
            <img
              key={brand.name + idx}
              src={brand.src}
              alt={brand.name}
              className="h-16 w-auto object-contain"
              draggable={false}
              style={{ maxHeight: 64, minWidth: 100 }}
            />
          ))}
        </div>
      </div>
      {/* Fila inferior: derecha */}
      <div className="overflow-hidden w-full">
        <div
          style={{
            ...rowStyle,
            animation: `brands-right ${animationDuration}s linear infinite`,
          }}
          className="brands-row"
        >
          {brandsRow.map((brand, idx) => (
            <img
              key={brand.name + "-b" + idx}
              src={brand.src}
              alt={brand.name}
              className="h-16 w-auto object-contain"
              draggable={false}
              style={{ maxHeight: 64, minWidth: 100 }}
            />
          ))}
        </div>
      </div>
    </div>
    {/* Animaciones CSS */}
    <style>{`
      @keyframes brands-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes brands-right {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      .brands-row {
        width: max-content;
      }
    `}</style>
  </section>
);

export default BrandsSection; 