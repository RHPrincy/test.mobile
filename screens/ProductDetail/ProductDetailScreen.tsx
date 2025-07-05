
import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RootStackParamList } from '../../navigation/AppNavigator';
import { getProductById, deleteProduct } from '../../services/ProductService';
import { useAuth } from '../../hooks/useAuth';
import { Product } from '../../constants/types';
import AppButton from '../../components/common/AppButton';
import LoadingIndicator from '../../components/loading/LoadingIndicator';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

type DetailNavProps = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type DetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const navigation = useNavigation<DetailNavProps>();
  const route = useRoute<DetailRouteProp>();
  const { productId } = route.params;
  const { userData } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useLayoutEffect(() => {
    const loadData = async () => {
      const data = await getProductById(productId);
      if (data) setProduct(data);
      setIsLoading(false);
    };
    loadData();
  }, [productId]);

  const handleDelete = () => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            await deleteProduct(productId);
            navigation.navigate('MainTabs', {
              screen: 'HomeTab',
              params: { refresh: true },
            } as any);
          },
        },
      ]
    );
  };

  const isOwner = userData?.name === product?.vendeur;

  if (isLoading) return <LoadingIndicator />;
  if (!product)
    return (
      <View style={styles.centered}>
        <Text>Produit non trouvé.</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* <Image source={{ uri: product.image }} style={styles.image} /> */}
          <Image source={product.image} style={styles.image} />

          <View style={styles.header}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price.toFixed(2)} Ariary</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>

            <Text style={styles.sectionTitle}>Détails</Text>
            <InfoRow icon="user" label="Vendeur" value={product.vendeur} />
            <InfoRow icon="archive" label="Stock" value={`${product.stock} unités`} />
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>

        {isOwner && (
          <View style={styles.footerActions}>
            <AppButton
              title="Supprimer"
              onPress={handleDelete}
              variant="error"
              isLoading={isDeleting}
            />
            <View style={{ height: 10 }} />
            <AppButton
              title="Modifier"
              onPress={() =>
                navigation.navigate('AddEditProduct', { productId: product.id })
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: any;
}) => (
  <View style={styles.infoRow}>
    <FontAwesome name={icon} size={16} color={COLORS.gray} style={{ width: 20 }} />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  header: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  category: {
    ...FONTS.body4,
    color: COLORS.gray,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  price: {
    ...FONTS.h3,
    color: COLORS.primary,
    marginTop: 8,
  },
  content: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h3,
    marginBottom: 8,
    color: COLORS.darkGray,
  },
  description: {
    ...FONTS.body3,
    color: COLORS.darkGray,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabel: {
    ...FONTS.body3,
    marginLeft: 10,
    color: COLORS.gray,
    flex: 1,
  },
  infoValue: {
    ...FONTS.body3,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'right',
  },
  footerActions: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
});
