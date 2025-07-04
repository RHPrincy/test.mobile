import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, FONTS } from '../../../constants/theme';

type StatCardProps = {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  value: string;
  color?: string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color = COLORS.primary }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <View style={styles.statIcon}>
      <FontAwesome name={icon} size={24} color={color} />
    </View>
    <View style={styles.statContent}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderLeftWidth: 5,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: COLORS.lightGray,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  statLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default StatCard;