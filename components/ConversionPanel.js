import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getUnitsForDimension, MEASUREMENT_SYSTEMS } from '../utils/conversionEngine.js';

const ConversionPanel = ({ 
  system, 
  dimension, 
  selectedUnit, 
  value, 
  isActive,
  onUnitChange, 
  onValueChange,
  onPanelPress 
}) => {
  const units = getUnitsForDimension(dimension, system);
  const unitKeys = Object.keys(units);
  const currentUnit = units[selectedUnit] || units[unitKeys[0]];

  const getSystemColor = () => {
    switch (system) {
      case MEASUREMENT_SYSTEMS.SI:
        return '#28a745';
      case MEASUREMENT_SYSTEMS.US:
        return '#dc3545';
      case MEASUREMENT_SYSTEMS.SEXIMAL:
        return '#6f42c1';
      default:
        return '#6c757d';
    }
  };

  const getSystemName = () => {
    switch (system) {
      case MEASUREMENT_SYSTEMS.SI:
        return 'SI (Metric)';
      case MEASUREMENT_SYSTEMS.US:
        return 'US Customary';
      case MEASUREMENT_SYSTEMS.SEXIMAL:
        return 'Seximal (Base-6)';
      default:
        return system;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { borderLeftColor: getSystemColor() },
        isActive && styles.activeContainer
      ]}
      onPress={onPanelPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={[styles.systemName, { color: getSystemColor() }]}>
          {getSystemName()}
        </Text>
        <TouchableOpacity 
          style={[styles.unitSelector, { borderColor: getSystemColor() }]}
          onPress={onUnitChange}
        >
          <Text style={[styles.unitText, { color: getSystemColor() }]}>
            {currentUnit?.symbol || selectedUnit}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            isActive && { borderColor: getSystemColor(), borderWidth: 2 }
          ]}
          value={value}
          onChangeText={onValueChange}
          placeholder="Enter value"
          keyboardType="numeric"
          returnKeyType="done"
        />
        <Text style={styles.unitName}>
          {currentUnit?.name || selectedUnit}
        </Text>
      </View>
      
      {system === MEASUREMENT_SYSTEMS.SEXIMAL && (
        <View style={styles.seximalInfo}>
          <Text style={styles.seximalNote}>
            Base-6 number system (digits 0-5)
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeContainer: {
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#6c757d',
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    fontSize: 24,
    fontWeight: '400',
    padding: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    marginBottom: 8,
  },
  unitName: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
  seximalInfo: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f8f4ff',
    borderRadius: 6,
  },
  seximalNote: {
    fontSize: 11,
    color: '#6f42c1',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ConversionPanel;