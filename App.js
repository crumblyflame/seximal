import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import DimensionSelector from './components/DimensionSelector.js';
import ConversionPanel from './components/ConversionPanel.js';
import UnitSelector from './components/UnitSelector.js';
import { 
  DIMENSIONS, 
  MEASUREMENT_SYSTEMS, 
  convertValue, 
  getDefaultUnit
} from './utils/conversionEngine.js';
import {
  decimalToSeximal,
  seximalToDecimal,
  isValidSeximal
} from './utils/seximalMath.js';

export default function App() {
  // State management
  const [selectedDimension, setSelectedDimension] = useState(DIMENSIONS.LENGTH);
  const [activePanel, setActivePanel] = useState(MEASUREMENT_SYSTEMS.SI);
  const [unitSelectorVisible, setUnitSelectorVisible] = useState(false);
  const [unitSelectorSystem, setUnitSelectorSystem] = useState(null);
  
  // Unit selections for each system
  const [selectedUnits, setSelectedUnits] = useState({
    [MEASUREMENT_SYSTEMS.SI]: {},
    [MEASUREMENT_SYSTEMS.US]: {},
    [MEASUREMENT_SYSTEMS.SEXIMAL]: {}
  });
  
  // Values for each system
  const [values, setValues] = useState({
    [MEASUREMENT_SYSTEMS.SI]: '',
    [MEASUREMENT_SYSTEMS.US]: '',
    [MEASUREMENT_SYSTEMS.SEXIMAL]: ''
  });

  // Initialize default units when dimension changes
  useEffect(() => {
    const newUnits = {
      [MEASUREMENT_SYSTEMS.SI]: getDefaultUnit(selectedDimension, MEASUREMENT_SYSTEMS.SI),
      [MEASUREMENT_SYSTEMS.US]: getDefaultUnit(selectedDimension, MEASUREMENT_SYSTEMS.US),
      [MEASUREMENT_SYSTEMS.SEXIMAL]: getDefaultUnit(selectedDimension, MEASUREMENT_SYSTEMS.SEXIMAL)
    };
    
    setSelectedUnits(prev => ({
      ...prev,
      [MEASUREMENT_SYSTEMS.SI]: {
        ...prev[MEASUREMENT_SYSTEMS.SI],
        [selectedDimension]: newUnits[MEASUREMENT_SYSTEMS.SI]
      },
      [MEASUREMENT_SYSTEMS.US]: {
        ...prev[MEASUREMENT_SYSTEMS.US],
        [selectedDimension]: newUnits[MEASUREMENT_SYSTEMS.US]
      },
      [MEASUREMENT_SYSTEMS.SEXIMAL]: {
        ...prev[MEASUREMENT_SYSTEMS.SEXIMAL],
        [selectedDimension]: newUnits[MEASUREMENT_SYSTEMS.SEXIMAL]
      }
    }));
    
    // Clear values when dimension changes
    setValues({
      [MEASUREMENT_SYSTEMS.SI]: '',
      [MEASUREMENT_SYSTEMS.US]: '',
      [MEASUREMENT_SYSTEMS.SEXIMAL]: ''
    });
  }, [selectedDimension]);

  // Convert values between systems with optional custom units
  const convertAndUpdateValuesWithUnits = (sourceSystem, newValue, customUnits = null) => {
    const unitsToUse = customUnits || selectedUnits;
    if (!newValue || newValue === '') {
      setValues({
        [MEASUREMENT_SYSTEMS.SI]: '',
        [MEASUREMENT_SYSTEMS.US]: '',
        [MEASUREMENT_SYSTEMS.SEXIMAL]: ''
      });
      return;
    }

    const newValues = { ...values };
    newValues[sourceSystem] = newValue;

    try {
      let sourceValueDecimal = newValue;
      
      // Convert seximal to decimal if source is seximal
      if (sourceSystem === MEASUREMENT_SYSTEMS.SEXIMAL) {
        if (!isValidSeximal(newValue)) {
          // If invalid seximal, only update the source field
          setValues(newValues);
          return;
        }
        sourceValueDecimal = seximalToDecimal(newValue);
      } else {
        sourceValueDecimal = parseFloat(newValue);
        if (isNaN(sourceValueDecimal)) {
          // If invalid number, only update the source field
          setValues(newValues);
          return;
        }
      }

      const sourceUnit = unitsToUse[sourceSystem][selectedDimension];
      
      // Convert to other systems
      Object.values(MEASUREMENT_SYSTEMS).forEach(targetSystem => {
        if (targetSystem !== sourceSystem) {
          const targetUnit = unitsToUse[targetSystem][selectedDimension];
          
          if (sourceUnit && targetUnit) {
            try {
              const convertedValue = convertValue(
                sourceValueDecimal,
                selectedDimension,
                sourceUnit,
                sourceSystem,
                targetUnit,
                targetSystem
              );
              
              // Format the result based on target system
              if (targetSystem === MEASUREMENT_SYSTEMS.SEXIMAL) {
                newValues[targetSystem] = decimalToSeximal(convertedValue, 6);
              } else {
                // Format to reasonable decimal places
                const formatted = convertedValue.toPrecision(8);
                const cleaned = parseFloat(formatted).toString();
                newValues[targetSystem] = cleaned;
              }
            } catch (error) {
              console.warn(`Conversion error: ${error.message}`);
              newValues[targetSystem] = 'Error';
            }
          }
        }
      });
    } catch (error) {
      console.warn(`Value processing error: ${error.message}`);
    }

    setValues(newValues);
  };

  // Convert values between systems (wrapper for backward compatibility)
  const convertAndUpdateValues = (sourceSystem, newValue) => {
    convertAndUpdateValuesWithUnits(sourceSystem, newValue, null);
  };

  const handleValueChange = (system, newValue) => {
    setActivePanel(system);
    convertAndUpdateValues(system, newValue);
  };

  const handleUnitChange = (system) => {
    setUnitSelectorSystem(system);
    setUnitSelectorVisible(true);
  };

  const handleUnitSelect = (system, unit) => {
    const newSelectedUnits = {
      ...selectedUnits,
      [system]: {
        ...selectedUnits[system],
        [selectedDimension]: unit
      }
    };
    
    setSelectedUnits(newSelectedUnits);
    
    // Re-convert with new unit if there's an active value
    const activeValue = values[activePanel];
    if (activeValue && activeValue !== '') {
      // Use the updated units for conversion
      const sourceUnit = newSelectedUnits[activePanel][selectedDimension];
      convertAndUpdateValuesWithUnits(activePanel, activeValue, newSelectedUnits);
    }
  };

  const getCurrentUnit = (system) => {
    if (!system || !selectedUnits[system]) {
      return getDefaultUnit(selectedDimension, system);
    }
    return selectedUnits[system][selectedDimension] || getDefaultUnit(selectedDimension, system);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f7" />
      
      <DimensionSelector
        selectedDimension={selectedDimension}
        onDimensionChange={setSelectedDimension}
      />
      
      <View style={styles.panelsContainer}>
        <ConversionPanel
          system={MEASUREMENT_SYSTEMS.SI}
          dimension={selectedDimension}
          selectedUnit={getCurrentUnit(MEASUREMENT_SYSTEMS.SI)}
          value={values[MEASUREMENT_SYSTEMS.SI]}
          isActive={activePanel === MEASUREMENT_SYSTEMS.SI}
          onUnitChange={() => handleUnitChange(MEASUREMENT_SYSTEMS.SI)}
          onValueChange={(value) => handleValueChange(MEASUREMENT_SYSTEMS.SI, value)}
          onPanelPress={() => setActivePanel(MEASUREMENT_SYSTEMS.SI)}
        />
        
        <ConversionPanel
          system={MEASUREMENT_SYSTEMS.US}
          dimension={selectedDimension}
          selectedUnit={getCurrentUnit(MEASUREMENT_SYSTEMS.US)}
          value={values[MEASUREMENT_SYSTEMS.US]}
          isActive={activePanel === MEASUREMENT_SYSTEMS.US}
          onUnitChange={() => handleUnitChange(MEASUREMENT_SYSTEMS.US)}
          onValueChange={(value) => handleValueChange(MEASUREMENT_SYSTEMS.US, value)}
          onPanelPress={() => setActivePanel(MEASUREMENT_SYSTEMS.US)}
        />
        
        <ConversionPanel
          system={MEASUREMENT_SYSTEMS.SEXIMAL}
          dimension={selectedDimension}
          selectedUnit={getCurrentUnit(MEASUREMENT_SYSTEMS.SEXIMAL)}
          value={values[MEASUREMENT_SYSTEMS.SEXIMAL]}
          isActive={activePanel === MEASUREMENT_SYSTEMS.SEXIMAL}
          onUnitChange={() => handleUnitChange(MEASUREMENT_SYSTEMS.SEXIMAL)}
          onValueChange={(value) => handleValueChange(MEASUREMENT_SYSTEMS.SEXIMAL, value)}
          onPanelPress={() => setActivePanel(MEASUREMENT_SYSTEMS.SEXIMAL)}
        />
      </View>
      
      {unitSelectorVisible && unitSelectorSystem && (
        <UnitSelector
          visible={unitSelectorVisible}
          onClose={() => setUnitSelectorVisible(false)}
          system={unitSelectorSystem}
          dimension={selectedDimension}
          selectedUnit={getCurrentUnit(unitSelectorSystem)}
          onUnitSelect={(unit) => handleUnitSelect(unitSelectorSystem, unit)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  panelsContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
});