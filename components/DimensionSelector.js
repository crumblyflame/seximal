import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getAllDimensions } from '../utils/conversionEngine.js';

const DimensionSelector = ({ selectedDimension, onDimensionChange }) => {
  const dimensions = getAllDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Dimension</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {dimensions.map((dimension) => (
          <TouchableOpacity
            key={dimension.key}
            style={[
              styles.dimensionButton,
              selectedDimension === dimension.key && styles.selectedDimension
            ]}
            onPress={() => onDimensionChange(dimension.key)}
          >
            <Text style={[
              styles.dimensionText,
              selectedDimension === dimension.key && styles.selectedDimensionText
            ]}>
              {dimension.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 0,
  },
  dimensionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDimension: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  dimensionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
    textAlign: 'center',
  },
  selectedDimensionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default DimensionSelector;