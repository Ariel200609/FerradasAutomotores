// src/data/vehicles.ts
// Fuente única de datos de vehículos para reutilizar en grid y comparador

export type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
  images: string[];
  condition: "new" | "used";
  mileage?: number;
  fuel: string;
  // Opcionales para comparación avanzada
  priceUsd?: number;
  transmission?: string; // Manual / Automática / CVT
  drivetrain?: string; // 4x2, 4x4, AWD, FWD, RWD
  bodyType?: string; // Pick-up, SUV, Sedán, Coupé
  engine?: string; // 2.0 TSi, V6 3.0, 5.0 V8, etc.
  powerHp?: number;
  torqueNm?: number;
  doors?: number;
  color?: string;
};

export const vehicles: Vehicle[] = [
  {
    id: 2,
    brand: "Volkswagen",
    model: "Amarok V6",
    year: 2025,
    images: ["/AmarokV6.jpg"],
    condition: "new",
    fuel: "Diesel",
  },
  // Ford Focus Guia
  {
    id: 3,
    brand: "Ford",
    model: "Focus Guia",
    year: 2013,
    images: ["/focus/IMG-20250718-WA0113.jpg"],
    condition: "used",
    mileage: 200000,
    fuel: "Nafta",
  },
  // (Eliminado Onix RS)
  {
    id: 5,
    brand: "Fiat",
    model: "Fastback 270",
    year: 2025,
    images: ["/Fastback/PortadaFiat.jpg"],
    condition: "new",
    fuel: "Gasolina",
  },
  {
    id: 6,
    brand: "Ford",
    model: "Maverik Lariat Híbrida ",
    year: 2024,
    mileage: 25000,
    images: ["/Maverik/PortadaMaverik.jpg"],
    condition: "used",
    fuel: "Naftera-Eléctrica",
  },
  // Volkswagen T-cross Highline
  {
    id: 7,
    brand: "Volkswagen",
    model: "T-cross Highline",
    year: 2020,
    mileage: 70000,
    images: ["/t-cross/dalanteT-cross.jpg"],
    condition: "used",
    fuel: "Naftero",
  },
  // Toyota Hilux
  {
    id: 8,
    brand: "Toyota",
    model: "Hilux SRX",
    year: 2019,
    images: ["/HiluxBlack/Hilux(1).jpg"],
    condition: "used",
    mileage: 130000,
    fuel: "Diesel",
  },
  // Volkswagen Amarok Highline Gris
  {
    id: 9,
    brand: "Volkswagen",
    model: "Amarok Highline",
    year: 2021,
    images: ["/AmarokGris/Amarok(2).jpg"],
    condition: "used",
    mileage: 100000,
    fuel: "Diesel",
  },
  // Toyota Hilux SRV
  {
    id: 10,
    brand: "Toyota",
    model: "Hilux SRV",
    year: 2021,
    images: ["/HiluxSRV/srv(7).jpg"],
    condition: "used",
    mileage: 180000,
    fuel: "Diesel",
  },
  // Ford Ranger Raptor
  {
    id: 11,
    brand: "Ford",
    model: "Ranger Raptor",
    year: 2024,
    images: ["/Raptor/raptor(1).jpg"],
    condition: "used",
    mileage: 25000,
    fuel: "Nafta",
  },
  // Ford Ecosport XLS
  {
    id: 12,
    brand: "Ford",
    model: "Ecosport XLS",
    year: 2010,
    images: ["/ecosport/ecosport(1).jpg"],
    condition: "used",
    mileage: 200000,
    fuel: "Nafta",
  },
  // Volkswagen UP
  {
    id: 13,
    brand: "Volkswagen",
    model: "UP",
    year: 2017,
    images: ["/up/up(1).jpg"],
    condition: "used",
    mileage: 100,
    fuel: "Nafta",
  },
  // Volkswagen Amarok V6
  {
    id: 14,
    brand: "Volkswagen",
    model: "Amarok V6",
    year: 2022,
    images: ["/amarokv6/IMG-20250719-WA0002.jpg"],
    condition: "used",
    mileage: 90000,
    fuel: "Diesel",
  },
  // Nissan Frontier S
  {
    id: 15,
    brand: "Nissan",
    model: "Frontier",
    year: 2021,
    images: ["/frontier/IMG-20250719-WA0020.jpg"],
    condition: "used",
    mileage: 180000,
    fuel: "Diesel",
  },
  // Toyota Hilux SRX Gris
  {
    id: 16,
    brand: "Toyota",
    model: "Hilux SRX Gris",
    year: 2017,
    images: ["/srxgris/IMG-20250719-WA0025.jpg"],
    condition: "used",
    mileage: 230000,
    fuel: "Diesel",
  },
  // Renault Duster Oroch Outsider
  {
    id: 17,
    brand: "Renault",
    model: "Duster Oroch Outsider",
    year: 2017,
    images: ["/oroch/IMG-20250719-WA0039.jpg"],
    condition: "used",
    mileage: 230000,
    fuel: "Nafta",
  },
  // Peugeot 307 XS Cuero
  {
    id: 18,
    brand: "Peugeot",
    model: "307 XS Cuero",
    year: 2011,
    images: ["/307/IMG-20250719-WA0049.jpg"],
    condition: "used",
    mileage: 125000,
    fuel: "Nafta",
  },
  // Ford Mustang GT
  {
    id: 19,
    brand: "Ford",
    model: "Mustang GT",
    year: 2023,
    images: ["/mustang/IMG-20250719-WA0073.jpg"],
    condition: "used",
    mileage: 15000,
    fuel: "Nafta",
  },
  // Volkswagen Amarok Highline G2
  {
    id: 20,
    brand: "Volkswagen",
    model: "Amarok Highline G2",
    year: 2025,
    images: ["/higlineG2/IMG-20250720-WA0053.jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Volkswagen Amarok Highline Black Style G2
  {
    id: 21,
    brand: "Volkswagen",
    model: "Amarok Black Style G2",
    year: 2025,
    images: ["/higline black style G2/IMG-20250720-WA0057.jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Volkswagen Amarok Comfortline G2
  {
    id: 22,
    brand: "Volkswagen",
    model: "Amarok Comfortline G2",
    year: 2025,
    images: ["/comfortline G2/IMG-20250720-WA0068.jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Volkswagen T-Cross Bitono
  {
    id: 23,
    brand: "Volkswagen",
    model: "T-Cross Bitono",
    year: 2025,
    images: ["/t-cross bitono/IMG-20250720-WA0078.jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Nafta",
  },
  // Volkswagen Taos
  {
    id: 24,
    brand: "Volkswagen",
    model: "Taos",
    year: 2025,
    images: ["/taos/IMG-20250720-WA0088.jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Nafta",
  },
  // Volkswagen Polo Track
  {
    id: 25,
    brand: "Volkswagen",
    model: "Polo Track",
    year: 2025,
    images: ["/polo track/IMG-20250720-WA0098.jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Nafta",
  },
  // Hilux srx 4x4 AT
  {
    id: 26,
    brand: "Toyota",
    model: "Hilux SRX 4x4 AT",
    year: 2025,
    images: ["/ToyotaHiluxsrx4x4AT/t(2).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Hilux SRV Red
  {
    id: 27,
    brand: "Toyota",
    model: "Hilux SRV Roja",
    year: 2025,
    images: ["/hiluxsrvred/red(1).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // hilux sr 4x4 mt
  {
    id: 28,
    brand: "Toyota",
    model: "hilux sr 4x4 mt",
    year: 2025,
    images: ["/ToyotaHiluxSr4x4MT/b(1).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  //Toyota Hilux DX
  {
    id: 29,
    brand: "Toyota",
    model: "Hilux DX",
    year: 2025,
    images: ["/ToyotaHiluxDX/d(1).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // Toyota Hilux CS
  {
    id: 30,
    brand: "Toyota",
    model: "hilux dx cs",
    year: 2025,
    images: ["/ToyotaHiluxDXcs/c(1).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  //HiluxSrx0km
  {
    id: 31,
    brand: "Toyota",
    model: "hilux srx 0km",
    year: 2025,
    images: ["/ToyotaHiluxSRX0km/g(1).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  //Ford Bronco 
  {
    id: 32,
    brand: "Ford",
    model: "bronco",
    year: 2025,
    images: ["/FordBronco/f(1).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Nafta",
  },
  // ford ranger xs
  {
    id: 33,
    brand: "Ford",
    model: "ranger xs",
    year: 2025,
    images: ["/FordRangerXS/r(1).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  // ford ranger black edition
  {
    id: 34,
    brand: "Ford",
    model: "ranger black edition",
    year: 2025,
    images: ["/FordRangerBlackEdition/b(1).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  //Ford ranger limited v6
  {
    id: 35,
    brand: "Ford",
    model: "ranger limited v6",
    year: 2025,
    images: ["/FordRangerLimitedV6/l(3).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Diesel",
  },
  //Fiat toro 270 vulcano
  {
    id: 36,
    brand: "Fiat",
    model: "toro 270 vulcano",
    year: 2025,
    images: ["/FiatToro270Vulcano/t(3).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Gasolina",
  },
  //Dodge Ram Rampage
  {
    id: 37,
    brand: "Dodge",
    model: "ram rampage",
    year: 2025,
    images: ["/DodgeRamRampage/r(5).jpg"],
    condition: "new",
    mileage: 0,
    fuel: "Nafta",
  },
];


