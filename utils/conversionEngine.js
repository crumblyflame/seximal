import { 
  DIMENSIONS, 
  SI_UNITS, 
  US_UNITS, 
  SEXIMAL_BASE_CONVERSIONS,
  SEXIMAL_PREFIXES 
} from './conversionData.js';
import { 
  decimalToSeximal, 
  seximalToDecimal, 
  isValidSeximal,
  parseSeximalWithPrefix,
  applySeximalPrefix,
  removeSeximalPrefix
} from './seximalMath.js';

export const MEASUREMENT_SYSTEMS = {
  SI: 'SI',
  US: 'US Customary',
  SEXIMAL: 'Seximal'
};

/**
 * Get all available units for a specific dimension and measurement system
 * @param {string} dimension - The dimension (e.g., DIMENSIONS.LENGTH)
 * @param {string} system - The measurement system (SI, US, SEXIMAL)
 * @returns {object} Object containing unit data
 */
export function getUnitsForDimension(dimension, system) {
  switch (system) {
    case MEASUREMENT_SYSTEMS.SI:
      return SI_UNITS[dimension] || {};
    case MEASUREMENT_SYSTEMS.US:
      return US_UNITS[dimension] || {};
    case MEASUREMENT_SYSTEMS.SEXIMAL:
      const baseUnit = SEXIMAL_BASE_CONVERSIONS[dimension];
      if (!baseUnit) return {};
      
      // Generate all seximal units with prefixes
      const seximalUnits = {};
      const baseKey = Object.keys(baseUnit)[0];
      const baseData = baseUnit[baseKey];
      
      // Add base unit
      seximalUnits[baseKey] = {
        ...baseData,
        factor: 1,
        name: baseData.name
      };
      
      // Add prefixed units
      Object.entries(SEXIMAL_PREFIXES).forEach(([prefix, prefixData]) => {
        const prefixedKey = `${prefix}-${baseKey}`;
        seximalUnits[prefixedKey] = {
          ...baseData,
          factor: prefixData.factor,
          symbol: `${prefix}${baseData.symbol}`,
          name: `${prefix.charAt(0).toUpperCase() + prefix.slice(1)}-${baseData.name}`,
          prefix: prefix
        };
      });
      
      return seximalUnits;
    default:
      return {};
  }
}

/**
 * Convert a value to the base SI unit for a given dimension
 * @param {number} value - The value to convert
 * @param {string} dimension - The dimension
 * @param {string} fromUnit - The unit to convert from
 * @param {string} system - The measurement system
 * @returns {number} Value in base SI unit
 */
function convertToSIBase(value, dimension, fromUnit, system) {
  if (system === MEASUREMENT_SYSTEMS.SI) {
    const unit = SI_UNITS[dimension][fromUnit];
    if (!unit) throw new Error(`Unknown SI unit: ${fromUnit}`);
    
    // Handle temperature conversions with offsets
    if (dimension === DIMENSIONS.TEMPERATURE && unit.offset !== undefined) {
      if (unit.preOffset) {
        // For Fahrenheit: convert to Celsius first, then to base
        return (value + unit.offset) * unit.factor;
      } else {
        // For Kelvin: apply factor first, then offset
        return value * unit.factor + unit.offset;
      }
    }
    
    return value * unit.factor;
  }
  
  if (system === MEASUREMENT_SYSTEMS.US) {
    const unit = US_UNITS[dimension][fromUnit];
    if (!unit) throw new Error(`Unknown US unit: ${fromUnit}`);
    
    // Handle temperature conversions with offsets
    if (dimension === DIMENSIONS.TEMPERATURE && unit.offset !== undefined) {
      if (unit.preOffset) {
        // For Fahrenheit: apply offset first, then factor
        return (value + unit.offset) * unit.factor;
      } else {
        // Apply factor first, then offset
        return value * unit.factor + unit.offset;
      }
    }
    
    return value * unit.factor;
  }
  
  if (system === MEASUREMENT_SYSTEMS.SEXIMAL) {
    const baseConversion = SEXIMAL_BASE_CONVERSIONS[dimension];
    if (!baseConversion) throw new Error(`No seximal conversion for dimension: ${dimension}`);
    
    const baseKey = Object.keys(baseConversion)[0];
    const baseData = baseConversion[baseKey];
    
    // Parse unit to check for prefix
    const parsedUnit = parseSeximalWithPrefix(fromUnit);
    let baseValue = value;
    
    // If it has a prefix, convert to base unit value (multiply by prefix factor)
    if (parsedUnit.hasPrefix) {
      baseValue = applySeximalPrefix(value, parsedUnit.prefix);
    }
    
    // Handle temperature (same as Celsius)
    if (dimension === DIMENSIONS.TEMPERATURE) {
      return baseValue; // Celce is 1:1 with Celsius
    }
    
    // Convert from seximal base to SI
    if (baseData.toSI) {
      return baseValue * baseData.toSI;
    }
    
    // Convert through US unit if specified
    if (baseData.toUS && baseData.toUSUnit) {
      const usValue = baseValue * baseData.toUS;
      return convertToSIBase(usValue, dimension, baseData.toUSUnit, MEASUREMENT_SYSTEMS.US);
    }
    
    throw new Error(`Invalid seximal conversion data for dimension: ${dimension}`);
  }
  
  throw new Error(`Unknown measurement system: ${system}`);
}

/**
 * Convert a value from the base SI unit to a target unit in any system
 * @param {number} siValue - Value in base SI unit
 * @param {string} dimension - The dimension
 * @param {string} toUnit - The unit to convert to
 * @param {string} system - The measurement system
 * @returns {number} Converted value
 */
