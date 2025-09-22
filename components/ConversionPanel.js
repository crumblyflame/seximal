import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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
        return '#34c759';
      case MEASUREMENT_SYSTEMS.US:
        return '#ff3b30';
      case MEASUREMENT_SYSTEMS.SEXIMAL:
        return '#af52de';
      default:
        return '#8e8e93';
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
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderLeftWidth: 4,
    padding: 20,
    ...Platform.select({
      web: { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {},
    }),
    elevation: 3,
  },
  activeContainer: {
    ...Platform.select({
      web: { boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)' },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: { elevation: 5 },
    }),
    transform: [{ scale: 1.02 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemName: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    letterSpacing: -0.2,
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f2f2f7',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#8e8e93',
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    fontSize: 28,
    fontWeight: '300',
    padding: 16,
    borderWidth: 1,
    borderColor: '#d1d1d6',
    borderRadius: 12,
    backgroundColor: '#f2f2f7',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  unitName: {
    fontSize: 13,
    color: '#8e8e93',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  seximalInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f3ff',
    borderRadius: 10,
  },
  seximalNote: {
    fontSize: 12,
    color: '#af52de',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: -0.1,
  },
});

export default ConversionPanel;