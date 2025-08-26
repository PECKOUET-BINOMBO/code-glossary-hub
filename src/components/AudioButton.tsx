import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export const AudioButton = ({ 
  text, 
  className = '', 
  size = 'md',
  variant = 'ghost'
}: AudioButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const playAudio = async () => {
    if (isPlaying || isLoading) return;

    setIsLoading(true);
    
    try {
      // Check if Speech Synthesis is supported
      if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure speech settings
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Try to find an English voice
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => 
          voice.lang.startsWith('en') && voice.name.includes('Google')
        ) || voices.find(voice => voice.lang.startsWith('en'));
        
        if (englishVoice) {
          utterance.voice = englishVoice;
        }

        utterance.onstart = () => {
          setIsLoading(false);
          setIsPlaying(true);
        };

        utterance.onend = () => {
          setIsPlaying(false);
        };

        utterance.onerror = () => {
          setIsLoading(false);
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        console.warn('Speech Synthesis not supported');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
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
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={variant}
        size="sm"
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          buttonSize,
          'p-0 rounded-full transition-all duration-200',
          isPlaying && 'bg-accent text-accent-foreground animate-pulse-ring',
          'hover:bg-primary hover:text-primary-foreground hover:shadow-glow',
          className
        )}
        title={isPlaying ? 'Arrêter la prononciation' : 'Jouer la prononciation'}
      >
        {isLoading ? (
          <span className={cn(iconSize, 'animate-spin')}>⏳</span>
        ) : isPlaying ? (
          <span className={iconSize}>🔇</span>
        ) : (
          <span className={iconSize}>🔊</span>
        )}
      </Button>
    </motion.div>
  );
};