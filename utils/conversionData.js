// Base conversion factors to SI units for each dimension
export const DIMENSIONS = {
  TIME: 'Time',
  LENGTH: 'Length',
  AREA: 'Area',
  VOLUME: 'Volume',
  SPEED: 'Speed',
  ACCELERATION: 'Acceleration',
  MASS: 'Mass',
  FORCE: 'Force',
  PRESSURE: 'Pressure',
  ENERGY: 'Work/Energy',
  TEMPERATURE: 'Temperature',
  FREQUENCY: 'Frequency',
  POWER: 'Power'
};

// SI (International System) units with their conversion factors to base SI unit
export const SI_UNITS = {
  [DIMENSIONS.TIME]: {
    second: { factor: 1, symbol: 's', name: 'Second' },
    millisecond: { factor: 0.001, symbol: 'ms', name: 'Millisecond' },
    minute: { factor: 60, symbol: 'min', name: 'Minute' },
    hour: { factor: 3600, symbol: 'h', name: 'Hour' },
    day: { factor: 86400, symbol: 'd', name: 'Day' },
    week: { factor: 604800, symbol: 'wk', name: 'Week' },
    year: { factor: 31557600, symbol: 'yr', name: 'Year' }
  },
  [DIMENSIONS.LENGTH]: {
    meter: { factor: 1, symbol: 'm', name: 'Meter' },
    millimeter: { factor: 0.001, symbol: 'mm', name: 'Millimeter' },
    centimeter: { factor: 0.01, symbol: 'cm', name: 'Centimeter' },
    decimeter: { factor: 0.1, symbol: 'dm', name: 'Decimeter' },
    kilometer: { factor: 1000, symbol: 'km', name: 'Kilometer' },
    micrometer: { factor: 0.000001, symbol: 'μm', name: 'Micrometer' },
    nanometer: { factor: 0.000000001, symbol: 'nm', name: 'Nanometer' }
  },
  [DIMENSIONS.AREA]: {
    'square meter': { factor: 1, symbol: 'm²', name: 'Square Meter' },
    'square millimeter': { factor: 0.000001, symbol: 'mm²', name: 'Square Millimeter' },
    'square centimeter': { factor: 0.0001, symbol: 'cm²', name: 'Square Centimeter' },
    'square kilometer': { factor: 1000000, symbol: 'km²', name: 'Square Kilometer' },
    hectare: { factor: 10000, symbol: 'ha', name: 'Hectare' }
  },
  [DIMENSIONS.VOLUME]: {
    'cubic meter': { factor: 1, symbol: 'm³', name: 'Cubic Meter' },
    liter: { factor: 0.001, symbol: 'L', name: 'Liter' },
    milliliter: { factor: 0.000001, symbol: 'mL', name: 'Milliliter' },
    'cubic centimeter': { factor: 0.000001, symbol: 'cm³', name: 'Cubic Centimeter' },
    'cubic millimeter': { factor: 0.000000001, symbol: 'mm³', name: 'Cubic Millimeter' },
    kiloliter: { factor: 1, symbol: 'kL', name: 'Kiloliter' }
  },
  [DIMENSIONS.SPEED]: {
    'meter per second': { factor: 1, symbol: 'm/s', name: 'Meter per Second' },
    'kilometer per hour': { factor: 0.27777777777778, symbol: 'km/h', name: 'Kilometer per Hour' },
    'meter per minute': { factor: 0.016666666666667, symbol: 'm/min', name: 'Meter per Minute' },
    'centimeter per second': { factor: 0.01, symbol: 'cm/s', name: 'Centimeter per Second' }
  },
  [DIMENSIONS.ACCELERATION]: {
    'meter per second squared': { factor: 1, symbol: 'm/s²', name: 'Meter per Second Squared' },
    'kilometer per hour squared': { factor: 0.000077160493827, symbol: 'km/h²', name: 'Kilometer per Hour Squared' },
    'centimeter per second squared': { factor: 0.01, symbol: 'cm/s²', name: 'Centimeter per Second Squared' },
    'standard gravity': { factor: 9.80665, symbol: 'g', name: 'Standard Gravity' }
  },
  [DIMENSIONS.MASS]: {
    kilogram: { factor: 1, symbol: 'kg', name: 'Kilogram' },
    gram: { factor: 0.001, symbol: 'g', name: 'Gram' },
    milligram: { factor: 0.000001, symbol: 'mg', name: 'Milligram' },
    microgram: { factor: 0.000000001, symbol: 'μg', name: 'Microgram' },
    tonne: { factor: 1000, symbol: 't', name: 'Tonne' }
  },
  [DIMENSIONS.FORCE]: {
    newton: { factor: 1, symbol: 'N', name: 'Newton' },
    kilonewton: { factor: 1000, symbol: 'kN', name: 'Kilonewton' },
    millinewton: { factor: 0.001, symbol: 'mN', name: 'Millinewton' },
    dyne: { factor: 0.00001, symbol: 'dyn', name: 'Dyne' }
  },
  [DIMENSIONS.PRESSURE]: {
    pascal: { factor: 1, symbol: 'Pa', name: 'Pascal' },
    kilopascal: { factor: 1000, symbol: 'kPa', name: 'Kilopascal' },
    megapascal: { factor: 1000000, symbol: 'MPa', name: 'Megapascal' },
    bar: { factor: 100000, symbol: 'bar', name: 'Bar' },
    millibar: { factor: 100, symbol: 'mbar', name: 'Millibar' },
    atmosphere: { factor: 101325, symbol: 'atm', name: 'Atmosphere' }
  },
  [DIMENSIONS.ENERGY]: {
    joule: { factor: 1, symbol: 'J', name: 'Joule' },
    kilojoule: { factor: 1000, symbol: 'kJ', name: 'Kilojoule' },
    calorie: { factor: 4.184, symbol: 'cal', name: 'Calorie' },
    kilocalorie: { factor: 4184, symbol: 'kcal', name: 'Kilocalorie' },
    'watt hour': { factor: 3600, symbol: 'Wh', name: 'Watt Hour' },
    'kilowatt hour': { factor: 3600000, symbol: 'kWh', name: 'Kilowatt Hour' }
  },
  [DIMENSIONS.TEMPERATURE]: {
    celsius: { factor: 1, symbol: '°C', name: 'Celsius', offset: 0 },
    kelvin: { factor: 1, symbol: 'K', name: 'Kelvin', offset: -273.15 },
    fahrenheit: { factor: 5/9, symbol: '°F', name: 'Fahrenheit', offset: -32, preOffset: true }
  },
  [DIMENSIONS.FREQUENCY]: {
    hertz: { factor: 1, symbol: 'Hz', name: 'Hertz' },
    kilohertz: { factor: 1000, symbol: 'kHz', name: 'Kilohertz' },
    megahertz: { factor: 1000000, symbol: 'MHz', name: 'Megahertz' },
    gigahertz: { factor: 1000000000, symbol: 'GHz', name: 'Gigahertz' }
  },
  [DIMENSIONS.POWER]: {
    watt: { factor: 1, symbol: 'W', name: 'Watt' },
    kilowatt: { factor: 1000, symbol: 'kW', name: 'Kilowatt' },
    megawatt: { factor: 1000000, symbol: 'MW', name: 'Megawatt' },
    milliwatt: { factor: 0.001, symbol: 'mW', name: 'Milliwatt' },
    horsepower: { factor: 745.699872, symbol: 'hp', name: 'Horsepower' }
  }
};

