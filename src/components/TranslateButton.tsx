import { useState } from 'react';
import { Languages, Loader2 } from 'lucide-react';
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
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        const translatedText = data.responseData.translatedText;
        setTranslation(translatedText);
        setIsOpen(true);
        toast.success('Translation ready!');
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      toast.error('Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const iconSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4', 
    lg: 'h-5 w-5'
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
              title="Translate to French"
            >
              {isTranslating ? (
                <Loader2 className={cn(iconSize, 'animate-spin')} />
              ) : (
                <Languages className={iconSize} />
              )}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs p-3">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">French translation:</p>
            <p className="text-sm">{translation || 'Click to translate'}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};