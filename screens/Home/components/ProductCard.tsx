import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Product } from '../../../constants/types';
import { SIZES, COLORS, FONTS } from '../../../constants/theme';
import { AntDesign } from '@expo/vector-icons';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription =
    product.description?.length > 40
      ? product.description.substring(0, 40) + '...'
      : product.description;

  return (
    <TouchableOpacity style={styles.modernCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{product.category}</Text>
      </View>

      <View style={styles.imageContainer}>
        {product.image ? (
          // <Image source={{ uri: product.image }} style={styles.productImage} />
          <Image source={product.image} style={styles.productImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <AntDesign name="picture" size={40} color={COLORS.gray} />
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{product.price?.toLocaleString()} Ariary</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {showFullDescription ? product.description : truncatedDescription}
          </Text>
          {product.description?.length > 40 && (
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
              style={styles.seeMoreButton}
            >
              <Text style={styles.seeMoreText}>
                {showFullDescription ? 'Voir moins' : 'Voir plus'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sellerContainer}>
          <AntDesign name="user" size={12} color={COLORS.gray} />
          <Text style={styles.sellerText}>{product.vendeur}</Text>
        </View>
      </View>

      <View
        style={[
          styles.availabilityIndicator,
          { backgroundColor: product.isActive ? '#4CAF50' : '#F44336' },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modernCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    marginHorizontal: 4,
    flex: 1,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  
  imageContainer: {
    height: 140,
    backgroundColor: '#F8F9FA',
    position: 'relative',
  },
  
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  
  cardContent: {
    padding: 12,
    flex: 1,
  },
  
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6,
    lineHeight: 20,
  },
  
  priceContainer: {
    marginBottom: 8,
  },
  
  priceText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  
  descriptionContainer: {
    marginBottom: 8,
  },
  
  descriptionText: {
    fontSize: 12,
    color: '#7F8C8D',
    lineHeight: 16,
    marginBottom: 4,
  },
  
  seeMoreButton: {
    alignSelf: 'flex-start',
  },
  
  seeMoreText: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '600',
  },
  
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  
  sellerText: {
    fontSize: 11,
    color: '#95A5A6',
    marginLeft: 4,
    fontWeight: '500',
  },
  
  availabilityIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default ProductCard;