import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const categories = ['宿題', 'お手伝い', '料理', '運動', '読書', 'その他'];

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.categoryCard}>
      <Text style={styles.label}>カテゴリーを選択</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 14,
  },
  selectedCategoryButton: {
    backgroundColor: '#ff99b3',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});

export default CategorySelector;