import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, BookOpen, Sparkles, TrendingUp, Settings, Github } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { TermCard } from '@/components/TermCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { termService } from '@/services/termService';
import { SearchFilters, Term } from '@/types';
import { toast } from 'sonner';
import heroBg from '@/assets/hero-bg.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Term[]>([]);
  const [popularTerms, setPopularTerms] = useState<Term[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const popular = await termService.getPopularTerms(6);
        setPopularTerms(popular);
        
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
        toast.info('No terms found. Try a different search term.');
      }
    } catch (error) {
      console.error('Error searching terms:', error);
      toast.error('Error searching terms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTermClick = (term: Term) => {
    navigate(`/term/${term.id}`);
  };

  const handlePlayAudio = (term: Term) => {
    // Audio will be handled by the AudioButton component
    toast.success(`Playing pronunciation for "${term.word}"`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden bg-gradient-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(37, 48, 79, 0.9), rgba(65, 42, 101, 0.9)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code2 className="h-12 w-12 text-white animate-float" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                CodeGlossary
              </h1>
            </div>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Your interactive dictionary for programming terms. Search, learn, and master 
              the language of code with pronunciations and clear explanations.
            </p>

            <div className="flex items-center justify-center gap-3 text-white/80">
              <Sparkles className="h-5 w-5" />
              <span>Over {popularTerms.length * 2} programming terms</span>
              <span>•</span>
              <BookOpen className="h-5 w-5" />
              <span>Audio pronunciations</span>
              <span>•</span>
              <TrendingUp className="h-5 w-5" />
              <span>Real examples</span>
            </div>
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
                  Search Results 
                  <Badge variant="secondary" className="ml-3">
                    {searchResults.length} terms
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
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No terms found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try searching for a different programming term or browse popular terms below.
                    </p>
                    <Button onClick={() => setHasSearched(false)} variant="outline">
                      Browse Popular Terms
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="popular"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold gradient-text">Popular Terms</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Discover the most searched programming terms and concepts
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularTerms.map((term, index) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    onPlayAudio={handlePlayAudio}
                    onClick={handleTermClick}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-semibold">CodeGlossary</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/admin')}
                className="hover:bg-accent"
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Button>
              
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>
          
          <div className="text-center text-muted-foreground text-sm mt-6 pt-6 border-t border-border/30">
            <p>Built with ❤️ for developers by developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
