import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TranslateButton } from '@/components/TranslateButton';
import { Term } from '@/types';

interface TermCardProps {
  term: Term;
  onPlayAudio?: (term: Term) => void;
  onClick?: (term: Term) => void;
  index?: number;
}

export const TermCard = ({ term, onPlayAudio, onClick, index = 0 }: TermCardProps) => {
  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayAudio?.(term);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{ y: -4 }}
      className="w-full"
    >
      <Card 
        className="card-hover cursor-pointer group bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300"
        onClick={() => onClick?.(term)}
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {term.word}
                </h3>
                <Badge 
                  variant="secondary"
                  className="text-xs"
                  style={{ backgroundColor: `${term.category.color}15`, color: term.category.color }}
                >
                  {term.category.name}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-mono bg-muted px-2 py-1 rounded text-xs">
                  {term.phonetic}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePlayAudio}
                  className="h-8 w-8 p-0 hover:bg-accent hover:scale-110 transition-all audio-pulse"
                >
                  🔊
                </Button>
                <TranslateButton 
                  text={term.definition} 
                  size="sm"
                  className="hover:scale-110"
                />
              </div>
            </div>
            
            {/* Popularity Indicator */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{term.searchCount} recherches</span>
            </div>
          </div>

          {/* Definition */}
          <p className="text-foreground/90 leading-relaxed mb-4 line-clamp-3">
            {term.definition}
          </p>

          {/* Example */}
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <code className="text-sm text-foreground/80 font-mono leading-relaxed">
              {term.example}
            </code>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>Mis à jour {new Date(term.updatedAt).toLocaleDateString('fr-FR')}</span>
            </div>
            <span className="text-primary/70 group-hover:text-primary transition-colors">
              Cliquer pour voir les détails →
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};