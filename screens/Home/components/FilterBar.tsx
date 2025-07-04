import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

interface FilterBarProps {
  categories: string[];
  activeFilters: { category: string; seller: string };
  onFilterChange: (filters: { category: string; seller: string }) => void;
}

const FilterBar = ({ categories, activeFilters, onFilterChange }: FilterBarProps) => {
  const sellerOptions = [
    { key: 'all', label: 'Tous', icon: 'store' },
    { key: 'my', label: 'Mes produits', icon: 'user-alt' },
  ];

  return (
    <View style={styles.container}>

      <View style={styles.filterGroup}>
        {sellerOptions.map(opt => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chip, activeFilters.seller === opt.key && styles.activeChip]}
            onPress={() => onFilterChange({ ...activeFilters, seller: opt.key })}
          >
            <FontAwesome5
              name={opt.icon as any}
              size={14}
              color={activeFilters.seller === opt.key ? COLORS.white : COLORS.gray}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[styles.chipText, activeFilters.seller === opt.key && styles.activeChipText]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Catégories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <TouchableOpacity
          style={[styles.chip, activeFilters.category === '' && styles.activeChip]}
          onPress={() => onFilterChange({ ...activeFilters, category: '' })}
        >
          <Text style={[styles.chipText, activeFilters.category === '' && styles.activeChipText]}>
            Toutes
          </Text>
        </TouchableOpacity>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.chip, activeFilters.category === category && styles.activeChip]}
            onPress={() => onFilterChange({ ...activeFilters, category })}
          >
            <Text
              style={[styles.chipText, activeFilters.category === category && styles.activeChipText]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.base,
    paddingBottom: SIZES.base,
  },
  title: {
    ...FONTS.h3,
    marginBottom: SIZES.base,
    color: COLORS.darkGray,
  },
  filterGroup: {
    flexDirection: 'row',
    marginBottom: SIZES.base,
    flexWrap: 'wrap',
  },
  scroll: {
    paddingVertical: SIZES.base,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    elevation: 2,
  },
  chipText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  activeChipText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default FilterBar;