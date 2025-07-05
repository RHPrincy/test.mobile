import { ImageSourcePropType } from 'react-native';
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  vendeur: string;
  image?: ImageSourcePropType;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}