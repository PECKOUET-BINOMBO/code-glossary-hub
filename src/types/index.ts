export interface Term {
  id: string;
  word: string;
  definition: string;
  phonetic: string;
  audioUrl?: string;
  category: Category;
  example: string;
  context: string;
  searchCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface SearchFilters {
  query: string;
  category?: string;
  sortBy: 'relevance' | 'alphabetical' | 'popularity';
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}