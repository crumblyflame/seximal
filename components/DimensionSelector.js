import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
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
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  scrollView: {
    flexGrow: 0,
  },
  dimensionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 6,
    backgroundColor: '#f2f2f7',
    borderRadius: 22,
    borderWidth: 0,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {},
    }),
    elevation: 2,
  },
  selectedDimension: {
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  dimensionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#3c3c43',
    textAlign: 'center',
    letterSpacing: -0.1,
  },
  selectedDimensionText: {
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});

export default DimensionSelector;