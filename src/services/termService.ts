import { Term, SearchFilters } from '@/types';
import { sampleTerms } from '@/data/terms';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class TermService {
  private terms: Term[] = [...sampleTerms];

  async searchTerms(filters: SearchFilters): Promise<Term[]> {
    await delay(300); // Simulate network delay
    
    let filteredTerms = [...this.terms];

    // Filter by query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredTerms = filteredTerms.filter(term =>
        term.word.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        term.context.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (filters.category) {
      filteredTerms = filteredTerms.filter(term => 
        term.category.id === filters.category
      );
    }

    // Sort results
    switch (filters.sortBy) {
      case 'alphabetical':
        filteredTerms.sort((a, b) => a.word.localeCompare(b.word));
        break;
      case 'popularity':
        filteredTerms.sort((a, b) => b.searchCount - a.searchCount);
        break;
      case 'relevance':
      default:
        // Keep current order for relevance (could implement more sophisticated scoring)
        break;
    }

    return filteredTerms;
  }

  async getTermById(id: string): Promise<Term | null> {
    await delay(200);
    
    const term = this.terms.find(t => t.id === id);
    if (term) {
      // Increment search count
      term.searchCount += 1;
    }
    return term || null;
  }

  async getPopularTerms(limit: number = 5): Promise<Term[]> {
    await delay(200);
    
    return [...this.terms]
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, limit);
  }

  async getSuggestions(query: string): Promise<string[]> {
    if (!query || query.length < 2) return [];
    
    const suggestions = this.terms
      .filter(term => 
        term.word.toLowerCase().startsWith(query.toLowerCase())
      )
      .map(term => term.word)
      .slice(0, 5);
    
    return suggestions;
  }

  async addTerm(term: Omit<Term, 'id' | 'searchCount' | 'createdAt' | 'updatedAt'>): Promise<Term> {
    await delay(300);
    
    const newTerm: Term = {
      ...term,
      id: Date.now().toString(),
      searchCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.terms.push(newTerm);
    return newTerm;
  }

  async updateTerm(id: string, updates: Partial<Term>): Promise<Term | null> {
    await delay(300);
    
    const index = this.terms.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    this.terms[index] = {
      ...this.terms[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return this.terms[index];
  }

  async deleteTerm(id: string): Promise<boolean> {
    await delay(300);
    
    const index = this.terms.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    this.terms.splice(index, 1);
    return true;
  }

  async getAllTerms(): Promise<Term[]> {
    await delay(200);
    return [...this.terms];
  }
}

export const termService = new TermService();
