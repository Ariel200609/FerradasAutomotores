import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonios } from "../data/testimonios";

const clients = testimonios.map((t) => ({
  ...t,
  image: `${import.meta.env.BASE_URL}${t.image}`,
}));

const ClientCard: React.FC<{ client: (typeof clients)[0] }> = ({ client }) => {
  if (!client.text) {
    return (
      <div className="card-premium bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex items-center justify-center flex-shrink-0 min-w-[85vw] sm:min-w-[320px] sm:max-w-[340px] h-[320px]">
        <img
          src={client.image}
          alt={client.name}
          className="object-cover w-full h-full"
          onError={(e) => (e.currentTarget.style.opacity = "0.3")}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="card-premium bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col items-center p-6 flex-shrink-0 min-w-[85vw] sm:min-w-[320px] sm:max-w-[340px] h-[320px]">
      <div className="relative w-full h-36 flex items-end justify-center mb-3 shrink-0">
        <img
          src={client.image}
          alt={client.name}
          className="object-contain w-full h-full"
          onError={(e) => (e.currentTarget.style.opacity = "0.3")}
          loading="lazy"
        />
      </div>
      <div className="font-semibold text-gray-900 text-lg mb-2 text-center w-full truncate">
        {client.name}
      </div>
      <p className="text-gray-700 leading-relaxed text-center text-sm sm:text-base line-clamp-4">
        "{client.text}"
      </p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length === 0) return;

    const viewport = container.clientWidth;
    const centerX = container.scrollLeft + viewport / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (index < 0 || index >= cards.length) return;

    const targetCard = cards[index];
    const viewport = container.clientWidth;
    const targetCenter = targetCard.offsetLeft + targetCard.clientWidth / 2;
    const newScrollLeft = targetCenter - viewport / 2;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;

      const cards = Array.from(container.children) as HTMLElement[];
      if (cards.length === 0) return;

      const viewport = container.clientWidth;
      const centerX = container.scrollLeft + viewport / 2;

      let closestIdx = 0;
      let closestDist = Infinity;

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(cardCenter - centerX);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });

      const nextIdx =
        direction === "left"
          ? Math.max(closestIdx - 1, 0)
          : Math.min(closestIdx + 1, cards.length - 1);

      scrollToIndex(nextIdx);
    },
    [scrollToIndex]
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            MÁS DE 100 <span className="text-red-600">CLIENTES</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-2">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>
        </div>

        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="flex scroll-snap-x scrollbar-none carousel-fade-edges gap-6 py-4 px-4 overflow-x-auto"
          >
            {clients.map((client, idx) => (
              <div key={idx} className="snap-center">
                <ClientCard client={client} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 glass-card rounded-full shadow-lg items-center justify-center hover:scale-110 transition-transform duration-200 focus:outline-none"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 glass-card rounded-full shadow-lg items-center justify-center hover:scale-110 transition-transform duration-200 focus:outline-none"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          {clients.length > 1 && (
            <div className="flex justify-center items-center gap-2 pb-2 px-4">
              <span className="text-xs text-gray-400 font-medium tabular-nums">
                {activeIndex + 1}/{clients.length}
              </span>
              <div className="flex-1 max-w-[200px] h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${((activeIndex + 1) / clients.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
