import React, { useRef, useState } from "react";
import { Star } from "lucide-react";

const clients = [
  {
    name: "Jorge Marzilio",
    image: `${import.meta.env.BASE_URL}clientes/cliente1.jpg`,
    text: "Gracias por elegirnos que disfrutes de esta hermosa amarok v6 Higline 0km 🚀🥂👏 V6 que se va para la ciudad de 25 de Mayo",
    rating: 5,
  },
  {
    name: "Julián Pollini",
    image: `${import.meta.env.BASE_URL}clientes/cliente2.jpg`,
    text: " Gracias por elegirnos nuevamente que disfrutes de este hermoso Toyota Yaris 0km 🥂👏 se va para BS AS",
    rating: 5,
  },
  {
    name: "María Alicia",
    image: `${import.meta.env.BASE_URL}clientes/cliente3.jpg`,
    text: "gracias por confiar ahora a estrenar este hermoso Polo 0km 🥂👏 Salliquelo 📍.",
    rating: 5,
  },
  {
    name: "Cristian Gracia y familia",
    image: `${import.meta.env.BASE_URL}clientes/cliente4.jpg`,
    text: "Gracias por elegirnos. que disfruten de este hermoso Ford Focus 🥂👏",
    rating: 5,
  },
  /*{
    name: "Jorge y familia",
    image: `${import.meta.env.BASE_URL}clientes/cliente5.jpg`,
    text: "Gracias por elegirnos. Que disfruten de este hermoso Toyota Corolla 🥂👏",
    rating: 5,
  },
  {
    name: "María y familia",
    image: `${import.meta.env.BASE_URL}clientes/cliente6.jpg`,
    text: "Gracias por elegirnos. Que disfruten de este hermoso Toyota Corolla 🥂👏",
    rating: 5,
  },
  {
    name: "Sergio y familia",
    image: `${import.meta.env.BASE_URL}clientes/cliente7.jpg`,
    text: "Gracias por elegirnos. Que disfruten de esta hermosa Toyota Hilux 🥂👏",
    rating: 5,
  },
  {
    name: "María y familia",
    image: `${import.meta.env.BASE_URL}clientes/cliente8.jpg`,
    text: "Gracias por elegirnos. Que disfruten de esta hermosa Toyota Hilux 🥂👏",
    rating: 5,
  },*/  

];

const ClientCard: React.FC<{ client: typeof clients[0] }> = ({ client }) => {
  if (!client.text) {
    // Solo imagen si no hay testimonio
    return (
      <div className="min-w-[300px] max-w-[300px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex items-center justify-center" style={{ minHeight: 320 }}>
        <img
          src={client.image}
          alt={client.name}
          className="object-cover w-full h-full"
          onError={e => (e.currentTarget.style.opacity = '0.3')}
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div className="min-w-[300px] max-w-[300px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col items-center p-6" style={{ minHeight: 320 }}>
      <div className="relative w-full h-40 flex items-end justify-center mb-3">
        <img
          src={client.image}
          alt={client.name}
          className="object-contain w-full h-full"
          onError={e => (e.currentTarget.style.opacity = '0.3')}
          loading="lazy"
        />
      </div>
      <div className="font-semibold text-gray-900 text-lg mb-2 text-center w-full truncate">{client.name}</div>
      {client.rating > 0 && (
        <div className="flex mb-2 justify-center">
          {[...Array(client.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
          ))}
        </div>
      )}
      <p className="text-gray-700 leading-relaxed text-center text-base">"{client.text}"</p>
    </div>
  );
};

const ClientGrid: React.FC<{ clients: typeof clients }> = ({ clients }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <button
        onClick={() => scroll("left")}
        className="z-20 bg-transparent focus:outline-none text-gray-800 text-3xl font-bold flex items-center justify-center mr-2"
        aria-label="Anterior"
        style={{ width: 26, height: 26 }}
      >
        {'<'}
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 py-4 px-8 scrollbar-none"
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {clients.map((client, idx) => (
          <ClientCard key={idx} client={client} />
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="z-20 bg-transparent focus:outline-none text-gray-800 text-3xl font-bold flex items-center justify-center ml-2"
        aria-label="Siguiente"
        style={{ width: 36, height: 36 }}
      >
        {'>'}
      </button>
    </div>
  );
};

const TestimonialsSection: React.FC = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Nuestros <span className="text-red-600">Clientes</span>
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-2">
          La satisfacción de nuestros clientes es nuestra mayor recompensa.
        </p>
      </div>
      <ClientGrid clients={clients} />
    </div>
  </section>
);

export default TestimonialsSection; 