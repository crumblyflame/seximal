import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { getUnitsForDimension } from '../utils/conversionEngine.js';

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
      case 'SI':
        return '#28a745';
      case 'US Customary':
        return '#dc3545';
      case 'Seximal':
        return '#6f42c1';
      default:
        return '#6c757d';
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  unitOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
    borderLeftWidth: 0,
  },
  selectedUnit: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
  },
  unitInfo: {
    flex: 1,
  },
  unitName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 2,
  },
  unitSymbol: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '400',
  },
  checkmark: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UnitSelector;