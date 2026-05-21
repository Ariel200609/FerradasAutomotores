export const getVehicleRoute = (vehicle: any): string => {
  // If it's a dynamic Sanity vehicle, it has a regular slug
  if (vehicle.slug?.current && !vehicle.slug.current.startsWith('static-')) {
    return `/vehiculo/sanity/${vehicle.slug.current}`;
  }

  // If it's a static vehicle, map by its original ID
  const staticId = vehicle.id || (vehicle.slug?.current ? parseInt(vehicle.slug.current.replace('static-', '')) : null);

  const routeMap: Record<number, string> = {
    2: '/vehiculo/amarokv6',
    3: '/vehiculo/focus',
    5: '/vehiculo/fastback',
    6: '/vehiculo/maverik',
    7: '/vehiculo/t-cross',
    8: '/vehiculo/hilux', // Hilux SRX
    9: '/vehiculo/amarok-highline',
    10: '/vehiculo/hiluxsrv',
    11: '/vehiculo/raptor',
    12: '/vehiculo/ecosport',
    13: '/vehiculo/up',
    14: '/vehiculo/amarokv6',
    15: '/vehiculo/frontier',
    16: '/vehiculo/hilux-srx-gris',
    17: '/vehiculo/oroch',
    18: '/vehiculo/307',
    19: '/vehiculo/mustang',
    20: '/vehiculo/amarok-highline-g2',
    21: '/vehiculo/amarok-black-style-g2',
    22: '/vehiculo/amarok-comfortline-g2',
    23: '/vehiculo/t-cross-bitono',
    24: '/vehiculo/taos',
    25: '/vehiculo/polo-track',
    26: '/vehiculo/hilux-4x4-at',
    27: '/vehiculo/hilux-srv-roja',
    28: '/vehiculo/hilux-sr-4x4-mt',
    29: '/vehiculo/hilux-DX', // Capital DX matching AppRoutes
    30: '/vehiculo/hilux-dx-cs',
    31: '/vehiculo/hilux-srx-0km',
    32: '/vehiculo/bronco',
    33: '/vehiculo/ranger-xs',
    34: '/vehiculo/ranger-black-edition',
    35: '/vehiculo/ranger-limited-v6',
    36: '/vehiculo/toro-270-vulcano',
    37: '/vehiculo/ram-rampage',
  };

  if (staticId && routeMap[staticId]) {
    return routeMap[staticId];
  }

  // Fallback if not found in map, go to dynamic view
  return `/vehiculo/sanity/${vehicle.slug?.current || vehicle._id || vehicle.id}`;
};
