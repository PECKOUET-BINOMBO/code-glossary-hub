import { Term, Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Programming Languages',
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
    name: 'Tools',
    color: '#10b981',
    icon: '🛠️'
  }
];

export const sampleTerms: Term[] = [
  {
    id: '1',
    word: 'Variable',
    definition: 'A storage location with an associated name that contains data which can be modified during program execution.',
    phonetic: '/ˈvɛərɪəbəl/',
    category: categories[2],
    example: 'let userName = "John"; // userName is a variable storing a string value',
    context: 'Variables are fundamental in programming as they allow you to store and manipulate data. They can hold different types of values like numbers, strings, or objects.',
    searchCount: 245,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    word: 'Algorithm',
    definition: 'A step-by-step procedure or formula for solving a problem or completing a task in programming.',
    phonetic: '/ˈælɡərɪðəm/',
    category: categories[2],
    example: 'The bubble sort algorithm arranges elements by repeatedly swapping adjacent elements if they are in wrong order.',
    context: 'Algorithms are the foundation of computer science and programming. They define the logic and efficiency of how problems are solved in software.',
    searchCount: 189,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    word: 'Framework',
    definition: 'A pre-written code structure that provides a foundation for developing applications, offering reusable components and standardized conventions.',
    phonetic: '/ˈfreɪmˌwɜrk/',
    category: categories[1],
    example: 'React is a JavaScript framework for building user interfaces with reusable components.',
    context: 'Frameworks accelerate development by providing tested, standardized solutions for common programming tasks and architectural patterns.',
    searchCount: 156,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    word: 'API',
    definition: 'Application Programming Interface - a set of protocols and tools that allows different software applications to communicate with each other.',
    phonetic: '/ˌeɪ piː ˈaɪ/',
    category: categories[2],
    example: 'The REST API allows the frontend to fetch user data from the backend server.',
    context: 'APIs are essential for modern software development, enabling integration between different systems and services.',
    searchCount: 201,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    word: 'Git',
    definition: 'A distributed version control system that tracks changes in source code during software development.',
    phonetic: '/ɡɪt/',
    category: categories[3],
    example: 'Use "git commit -m \'Initial commit\'" to save your changes to the repository.',
    context: 'Git is essential for collaborative programming, allowing multiple developers to work on the same project while tracking all changes.',
    searchCount: 167,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    word: 'JavaScript',
    definition: 'A high-level, interpreted programming language that is widely used for web development and creating interactive web pages.',
    phonetic: '/ˈdʒɑvəˌskrɪpt/',
    category: categories[0],
    example: 'function greet(name) { return `Hello, ${name}!`; } // JavaScript function',
    context: 'JavaScript is the backbone of modern web development, running in browsers and servers to create dynamic, interactive experiences.',
    searchCount: 298,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '7',
    word: 'Database',
    definition: 'An organized collection of structured information or data stored electronically in a computer system.',
    phonetic: '/ˈdeɪtəˌbeɪs/',
    category: categories[2],
    example: 'The user information is stored in a MySQL database with tables for users, posts, and comments.',
    context: 'Databases are crucial for storing and retrieving data efficiently in applications, from simple websites to complex enterprise systems.',
    searchCount: 178,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    word: 'React',
    definition: 'A popular JavaScript library for building user interfaces, especially single-page applications with reusable components.',
    phonetic: '/riˈækt/',
    category: categories[1],
    example: 'const Button = () => <button>Click me</button>; // React component',
    context: 'React revolutionized frontend development with its component-based architecture and virtual DOM, making complex UIs more manageable.',
    searchCount: 234,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '9',
    word: 'Debugging',
    definition: 'The process of finding and fixing errors or bugs in computer programs or systems.',
    phonetic: '/dɪˈbʌɡɪŋ/',
    category: categories[2],
    example: 'Using console.log() statements to debug JavaScript code and understand variable values.',
    context: 'Debugging is an essential skill for developers, involving systematic approaches to identify and resolve issues in code.',
    searchCount: 145,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '10',
    word: 'CSS',
    definition: 'Cascading Style Sheets - a stylesheet language used for describing the presentation and styling of HTML documents.',
    phonetic: '/siː ɛs ɛs/',
    category: categories[0],
    example: '.button { background-color: blue; padding: 10px; border-radius: 5px; }',
    context: 'CSS is fundamental for web development, controlling the visual appearance of websites and ensuring responsive, attractive designs.',
    searchCount: 187,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];