function convertFromSIBase(siValue, dimension, toUnit, system) {
  if (system === MEASUREMENT_SYSTEMS.SI) {
    const unit = SI_UNITS[dimension][toUnit];
    if (!unit) throw new Error(`Unknown SI unit: ${toUnit}`);
    
    // Handle temperature conversions with offsets
    if (dimension === DIMENSIONS.TEMPERATURE && unit.offset !== undefined) {
      if (unit.preOffset) {
        // For Fahrenheit: convert from Celsius, then apply offset
        return (siValue / unit.factor) - unit.offset;
      } else {
        // For Kelvin: apply offset first, then factor
        return (siValue - unit.offset) / unit.factor;
      }
    }
    
    return siValue / unit.factor;
  }
  
  if (system === MEASUREMENT_SYSTEMS.US) {
    const unit = US_UNITS[dimension][toUnit];
    if (!unit) throw new Error(`Unknown US unit: ${toUnit}`);
    
    // Handle temperature conversions with offsets
    if (dimension === DIMENSIONS.TEMPERATURE && unit.offset !== undefined) {
      if (unit.preOffset) {
        // For Fahrenheit: apply factor first, then offset
        return (siValue / unit.factor) - unit.offset;
      } else {
        // Apply factor first, then offset
        return (siValue - unit.offset) / unit.factor;
      }
    }
    
    return siValue / unit.factor;
  }
  
  if (system === MEASUREMENT_SYSTEMS.SEXIMAL) {
    const baseConversion = SEXIMAL_BASE_CONVERSIONS[dimension];
    if (!baseConversion) throw new Error(`No seximal conversion for dimension: ${dimension}`);
    
    const baseKey = Object.keys(baseConversion)[0];
    const baseData = baseConversion[baseKey];
    
    // Parse unit to check for prefix
    const parsedUnit = parseSeximalWithPrefix(toUnit);
    let baseValue;
    
    // Handle temperature (same as Celsius)
    if (dimension === DIMENSIONS.TEMPERATURE) {
      baseValue = siValue; // Celce is 1:1 with Celsius
    }
    // Convert from SI to seximal base
    else if (baseData.toSI) {
      baseValue = siValue / baseData.toSI;
    }
    // Convert through US unit if specified
    else if (baseData.toUS && baseData.toUSUnit) {
      const usValue = convertFromSIBase(siValue, dimension, baseData.toUSUnit, MEASUREMENT_SYSTEMS.US);
      baseValue = usValue / baseData.toUS;
    } else {
      throw new Error(`Invalid seximal conversion data for dimension: ${dimension}`);
    }
    
    // If it has a prefix, convert from base value to prefixed value (divide by prefix factor)
    if (parsedUnit.hasPrefix) {
      return removeSeximalPrefix(baseValue, parsedUnit.prefix);
    }
    
    return baseValue;
  }
  
  throw new Error(`Unknown measurement system: ${system}`);
}

/**
 * Convert a value between any two units across any measurement systems
 * @param {number} value - The value to convert
 * @param {string} dimension - The dimension
 * @param {string} fromUnit - The unit to convert from
 * @param {string} fromSystem - The source measurement system
 * @param {string} toUnit - The unit to convert to
 * @param {string} toSystem - The target measurement system
 * @returns {number} Converted value
 */
export function convertValue(value, dimension, fromUnit, fromSystem, toUnit, toSystem) {
  try {
    // Convert to SI base first
    const siValue = convertToSIBase(value, dimension, fromUnit, fromSystem);
    
    // Convert from SI base to target unit
    const result = convertFromSIBase(siValue, dimension, toUnit, toSystem);
    
    return result;
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}

/**
 * Get the default unit for a dimension in a specific measurement system
 * @param {string} dimension - The dimension
 * @param {string} system - The measurement system
 * @returns {string} Default unit name
 */
export function getDefaultUnit(dimension, system) {
  const units = getUnitsForDimension(dimension, system);
  const unitKeys = Object.keys(units);
  
  if (unitKeys.length === 0) return null;
  
  // Return the first unit as default (they are ordered sensibly in the data)
  return unitKeys[0];
}

/**
 * Convert between decimal and seximal number representations
 * @param {string|number} value - The value to convert
 * @param {string} fromBase - 'decimal' or 'seximal'
 * @param {string} toBase - 'decimal' or 'seximal'
 * @param {number} precision - Precision for seximal conversion
 * @returns {string|number} Converted value
 */
export function convertBase(value, fromBase, toBase, precision = 6) {
  if (fromBase === toBase) return value;
  
  if (fromBase === 'decimal' && toBase === 'seximal') {
    return decimalToSeximal(Number(value), precision);
  }
  
  if (fromBase === 'seximal' && toBase === 'decimal') {
    if (!isValidSeximal(String(value))) {
      throw new Error('Invalid seximal number');
    }
    return seximalToDecimal(String(value));
  }
  
  throw new Error(`Invalid base conversion: ${fromBase} to ${toBase}`);
}

/**
 * Get all dimensions available for conversion
 * @returns {Array} Array of dimension objects
 */
export function getAllDimensions() {
  return Object.entries(DIMENSIONS).map(([key, name]) => ({
    key,
    name,
    id: key
  }));
}

/**
 * Validate if a unit exists in a specific system and dimension
 * @param {string} dimension - The dimension
 * @param {string} system - The measurement system
 * @param {string} unit - The unit to validate
 * @returns {boolean} True if unit exists
 */
export function isValidUnit(dimension, system, unit) {
  const units = getUnitsForDimension(dimension, system);
  return Object.hasOwnProperty.call(units, unit);
}