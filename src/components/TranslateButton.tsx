import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TranslateButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export const TranslateButton = ({ 
  text, 
  className = '', 
  size = 'md',
  variant = 'ghost'
}: TranslateButtonProps) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translation, setTranslation] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const translateText = async () => {
    if (isTranslating) return;

    setIsTranslating(true);
    
    try {
      // Using a simple translation service (MyMemory API - free)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|en`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        const translatedText = data.responseData.translatedText;
        setTranslation(translatedText);
        setIsOpen(true);
        toast.success('Traduction prête !');
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      toast.error('Échec de la traduction');
    } finally {
      setIsTranslating(false);
    }
  };

  const iconSize = {
    sm: 'text-xs',
    md: 'text-sm', 
    lg: 'text-base'
  }[size];

  const buttonSize = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  }[size];

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={variant}
              size="sm"
              onClick={translateText}
              disabled={isTranslating}
              className={cn(
                buttonSize,
                'p-0 rounded-full transition-all duration-200',
                'hover:bg-accent hover:text-accent-foreground hover:shadow-glow',
                className
              )}
              title="Traduire la définition en anglais"
            >
              {isTranslating ? (
                <span className={cn(iconSize, 'animate-spin')}>⏳</span>
              ) : (
                <span className={iconSize}>🌐</span>
              )}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs p-3">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Définition en anglais :</p>
            <p className="text-sm">{translation || 'Cliquer pour traduire'}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};