// US Customary units with their conversion factors to SI base units
export const US_UNITS = {
  [DIMENSIONS.TIME]: {
    second: { factor: 1, symbol: 's', name: 'Second' },
    minute: { factor: 60, symbol: 'min', name: 'Minute' },
    hour: { factor: 3600, symbol: 'hr', name: 'Hour' },
    day: { factor: 86400, symbol: 'day', name: 'Day' },
    week: { factor: 604800, symbol: 'wk', name: 'Week' },
    month: { factor: 2629746, symbol: 'mo', name: 'Month' },
    year: { factor: 31556952, symbol: 'yr', name: 'Year' }
  },
  [DIMENSIONS.LENGTH]: {
    inch: { factor: 0.0254, symbol: 'in', name: 'Inch' },
    foot: { factor: 0.3048, symbol: 'ft', name: 'Foot' },
    yard: { factor: 0.9144, symbol: 'yd', name: 'Yard' },
    mile: { factor: 1609.344, symbol: 'mi', name: 'Mile' },
    'nautical mile': { factor: 1852, symbol: 'nmi', name: 'Nautical Mile' },
    thou: { factor: 0.0000254, symbol: 'th', name: 'Thou' }
  },
  [DIMENSIONS.AREA]: {
    'square inch': { factor: 0.00064516, symbol: 'in²', name: 'Square Inch' },
    'square foot': { factor: 0.09290304, symbol: 'ft²', name: 'Square Foot' },
    'square yard': { factor: 0.83612736, symbol: 'yd²', name: 'Square Yard' },
    'square mile': { factor: 2589988.110336, symbol: 'mi²', name: 'Square Mile' },
    acre: { factor: 4046.8564224, symbol: 'ac', name: 'Acre' }
  },
  [DIMENSIONS.VOLUME]: {
    'fluid ounce': { factor: 0.0000295735, symbol: 'fl oz', name: 'Fluid Ounce' },
    cup: { factor: 0.000236588, symbol: 'cup', name: 'Cup' },
    pint: { factor: 0.000473176, symbol: 'pt', name: 'Pint' },
    quart: { factor: 0.000946353, symbol: 'qt', name: 'Quart' },
    gallon: { factor: 0.00378541, symbol: 'gal', name: 'Gallon' },
    'cubic inch': { factor: 0.000016387064, symbol: 'in³', name: 'Cubic Inch' },
    'cubic foot': { factor: 0.028316846592, symbol: 'ft³', name: 'Cubic Foot' },
    'cubic yard': { factor: 0.764554857984, symbol: 'yd³', name: 'Cubic Yard' },
    tablespoon: { factor: 0.0000147868, symbol: 'tbsp', name: 'Tablespoon' },
    teaspoon: { factor: 0.00000492892, symbol: 'tsp', name: 'Teaspoon' }
  },
  [DIMENSIONS.SPEED]: {
    'feet per second': { factor: 0.3048, symbol: 'ft/s', name: 'Feet per Second' },
    'miles per hour': { factor: 0.44704, symbol: 'mph', name: 'Miles per Hour' },
    'inches per second': { factor: 0.0254, symbol: 'in/s', name: 'Inches per Second' },
    knot: { factor: 0.514444, symbol: 'kn', name: 'Knot' }
  },
  [DIMENSIONS.ACCELERATION]: {
    'feet per second squared': { factor: 0.3048, symbol: 'ft/s²', name: 'Feet per Second Squared' },
    'inches per second squared': { factor: 0.0254, symbol: 'in/s²', name: 'Inches per Second Squared' },
    'standard gravity': { factor: 9.80665, symbol: 'g', name: 'Standard Gravity' }
  },
  [DIMENSIONS.MASS]: {
    ounce: { factor: 0.0283495, symbol: 'oz', name: 'Ounce' },
    pound: { factor: 0.453592, symbol: 'lb', name: 'Pound' },
    stone: { factor: 6.35029, symbol: 'st', name: 'Stone' },
    'short ton': { factor: 907.185, symbol: 'ton', name: 'Short Ton' },
    'long ton': { factor: 1016.05, symbol: 'long ton', name: 'Long Ton' },
    grain: { factor: 0.0000647989, symbol: 'gr', name: 'Grain' }
  },
  [DIMENSIONS.FORCE]: {
    'pound-force': { factor: 4.44822, symbol: 'lbf', name: 'Pound-Force' },
    'ounce-force': { factor: 0.278014, symbol: 'ozf', name: 'Ounce-Force' },
    kip: { factor: 4448.22, symbol: 'kip', name: 'Kip' }
  },
  [DIMENSIONS.PRESSURE]: {
    'pounds per square inch': { factor: 6894.76, symbol: 'psi', name: 'Pounds per Square Inch' },
    'pounds per square foot': { factor: 47.8803, symbol: 'psf', name: 'Pounds per Square Foot' },
    'inches of mercury': { factor: 3386.39, symbol: 'inHg', name: 'Inches of Mercury' },
    'millimeters of mercury': { factor: 133.322, symbol: 'mmHg', name: 'Millimeters of Mercury' }
  },
  [DIMENSIONS.ENERGY]: {
    'British thermal unit': { factor: 1055.06, symbol: 'BTU', name: 'British Thermal Unit' },
    'foot-pound': { factor: 1.35582, symbol: 'ft⋅lb', name: 'Foot-Pound' },
    'calorie (thermochemical)': { factor: 4.184, symbol: 'cal', name: 'Calorie' },
    therm: { factor: 105505585.262, symbol: 'thm', name: 'Therm' }
  },
  [DIMENSIONS.TEMPERATURE]: {
    fahrenheit: { factor: 5/9, symbol: '°F', name: 'Fahrenheit', offset: -32, preOffset: true },
    rankine: { factor: 5/9, symbol: '°R', name: 'Rankine', offset: -273.15 },
    celsius: { factor: 1, symbol: '°C', name: 'Celsius', offset: 0 }
  },
  [DIMENSIONS.FREQUENCY]: {
    hertz: { factor: 1, symbol: 'Hz', name: 'Hertz' },
    'revolutions per minute': { factor: 0.0166667, symbol: 'rpm', name: 'Revolutions per Minute' },
    'cycles per second': { factor: 1, symbol: 'cps', name: 'Cycles per Second' }
  },
  [DIMENSIONS.POWER]: {
    horsepower: { factor: 745.699872, symbol: 'hp', name: 'Horsepower' },
    'foot-pounds per second': { factor: 1.35582, symbol: 'ft⋅lb/s', name: 'Foot-Pounds per Second' },
    'British thermal units per hour': { factor: 0.293071, symbol: 'BTU/h', name: 'BTU per Hour' },
    watt: { factor: 1, symbol: 'W', name: 'Watt' }
  }
};

