// Seximal (base-6) number system conversion utilities

/**
 * Convert decimal number to seximal (base-6) string
 * @param {number} decimal - The decimal number to convert
 * @param {number} precision - Number of decimal places for fractional part
 * @returns {string} Seximal representation
 */
export function decimalToSeximal(decimal, precision = 6) {
  if (decimal === 0) return '0';
  
  const isNegative = decimal < 0;
  decimal = Math.abs(decimal);
  
  // Split into integer and fractional parts
  const integerPart = Math.floor(decimal);
  const fractionalPart = decimal - integerPart;
  
  // Convert integer part
  let integerSeximal = '';
  let temp = integerPart;
  
  if (temp === 0) {
    integerSeximal = '0';
  } else {
    while (temp > 0) {
      integerSeximal = (temp % 6).toString() + integerSeximal;
      temp = Math.floor(temp / 6);
    }
  }
  
  // Convert fractional part
  let fractionalSeximal = '';
  let frac = fractionalPart;
  let count = 0;
  
  while (frac > 0 && count < precision) {
    frac *= 6;
    const digit = Math.floor(frac);
    fractionalSeximal += digit.toString();
    frac -= digit;
    count++;
  }
  
  // Remove trailing zeros from fractional part
  fractionalSeximal = fractionalSeximal.replace(/0+$/, '');
  
  // Combine parts
  let result = integerSeximal;
  if (fractionalSeximal.length > 0) {
    result += '.' + fractionalSeximal;
  }
  
  return (isNegative ? '-' : '') + result;
}

/**
 * Convert seximal (base-6) string to decimal number
 * @param {string} seximal - The seximal string to convert
 * @returns {number} Decimal representation
 */
export function seximalToDecimal(seximal) {
  if (!seximal || seximal === '0') return 0;
  
  const isNegative = seximal.startsWith('-');
  const cleanSeximal = seximal.replace(/^-/, '');
  
  // Split into integer and fractional parts
  const parts = cleanSeximal.split('.');
  const integerPart = parts[0] || '0';
  const fractionalPart = parts[1] || '';
  
  // Convert integer part
  let decimal = 0;
  for (let i = 0; i < integerPart.length; i++) {
    const digit = parseInt(integerPart[i]);
    if (digit >= 6) {
      throw new Error(`Invalid seximal digit: ${digit}. Seximal uses only digits 0-5.`);
    }
    decimal += digit * Math.pow(6, integerPart.length - 1 - i);
  }
  
  // Convert fractional part
  for (let i = 0; i < fractionalPart.length; i++) {
    const digit = parseInt(fractionalPart[i]);
    if (digit >= 6) {
      throw new Error(`Invalid seximal digit: ${digit}. Seximal uses only digits 0-5.`);
    }
    decimal += digit * Math.pow(6, -(i + 1));
  }
  
  return isNegative ? -decimal : decimal;
}

/**
 * Validate if a string is a valid seximal number
 * @param {string} seximal - The string to validate
 * @returns {boolean} True if valid seximal number
 */
export function isValidSeximal(seximal) {
  if (!seximal) return false;
  
  // Remove optional negative sign
  const cleanSeximal = seximal.replace(/^-/, '');
  
  // Check if it matches seximal pattern (only digits 0-5, optional decimal point)
  const seximalPattern = /^[0-5]+(\.[0-5]+)?$/;
  return seximalPattern.test(cleanSeximal);
}

/**
 * Format a seximal number with proper notation
 * @param {string} seximal - The seximal number string
 * @param {number} precision - Number of decimal places
 * @returns {string} Formatted seximal number
 */
export function formatSeximal(seximal, precision = 6) {
  if (!seximal) return '0';
  
  const decimal = seximalToDecimal(seximal);
  return decimalToSeximal(decimal, precision);
}

/**
 * Parse a seximal input that might include prefixes
 * @param {string} input - Input string that might have seximal prefixes
 * @returns {object} Object with base value and prefix info
 */
export function parseSeximalWithPrefix(input) {
  const prefixPattern = /^(nifa|kila|mega|giga|tera|peta|exa|nivi|milli|micro|nano|pico)-?(.*)$/i;
  const match = input.match(prefixPattern);
  
  if (match) {
    return {
      prefix: match[1].toLowerCase(),
      value: match[2],
      hasPrefix: true
    };
  }
  
  return {
    prefix: null,
    value: input,
    hasPrefix: false
  };
}

/**
 * Apply seximal prefix to a base value (convert FROM prefixed unit TO base unit)
 * @param {number} prefixedValue - The value in prefixed units
 * @param {string} prefix - The seximal prefix
 * @returns {number} Value in base units
 */
export function applySeximalPrefix(prefixedValue, prefix) {
  const prefixes = {
    'nifa': 36, // 6^2
    'kila': 1296, // 6^4
    'mega': 1679616, // 6^8
    'giga': 2176782336, // 6^12
    'tera': 2821109907456, // 6^16
    'peta': 3656158440062976, // 6^20
    'exa': 4738381338321616896, // 6^24
    'nivi': 1/36, // 6^-2
    'milli': 1/1296, // 6^-4
    'micro': 1/1679616, // 6^-8
    'nano': 1/2176782336, // 6^-12
    'pico': 1/2821109907456 // 6^-16
  };
  
  const factor = prefixes[prefix.toLowerCase()];
  return factor ? prefixedValue * factor : prefixedValue;
}

/**
 * Remove seximal prefix from a base value to get prefixed value (convert FROM base unit TO prefixed unit)
 * @param {number} baseValue - The value in base units
 * @param {string} prefix - The seximal prefix
 * @returns {number} Value in prefixed units
 */
export function removeSeximalPrefix(baseValue, prefix) {
  const prefixes = {
    'nifa': 36, // 6^2
    'kila': 1296, // 6^4
    'mega': 1679616, // 6^8
    'giga': 2176782336, // 6^12
    'tera': 2821109907456, // 6^16
    'peta': 3656158440062976, // 6^20
    'exa': 4738381338321616896, // 6^24
    'nivi': 1/36, // 6^-2
    'milli': 1/1296, // 6^-4
    'micro': 1/1679616, // 6^-8
    'nano': 1/2176782336, // 6^-12
    'pico': 1/2821109907456 // 6^-16
  };
  
  const factor = prefixes[prefix.toLowerCase()];
  return factor ? baseValue / factor : baseValue;
}