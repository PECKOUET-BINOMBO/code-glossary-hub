import { Term, Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Langages de programmation',
    color: '#3b82f6',
    icon: '💻'
  },
  {
    id: '2', 
    name: 'Frameworks',
    color: '#8b5cf6',
    icon: '🏗️'
  },
  {
    id: '3',
    name: 'Concepts',
    color: '#f59e0b',
    icon: '💡'
  },
  {
    id: '4',
    name: 'Outils',
    color: '#10b981',
    icon: '🛠️'
  }
];

export const sampleTerms: Term[] = [
  {
    id: '1',
    word: 'Variable',
    definition: 'Un emplacement de stockage avec un nom associé qui contient des données pouvant être modifiées pendant l\'exécution du programme.',
    phonetic: '/ˈvɛərɪəbəl/',
    category: categories[2],
    example: 'let userName = "John"; // userName est une variable stockant une valeur de chaîne',
    context: 'Les variables sont fondamentales en programmation car elles permettent de stocker et manipuler des données. Elles peuvent contenir différents types de valeurs comme des nombres, des chaînes ou des objets.',
    searchCount: 245,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    word: 'Algorithme',
    definition: 'Une procédure étape par étape ou une formule pour résoudre un problème ou accomplir une tâche en programmation.',
    phonetic: '/ˈælɡərɪðəm/',
    category: categories[2],
    example: 'L\'algorithme de tri à bulles organise les éléments en échangeant répétitivement les éléments adjacents s\'ils sont dans le mauvais ordre.',
    context: 'Les algorithmes sont la base de l\'informatique et de la programmation. Ils définissent la logique et l\'efficacité de la façon dont les problèmes sont résolus dans les logiciels.',
    searchCount: 189,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    word: 'Framework',
    definition: 'Une structure de code pré-écrite qui fournit une base pour développer des applications, offrant des composants réutilisables et des conventions standardisées.',
    phonetic: '/ˈfreɪmˌwɜrk/',
    category: categories[1],
    example: 'React est un framework JavaScript pour construire des interfaces utilisateur avec des composants réutilisables.',
    context: 'Les frameworks accélèrent le développement en fournissant des solutions testées et standardisées pour les tâches de programmation courantes et les modèles architecturaux.',
    searchCount: 156,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    word: 'API',
    definition: 'Interface de Programmation d\'Application - un ensemble de protocoles et d\'outils qui permet à différentes applications logicielles de communiquer entre elles.',
    phonetic: '/ˌeɪ piː ˈaɪ/',
    category: categories[2],
    example: 'L\'API REST permet au frontend de récupérer les données utilisateur depuis le serveur backend.',
    context: 'Les API sont essentielles pour le développement logiciel moderne, permettant l\'intégration entre différents systèmes et services.',
    searchCount: 201,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    word: 'Git',
    definition: 'Un système de contrôle de version distribué qui suit les changements dans le code source pendant le développement logiciel.',
    phonetic: '/ɡɪt/',
    category: categories[3],
    example: 'Utilisez "git commit -m \'Commit initial\'" pour sauvegarder vos changements dans le dépôt.',
    context: 'Git est essentiel pour la programmation collaborative, permettant à plusieurs développeurs de travailler sur le même projet tout en suivant tous les changements.',
    searchCount: 167,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    word: 'JavaScript',
    definition: 'Un langage de programmation de haut niveau et interprété largement utilisé pour le développement web et la création de pages web interactives.',
    phonetic: '/ˈdʒɑvəˌskrɪpt/',
    category: categories[0],
    example: 'function greet(name) { return `Bonjour, ${name}!`; } // Fonction JavaScript',
    context: 'JavaScript est l\'épine dorsale du développement web moderne, s\'exécutant dans les navigateurs et serveurs pour créer des expériences dynamiques et interactives.',
    searchCount: 298,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '7',
    word: 'Base de données',
    definition: 'Une collection organisée d\'informations structurées ou de données stockées électroniquement dans un système informatique.',
    phonetic: '/ˈdeɪtəˌbeɪs/',
    category: categories[2],
    example: 'Les informations utilisateur sont stockées dans une base de données MySQL avec des tables pour les utilisateurs, les posts et les commentaires.',
    context: 'Les bases de données sont cruciales pour stocker et récupérer efficacement les données dans les applications, des sites web simples aux systèmes d\'entreprise complexes.',
    searchCount: 178,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    word: 'React',
    definition: 'Une bibliothèque JavaScript populaire pour construire des interfaces utilisateur, spécialement des applications à page unique avec des composants réutilisables.',
    phonetic: '/riˈækt/',
    category: categories[1],
    example: 'const Button = () => <button>Cliquez-moi</button>; // Composant React',
    context: 'React a révolutionné le développement frontend avec son architecture basée sur les composants et le DOM virtuel, rendant les interfaces utilisateur complexes plus gérables.',
    searchCount: 234,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '9',
    word: 'Débogage',
    definition: 'Le processus de recherche et de correction d\'erreurs ou de bugs dans les programmes informatiques ou systèmes.',
    phonetic: '/dɪˈbʌɡɪŋ/',
    category: categories[2],
    example: 'Utiliser des instructions console.log() pour déboguer le code JavaScript et comprendre les valeurs des variables.',
    context: 'Le débogage est une compétence essentielle pour les développeurs, impliquant des approches systématiques pour identifier et résoudre les problèmes dans le code.',
    searchCount: 145,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '10',
    word: 'CSS',
    definition: 'Feuilles de Style en Cascade - un langage de feuille de style utilisé pour décrire la présentation et le style des documents HTML.',
    phonetic: '/siː ɛs ɛs/',
    category: categories[0],
    example: '.button { background-color: blue; padding: 10px; border-radius: 5px; }',
    context: 'CSS est fondamental pour le développement web, contrôlant l\'apparence visuelle des sites web et assurant des designs responsifs et attrayants.',
    searchCount: 187,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];