// Seximal base conversion factors to their corresponding SI or US units
export const SEXIMAL_BASE_CONVERSIONS = {
  [DIMENSIONS.TIME]: {
    instant: { toSI: 0.07716, symbol: 'inst', name: 'Instant' } // to seconds
  },
  [DIMENSIONS.LENGTH]: {
    thumb: { toUS: 2.29867, toUSUnit: 'inch', symbol: 'thm', name: 'Thumb' } // to inches
  },
  [DIMENSIONS.AREA]: {
    bock: { toUS: 5.28388, toUSUnit: 'square inch', symbol: 'bck', name: 'Bock' } // to square inches
  },
  [DIMENSIONS.VOLUME]: {
    fill: { toSI: 0.0001990345, symbol: 'fl', name: 'Fill' } // to cubic meters (199.0345 mL)
  },
  [DIMENSIONS.SPEED]: {
    rapid: { toSI: 0.75668, symbol: 'rpd', name: 'Rapid' } // to m/s
  },
  [DIMENSIONS.ACCELERATION]: {
    grav: { toSI: 9.80664, symbol: 'grv', name: 'Grav' } // to m/s²
  },
  [DIMENSIONS.MASS]: {
    heft: { toSI: 0.1990345, symbol: 'hft', name: 'Heft' } // to kg (199.0345 g)
  },
  [DIMENSIONS.FORCE]: {
    fort: { toSI: 1.95186, symbol: 'frt', name: 'Fort' } // to N
  },
  [DIMENSIONS.PRESSURE]: {
    presh: { toUS: 0.08304, toUSUnit: 'pounds per square inch', symbol: 'prsh', name: 'Presh' } // to psi
  },
  [DIMENSIONS.ENERGY]: {
    nerg: { toSI: 0.11396, symbol: 'nrg', name: 'Nerg' } // to J
  },
  [DIMENSIONS.TEMPERATURE]: {
    celce: { toSI: 1, symbol: '°Ce', name: 'Celce', offset: 0 } // same as Celsius
  },
  [DIMENSIONS.FREQUENCY]: {
    freckle: { toSI: 12.96, symbol: 'frk', name: 'Freckle' } // to Hz
  },
  [DIMENSIONS.POWER]: {
    pow: { toSI: 1.47694, symbol: 'pw', name: 'Pow' } // to W
  }
};

// Seximal prefixes (powers of 6)
export const SEXIMAL_PREFIXES = {
  'nifa': { power: 2, factor: 36 }, // 6^2
  'kila': { power: 4, factor: 1296 }, // 6^4
  'mega': { power: 8, factor: 1679616 }, // 6^8
  'giga': { power: 12, factor: 2176782336 }, // 6^12
  'tera': { power: 16, factor: 2821109907456 }, // 6^16
  'peta': { power: 20, factor: 3656158440062976 }, // 6^20
  'exa': { power: 24, factor: 4738381338321616896 }, // 6^24
  'nivi': { power: -2, factor: 1/36 }, // 6^-2
  'milli': { power: -4, factor: 1/1296 }, // 6^-4
  'micro': { power: -8, factor: 1/1679616 }, // 6^-8
  'nano': { power: -12, factor: 1/2176782336 }, // 6^-12
  'pico': { power: -16, factor: 1/2821109907456 } // 6^-16
};