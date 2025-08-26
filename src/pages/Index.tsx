import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from '@/components/SearchBar';
import { TermCard } from '@/components/TermCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { termService } from '@/services/termService';
import { SearchFilters, Term } from '@/types';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Term[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Get all terms for suggestions
        const allTerms = await termService.getAllTerms();
        setSuggestions(allTerms.map(term => term.word));
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = async (filters: SearchFilters) => {
    if (!filters.query.trim() && !filters.category) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const results = await termService.searchTerms(filters);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast.info('Aucun terme trouvé. Essayez un autre terme de recherche.');
      }
    } catch (error) {
      console.error('Error searching terms:', error);
      toast.error('Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleTermClick = (term: Term) => {
    navigate(`/term/${term.id}`);
  };

  const handlePlayAudio = (term: Term) => {
    toast.success(`Lecture de la prononciation pour "${term.word}"`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section Simplifiée */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Glossaire Code
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Votre dictionnaire interactif pour les termes de programmation. Recherchez, apprenez et maîtrisez 
              le langage du code avec des prononciations et des explications claires.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <SearchBar
          onSearch={handleSearch}
          suggestions={suggestions}
          className="mb-12"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card/80 backdrop-blur-sm animate-pulse">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-16 bg-muted rounded"></div>
                    <div className="h-12 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : hasSearched ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Résultats de recherche
                  <Badge variant="secondary" className="ml-3">
                    {searchResults.length} termes
                  </Badge>
                </h2>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((term, index) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      onPlayAudio={handlePlayAudio}
                      onClick={handleTermClick}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-12 text-center">
                    <h3 className="text-xl font-semibold mb-2">Aucun terme trouvé</h3>
                    <p className="text-muted-foreground mb-6">
                      Essayez de rechercher un autre terme de programmation.
                    </p>
                    <Button onClick={() => setHasSearched(false)} variant="outline">
                      Nouvelle recherche
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold gradient-text mb-4">
                Commencez votre recherche
              </h2>
              <p className="text-muted-foreground text-lg">
                Utilisez la barre de recherche ci-dessus pour trouver des termes de programmation
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Glossaire Code</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/admin')}
                className="hover:bg-accent"
              >
                Administration
              </Button>
            </div>
          </div>
          
          <div className="text-center text-muted-foreground text-sm mt-6 pt-6 border-t border-border/30">
            <p>Construit avec ❤️ pour les développeurs par les développeurs</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;