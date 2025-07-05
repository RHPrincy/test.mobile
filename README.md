
# test.mobile

Application mobile de gestion de produits complète qui simule un environnement de développement professionnel.

## Fonctionnalités implémentées

- **Gestion des Utilisateurs**
    -   Inscription et connexion sécurisées (simulation via `AsyncStorage`).
    -   Persistance de la session utilisateur.
    -   Modification des informations du profil (nom, email).
    -   Déconnexion sécurisée.

- **Gestion des Produits (CRUD)**
    -   Ajout de nouveaux produits avec formulaire complet et upload d'image.
    -   Modification des produits existants (uniquement ceux créés par l'utilisateur).
    -   Suppression des produits (uniquement ceux créés par l'utilisateur).
    -   Consultation détaillée de chaque produit.

- **Interface et Expérience Utilisateur**
    -   Navigation fluide entre les écrans avec `React Navigation`.
    -   Liste des produits sous forme de cartes modernes.
    -   Barre de recherche pour trouver des produits par nom.
    -   Filtres multiples : par catégorie et par vendeur ("Tous" vs "Mes produits").
    -   Indicateurs de chargement (`ActivityIndicator`) pour une meilleure UX.
    -   Gestion claire des erreurs avec des pop-ups (`Alert`).
    -   Bouton d'action flottant (FAB) pour un ajout rapide de produit.



## Règles Métier et Logique Applicative
### 1. Gestion de la Disponibilité des Produits

-   **Indicateur Visuel de Disponibilité** :
    -   Chaque produit affiché dans la liste principale (`HomeScreen`) et sur sa page de détail (`ProductDetailScreen`) possède un indicateur visuel de disponibilité.
    -   Un point **vert** <span style="color: #4CAF50;">●</span> indique que le produit est actif et disponible à la vente (`isActive: true`).
    -   Un point **rouge** <span style="color: #F44336;">●</span> indique que le produit est inactif ou en rupture de stock (`isActive: false`).
    -   Cette logique est contrôlée par la propriété booléenne `isActive` de l'objet `Product`.

### 2. Permissions sur les Produits (Propriété)

-   **Règle Fondamentale** : Un utilisateur peut **uniquement modifier ou supprimer les produits qu'il a lui-même créés**.
-   **Mécanisme de Contrôle** :
    -   Lors de la création d'un produit, le nom de l'utilisateur connecté (`userData.name`) est automatiquement assigné à la propriété `vendeur` du produit.
    -   Sur l'écran de détail d'un produit (`ProductDetailScreen`), une vérification est effectuée : `product.vendeur === userData.name`.
    -   Si la condition est **vraie**, les boutons "Modifier" et "Supprimer" sont affichés et actifs.
    -   Si la condition est **fausse**, les boutons sont soit complètement masqués, soit désactivés visuellement pour indiquer à l'utilisateur qu'il n'a pas les droits nécessaires.

### 3. Logique de Filtrage

-   **Filtre "Mes produits"** :
    -   Sur l'écran d'accueil, l'option de filtre "Mes produits" est disponible.
    -   Lorsqu'elle est activée, la liste n'affiche que les produits où la propriété `vendeur` correspond au nom de l'utilisateur actuellement connecté.

### 4. Validation des Formulaires

-   **Champs Requis** :
    -   Pour l'**inscription**, les champs "Nom", "Email" et "Mot de passe" sont obligatoires.
    -   Pour la **connexion**, "Email" et "Mot de passe" sont requis.
    -   Pour l'**ajout/modification d'un produit**, les champs "Nom", "Prix" et "Catégorie" sont obligatoires.
-   **Notification d'Erreur** : Si un utilisateur tente de soumettre un formulaire sans remplir les champs requis, une alerte s'affiche pour l'informer des champs manquants.

### 5. Gestion des États de Chargement (UX)

-   **Feedback Utilisateur** : Des indicateurs de chargement (`ActivityIndicator`) sont systématiquement affichés lors des opérations asynchrones pour informer l'utilisateur qu'une action est en cours.
-   **Scénarios d'utilisation** :
    -   Pendant la connexion ou l'inscription.
    -   Lors du chargement initial de la liste des produits.
    -   Pendant le rafraîchissement de la liste ("Pull-to-Refresh").
    -   Lors de la sauvegarde d'un nouveau produit ou d'une modification.
    -   Lors de la suppression d'un produit.


## Installation et Lancement

1.  **Clonez le dépôt**
    ```bash
    git clone https://github.com/RHPrincy/test.mobile.git
    cd test.mobile
    ```

2.  **Installez les dépendances**
    ```bash
    yarn install
    ```

3.  **Lancez le serveur de développement Metro**
    ```bash
    yarn start
    ```

## Teste de l'application

L'application utilise des données mockées

#### 1. Authentification

-   **Inscription** : Utilisez le formulaire d'inscription pour créer un nouveau compte.
-   **Connexion** : Utilisez un compte existant du fichier `data/users.ts`. Par exemple :
    -   **Email** : `john.doe@example.com`
    -   **Mot de passe** : `password123`
-   **Déconnexion** : Allez dans l'écran de profil et cliquez sur le bouton de déconnexion.

#### 2. Tester la Gestion des Produits

-   **Ajouter** : Utilisez le bouton `+` sur l'écran d'accueil pour ajouter un produit.
-   **Rechercher et Filtrer** : Utilisez la barre de recherche et les boutons de filtre pour voir leur effet.
-   **Consulter** : Cliquez sur n'importe quelle carte produit pour voir ses détails.
-   **Modifier/Supprimer** :
    -   Connectez-vous en tant que `john.doe@example.com`.
    -   Allez sur la page de détail d'un produit créé par "John Doe" (ex: iPhone 15 Pro). Les boutons "Modifier" et "Supprimer" seront visibles et fonctionnels.
    -   Allez sur la page de détail d'un produit créé par un autre vendeur. Les boutons seront absents ou désactivés.

## Architecture et Choix Techniques

Architecture modulaire, scalable et maintenable, en suivant les meilleures pratiques de l'écosystème React.

### Structure des Dossiers

La structure des fichiers est organisée par fonctionnalité pour une meilleure colocation et une maintenance simplifiée.

```
.
├── assets/             # Polices, images et autres ressources statiques
├── components/         # Composants génériques et réutilisables (Button, TextInput)
├── constants/          # Constantes globales (thème, couleurs, types TypeScript)
├── context/            # React Context pour la gestion d'état globale (AuthContext)
├── data/               # Données mockées pour les utilisateurs et produits
├── hooks/              # Hooks personnalisés pour la logique réutilisable (useAuth, useDebounce)
├── navigation/         # Configuration de React Navigation (stacks, tabs)
├── screens/            # Écrans principaux de l'application, organisés par fonctionnalité
|   ├── AddEditProduct/ # Écran d'ajout et modification des produits
│   ├── Auth/           # Écrans de connexion et d'inscription
│   ├── Home/           # Écran d'accueil et ses sous-composants
│   ├── ProductDetail/  # Affichage de tous les details concernant le produit selectionné
|   ├── UserProfile/    # Affichage et modification du profile de l'utilisateur
└── services/           # Couche d'abstraction pour la manipulation des données
```

### Choix Techniques

-   **React Native avec Expo**

-   **React Navigation**

-   **Gestion d'état (Hooks & Context API)** :
    -   L'état local des composants est géré avec `useState` et `useEffect`.
    -   L'état global de l'authentification (`userData`, `isLoading`, fonctions `signIn`/`signOut`) est géré via `AuthContext`.
    -   Le hook `useAuth` fournit un accès simple et propre au contexte d'authentification dans toute l'application.

-   **Architecture "Feature-Sliced" (dans `/screens`)** : Chaque écran ou fonctionnalité majeure (ex: `Home`, `UserProfile`) possède son propre dossier contenant ses composants, ses hooks de logique et ses styles. Cela rend chaque fonctionnalité quasi-autonome et facile à raisonner.

-   **Hooks Personnalisés (`useUserProfile`, `useDebounce`)** : La logique complexe est extraite des composants UI dans des hooks dédiés.

-   **Couche de Service (`ProductService.ts`)** :
    -   Toute la logique de manipulation des données (get, add, update, delete) est centralisée dans ce service. Les composants n'interagissent jamais directement avec les fichiers de données.
