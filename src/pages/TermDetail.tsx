import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/AudioButton';
import { TranslateButton } from '@/components/TranslateButton';
import { termService } from '@/services/termService';
import { Term } from '@/types';
import { toast } from 'sonner';

const TermDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [term, setTerm] = useState<Term | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTerm = async () => {
      if (!id) return;
      
      try {
        const fetchedTerm = await termService.getTermById(id);
        setTerm(fetchedTerm);
      } catch (error) {
        console.error('Error fetching term:', error);
        toast.error('Erreur lors du chargement des détails du terme');
      } finally {
        setLoading(false);
      }
    };

    fetchTerm();
  }, [id]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copié dans le presse-papiers !');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Échec de la copie dans le presse-papiers');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto p-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!term) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Terme non trouvé</h1>
          <Button onClick={() => navigate('/')}>
            ← Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-accent"
          >
            ← Retour à la recherche
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Main Term Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-4xl font-bold gradient-text">
                        {term.word}
                      </CardTitle>
                      <Badge 
                        className="text-sm"
                        style={{ 
                          backgroundColor: `${term.category.color}15`, 
                          color: term.category.color,
                          border: `1px solid ${term.category.color}30`
                        }}
                      >
                        {term.category.name}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-muted px-4 py-2 rounded-lg">
                        <span className="font-mono text-lg text-foreground">
                          {term.phonetic}
                        </span>
                        <AudioButton text={term.word} size="lg" />
                        <TranslateButton text={term.definition} size="lg" />
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(term.phonetic)}
                        className="hover:bg-accent"
                      >
                        {copied ? '✓' : '📋'}
                      </Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm">{term.searchCount} recherches</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm">
                        Mis à jour {new Date(term.updatedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Definition */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    Définition
                  </h3>
                  <p className="text-lg leading-relaxed text-foreground/90">
                    {term.definition}
                  </p>
                </div>

                {/* Context */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    Contexte et utilisation
                  </h3>
                  <p className="text-base leading-relaxed text-foreground/80">
                    {term.context}
                  </p>
                </div>

                {/* Example */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Exemple</h3>
                  <Card className="bg-muted/50 border-border/30">
                    <CardContent className="p-4">
                      <pre className="font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                        {term.example}
                      </pre>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-border/50">
                  <Button
                    onClick={() => copyToClipboard(`${term.word}: ${term.definition}`)}
                    variant="outline"
                    className="hover:bg-accent"
                  >
                    📋 Copier la définition
                  </Button>
                  <Button
                    onClick={() => copyToClipboard(term.example)}
                    variant="outline"
                    className="hover:bg-accent"
                  >
                    📋 Copier l'exemple
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TermDetail;