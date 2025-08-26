import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/terms';
import { SearchFilters } from '@/types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  suggestions?: string[];
  className?: string;
}

export const SearchBar = ({ onSearch, suggestions = [], className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query, suggestions]);

  const handleSearch = () => {
    onSearch({
      query,
      category: selectedCategory,
      sortBy: 'relevance'
    });
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch({
      query: suggestion,
      category: selectedCategory,
      sortBy: 'relevance'
    });
  };

  const clearCategory = () => {
    setSelectedCategory(undefined);
    handleSearch();
  };

  return (
    <motion.div 
      className={`relative w-full max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Main Search Input */}
      <div className="relative search-input">
        <Input
          type="text"
          placeholder="Rechercher des termes de programmation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          className="h-14 pl-6 pr-20 text-lg rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 focus:border-primary focus:shadow-glow"
        />
        <Button 
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl bg-gradient-primary hover:shadow-accent"
          size="sm"
        >
          Rechercher
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-card backdrop-blur-sm z-50"
          >
            {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => selectSuggestion(suggestion)}
                className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-foreground">{suggestion}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filters */}
      <motion.div 
        className="flex flex-wrap gap-2 mt-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "secondary"}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedCategory === category.id 
                ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={() => {
              setSelectedCategory(selectedCategory === category.id ? undefined : category.id);
              handleSearch();
            }}
          >
            {category.name}
            {selectedCategory === category.id && (
              <span 
                className="ml-2 cursor-pointer hover:text-destructive" 
                onClick={(e) => {
                  e.stopPropagation();
                  clearCategory();
                }}
              >
                ×
              </span>
            )}
          </Badge>
        ))}
      </motion.div>
    </motion.div>
  );
};