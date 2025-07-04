import productDataStore from '../data/products';
import { Product } from '../constants/types';

// Récupère la liste complète des produits.
export const getProducts = async (): Promise<Product[]> => {
    return Promise.resolve([...productDataStore.products]);
};

// Récupère un seul produit par son identifiant.
export const getProductById = async (id: string): Promise<Product | undefined> => {
    return Promise.resolve(productDataStore.products.find(p => p.id === id));
};

// Ajoute un nouveau produit à la liste (en mémoire)
export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const newProduct: Product = { id: String(Date.now()), ...productData };
    productDataStore.products.unshift(newProduct);
    return Promise.resolve(newProduct);
};

// Mise à jour d'un produit existant.
export const updateProduct = async (id: string, productData: Partial<Omit<Product, 'id'>>): Promise<Product | null> => {
    const index = productDataStore.products.findIndex(p => p.id === id);
    if (index !== -1) {
        productDataStore.products[index] = { ...productDataStore.products[index], ...productData };
        return Promise.resolve(productDataStore.products[index]);
    } else {
        return Promise.resolve(null);
    }
};

// Supprime un produit par son identifiant.
export const deleteProduct = async (id: string): Promise<boolean> => {
    const initialLength = productDataStore.products.length;
    productDataStore.products = productDataStore.products.filter(p => p.id !== id);
    return Promise.resolve(productDataStore.products.length < initialLength);
};

// Récupère tous les produits d'un vendeur spécifique.
export const getProductsBySeller = async (userName: string): Promise<Product[]> => {
    const userProducts = productDataStore.products.filter(p => p.vendeur === userName);
    return Promise.resolve(userProducts);
};
