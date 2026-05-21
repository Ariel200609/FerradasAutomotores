import {defineType, defineField} from 'sanity'

export const vehicleType = defineType({
  name: 'vehicle',
  title: 'Vehículo',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'string',
      validation: (Rule) => Rule.required().error('La marca es obligatoria'),
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      type: 'string',
      validation: (Rule) => Rule.required().error('El modelo es obligatorio'),
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(1990).max(2030).error('Año entre 1990 y 2030'),
    }),
    defineField({
      name: 'slug',
      title: 'URL del vehículo',
      type: 'slug',
      description: 'Se genera automáticamente. Usalo para la URL de la página.',
      options: {
        source: (doc: any) =>
          `${doc.brand}-${doc.model}-${doc.year}`
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, ''),
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'condition',
      title: 'Condición',
      type: 'string',
      options: {
        list: [
          {title: '0 KM (Nuevo)', value: 'new'},
          {title: 'Usado', value: 'used'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fuel',
      title: 'Combustible',
      type: 'string',
      options: {
        list: [
          {title: 'Nafta', value: 'Nafta'},
          {title: 'Diesel', value: 'Diesel'},
          {title: 'Gasolina', value: 'Gasolina'},
          {title: 'Nafta-Eléctrico (Híbrido)', value: 'Híbrido'},
          {title: 'Eléctrico', value: 'Eléctrico'},
          {title: 'GNC', value: 'GNC'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mileage',
      title: 'Kilometraje',
      type: 'number',
      description: 'Solo para vehículos usados. Dejá en 0 si es 0KM.',
    }),
    defineField({
      name: 'priceUsd',
      title: 'Precio en USD',
      type: 'number',
      description: 'Opcional. Si no querés mostrarlo, dejalo vacío.',
    }),
    defineField({
      name: 'images',
      title: 'Fotos del vehículo',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Descripción de la foto',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Subí todas las fotos del vehículo aquí. La primera foto es la principal.',
      validation: (Rule) => Rule.min(1).error('Necesitás al menos 1 foto'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Texto libre sobre el vehículo: estado, extras, financiación, etc.',
    }),
    // Specs técnicas opcionales
    defineField({
      name: 'engine',
      title: 'Motor',
      type: 'string',
      description: 'Ej: 2.8L Turbo Diesel, V6 3.0, etc.',
      group: 'specs',
    }),
    defineField({
      name: 'transmission',
      title: 'Transmisión',
      type: 'string',
      options: {
        list: [
          {title: 'Manual', value: 'Manual'},
          {title: 'Automática', value: 'Automática'},
          {title: 'CVT', value: 'CVT'},
        ],
      },
      group: 'specs',
    }),
    defineField({
      name: 'drivetrain',
      title: 'Tracción',
      type: 'string',
      options: {
        list: [
          {title: '4x2', value: '4x2'},
          {title: '4x4', value: '4x4'},
          {title: 'AWD', value: 'AWD'},
          {title: 'FWD', value: 'FWD'},
          {title: 'RWD', value: 'RWD'},
        ],
      },
      group: 'specs',
    }),
    defineField({
      name: 'powerHp',
      title: 'Potencia (HP)',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'torqueNm',
      title: 'Torque (Nm)',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'doors',
      title: 'Puertas',
      type: 'number',
      group: 'specs',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      group: 'specs',
    }),
    defineField({
      name: 'bodyType',
      title: 'Tipo de carrocería',
      type: 'string',
      options: {
        list: [
          {title: 'Pick-up', value: 'Pick-up'},
          {title: 'SUV', value: 'SUV'},
          {title: 'Sedán', value: 'Sedán'},
          {title: 'Hatchback', value: 'Hatchback'},
          {title: 'Coupé', value: 'Coupé'},
          {title: 'Utilitario', value: 'Utilitario'},
          {title: 'Camioneta', value: 'Camioneta'},
        ],
      },
      group: 'specs',
    }),
  ],
  groups: [
    {name: 'specs', title: 'Especificaciones técnicas'},
  ],
  preview: {
    select: {
      title: 'brand',
      subtitle: 'model',
      media: 'images.0',
    },
    prepare({title, subtitle, media}) {
      return {
        title: `${title} ${subtitle}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Más recientes primero',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
