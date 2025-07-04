import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useNavigation, useFocusEffect, RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { getProducts } from '../../services/ProductService';
import { Product } from '../../constants/types';
import { SIZES, COLORS, FONTS } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { useDebounce } from '../../hooks/useDebounce';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import FilterBar from './components/FilterBar';
import HomeHeader from './components/HomeHeader';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';

type HomeNavProps = StackNavigationProp<RootStackParamList, 'MainTabs'>;
type HomeRouteProp = RouteProp<RootStackParamList, 'MainTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProps>();
  const route = useRoute<HomeRouteProp>();
  const { userData } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ category: '', seller: 'all' }); // MODIFIÉ: 'all' -> '' pour catégorie

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if ((route.params as any)?.refresh) loadProducts();
    }, [route.params, loadProducts])
  );

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p =>
        debouncedSearchQuery ? p.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) : true
      )
      .filter(p => (filters.category !== '' ? p.category === filters.category : true)) // MODIFIÉ: 'all' -> ''
      .filter(p => (filters.seller === 'my' ? p.vendeur === userData?.name : true));
  }, [products, debouncedSearchQuery, filters, userData]);

  const categories = useMemo(() => [...Array.from(new Set(products.map(p => p.category)))], [products]);

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <RNStatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <HomeHeader
        user={userData}
        onProfilePress={() => navigation.navigate('MainTabs', { screen: 'ProfileTab' })}
      />

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <FilterBar
        categories={categories}
        activeFilters={filters}
        onFilterChange={setFilters}
      />
      
      {isLoading && products.length === 0 ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aucun produit trouvé</Text>
                <Text style={styles.emptySubText}>Essayez de modifier vos filtres ou votre recherche.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadProducts}
              tintColor={COLORS.primary}
            />
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate({ name: 'AddEditProduct', params: {} })}
      >
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  loader: {
    marginTop: 50,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding / 2,
  },
  listContent: {
    paddingHorizontal: SIZES.padding / 2,
    paddingTop: SIZES.base,
    paddingBottom: 100, // Espace pour le FAB
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  emptySubText: {
      ...FONTS.body4,
      color: COLORS.gray,
      marginTop: SIZES.base,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});