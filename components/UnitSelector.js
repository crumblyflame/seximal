import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, Platform } from 'react-native';
import { getUnitsForDimension, MEASUREMENT_SYSTEMS } from '../utils/conversionEngine.js';

const UnitSelector = ({ 
  visible, 
  onClose, 
  system, 
  dimension, 
  selectedUnit, 
  onUnitSelect 
}) => {
  const units = getUnitsForDimension(dimension, system);
  const unitEntries = Object.entries(units);

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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: getSystemColor() }]}>
            Select {system} Unit
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Done</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {unitEntries.map(([unitKey, unitData]) => (
            <TouchableOpacity
              key={unitKey}
              style={[
                styles.unitOption,
                selectedUnit === unitKey && [
                  styles.selectedUnit, 
                  { borderLeftColor: getSystemColor() }
                ]
              ]}
              onPress={() => {
                onUnitSelect(unitKey);
                onClose();
              }}
            >
              <View style={styles.unitInfo}>
                <Text style={[
                  styles.unitName,
                  selectedUnit === unitKey && { color: getSystemColor() }
                ]}>
                  {unitData.name}
                </Text>
                <Text style={styles.unitSymbol}>
                  {unitData.symbol}
                </Text>
              </View>
              {selectedUnit === unitKey && (
                <Text style={[styles.checkmark, { color: getSystemColor() }]}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    backgroundColor: '#f2f2f7',
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  closeText: {
    fontSize: 17,
    color: '#007aff',
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  scrollView: {
    flex: 1,
  },
  unitOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    borderLeftWidth: 0,
  },
  selectedUnit: {
    backgroundColor: '#f2f2f7',
    borderLeftWidth: 4,
  },
  unitInfo: {
    flex: 1,
  },
  unitName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#1d1d1f',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  unitSymbol: {
    fontSize: 15,
    color: '#8e8e93',
    fontWeight: '400',
    letterSpacing: -0.1,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UnitSelector;