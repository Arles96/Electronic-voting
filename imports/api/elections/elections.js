import { Mongo } from 'meteor/mongo';

const Elections = new Mongo.Collection('elections');

const ElectionsSchema = new SimpleSchema({
    name: {
      type: String,
      label: 'Nombre'
    },
    email: {
      type: String,
      optional: true,
      label: 'Correo (Opcional)'
    },
    website: {
      type: String,
      label: 'Sitio web',
      regEx: RegExObj.website,
      optional: true
    },
    street: {
      type: String,
      label: 'Calle'
    },
    city: {
      type: String,
      label: 'Ciudad',
      regEx: RegExObj.names
    },
    municipality: {
      type: String,
      label: 'Municipio',
      regEx: RegExObj.names
    },
    departament: {
      type: String,
      label: 'Departamento',
      autoform: {
        firstOption: '(Seleccione Uno)',
        options: () => departments
      }
    },
    categorization: {
      type: String,
      label: 'Categorización',
      autoform: {
        readonly: true,
        omit: true,
        afFieldInput: {
          type: 'hidden'
        },
        afFormGroup: {
          label: false
        }
      }
    },
    coin: {
      type: Array,
      label: 'Monedas aceptadas',
      autoform: {
        firstOption: '(Seleccione Uno)',
        options: () => money
      }
    },
    'coin.$': {
      type: String,
      label: 'Moneda'
    },
    phone: {
      type: Array,
      label: 'Teléfono',
      custom: function () {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.value.length; i++) {
          // eslint-disable-next-line no-plusplus
          for (let j = i + 1; j < this.value.length; j++) {
            if (this.value[j] === this.value[i]) {
              return 'duplicatePhones';
            }
          }
        }
        return 1;
      }
    },
    'phone.$': {
      type: String,
      label: 'Teléfono',
      regEx: RegExObj.isNumber,
      min: 8,
      max: 8
    },
    services: {
      type: Array,
      label: 'Servicios'
    },
    'services.$': {
      type: String,
      label: 'Servicios'
    },
    paymentsMethod: {
      type: Array,
      label: 'Metodos de pago',
      autoform: {
        firstOption: '(Seleccione Uno)',
        options: () => paymentMethods
      }
    },
    'paymentsMethod.$': {
      type: String,
      label: 'Metodos de pago'
    },
    informationsAB: {
      type: Array,
      label: 'Información A y B'
    },
    'informationsAB.$': {
      type: String,
      label: 'Información A y B'
    },
    activities: {
      type: Array,
      label: 'Actividades'
    },
    'activities.$': {
      type: String,
      label: 'Actividad'
    },
    images: {
      type: Array,
      label: 'Imagenes (Opcional)',
      optional: true
    },
    'images.$': {
      type: String,
      autoform: {
        afFieldInput: {
          type: 'fileUpload',
          collection: 'HotelImages'
        }
      }
    },
    branchOffice: {
      type: Boolean,
      label: 'Es sucursal',
      defaultValue: false
    },
    mainOffice: {
      type: String,
      label: 'Oficina principal',
      custom: function () {
        if (!this.value && this.field('branchOffice').value) {
          return 'required';
        } else {
          return 1;
        }
      },
      optional: true
    },
    branchContacts: {
      type: Array,
      label: 'Contactos',
      minCount: 1,
      maxCount: 10,
      optional: true
    },
    'branchContacts.$': {
      type: branchContactsSchema,
      label: '',
      optional: true
    },
    createAt: {
      type: Date,
      optional: true,
      autoValue: () => new Date()
    }
  }, { check: check, tracker: Tracker });
  
  ElectionsSchema.messageBox.messages(messages);
  
  Elections.attachSchema(ElectionsSchema);

export { Elections, ElectionsSchema };