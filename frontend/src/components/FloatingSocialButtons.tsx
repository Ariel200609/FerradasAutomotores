import React from "react";

const FloatingSocialButtons: React.FC = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 animate-fade-in">
    {/* WhatsApp */}
    <a
      href="https://wa.me/5492923659973"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Ferradas Automotores"
      className="bg-white rounded-full shadow-lg p-2 flex items-center justify-center hover:scale-110 transition-transform duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 24 24" className="text-green-500">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.93 2.95 4.68 4.02.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
      </svg>
    </a>
    {/* Instagram */}
    <a
      href="https://www.instagram.com/ferradas_automotores/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram Ferradas Automotores"
      className="bg-white rounded-full shadow-lg p-2 flex items-center justify-center hover:scale-110 transition-transform duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-800">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.5" strokeWidth="2"/>
      </svg>
    </a>
  </div>
);

export default FloatingSocialButtons; 