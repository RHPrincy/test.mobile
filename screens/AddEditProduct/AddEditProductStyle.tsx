import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { getProductById, addProduct, updateProduct } from '../../services/ProductService';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';
import LoadingIndicator from '../../components/loading/LoadingIndicator';
import ImagePickerButton from './components/ImagePickerButton';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavProps = StackNavigationProp<RootStackParamList, 'AddEditProduct'>;
type RouteProps = RouteProp<RootStackParamList, 'AddEditProduct'>;

export default function AddEditProductScreen() {
  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();
  const { productId } = route.params || {};
  const isEditMode = !!productId;
  const { userData } = useAuth();

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);


  // Charger les données du produit si en mode édition
  // Utiliser useEffect pour charger les données du produit si en mode édition
  useEffect(() => {
    const fetchProduct = async () => {
      if (isEditMode) {
        const product = await getProductById(productId);
        if (product) {
          setName(product.name);
          setDescription(product.description);
          setPrice(String(product.price));
          setStock(String(product.stock));
          setCategory(product.category);
          setImageUri(typeof product.image === 'string' ? product.image : null);
        }
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [productId, isEditMode]);

  // Fonction pour gérer la sauvegarde du produit
  const handleSave = async () => {
    if (!name || !price || !category) {
      Alert.alert('Validation', 'Les champs Nom, Prix et Catégorie sont requis.');
      return;
    }
    setIsSaving(true);
    const productData = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      category,
      vendeur: userData!.name,
      image: imageUri ? { uri: imageUri } : undefined,
      isActive: true,
    };
    try {
      if (isEditMode) {
        await updateProduct(productId, productData);
      } else {
        await addProduct(productData);
      }
      navigation.navigate('MainTabs', { screen: 'HomeTab', params: { refresh: true } });
    } catch (e) {
      Alert.alert('Erreur', 'La sauvegarde a échoué.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {isEditMode ? 'Modifier le Produit' : 'Nouveau Produit'}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="close" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <ImagePickerButton imageUri={imageUri} onImagePicked={setImageUri} />

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nom du produit</Text>
            <AppTextInput label="Nom du produit" value={name} onChangeText={setName} placeholder="Ex: Sneakers Nike" />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Description</Text>
            <AppTextInput
              label="Description du produit" 
              value={description}
              onChangeText={setDescription}
              placeholder="Détail du produit"
              multiline
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Prix (Ariary)</Text>
            <AppTextInput
              label="Prix du produit"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="Ex: 300000.0"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Stock</Text>
            <AppTextInput
              label="Stock disponible"
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
              placeholder="Ex: 10"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Catégorie</Text>
            <AppTextInput
              label="Categorie"
              value={category}
              onChangeText={setCategory}
              placeholder="Ex: Chaussures"
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <AppButton title="Sauvegarder" onPress={handleSave} isLoading={isSaving} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  fieldGroup: {
    marginBottom: SIZES.padding,
  },
  label: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: 6,
  },
  footer: {
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
});
