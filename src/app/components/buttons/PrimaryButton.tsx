import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'outlined';
}

export function PrimaryButton({ 
  children, 
  onClick, 
  showArrow = false,
  className = '',
  variant = 'light'
}: PrimaryButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isLight = variant === 'light';
  const isDark = variant === 'dark';
  const isOutlined = variant === 'outlined';
  
  const bgColor = isLight ? 'bg-white' : isDark ? 'bg-black' : 'bg-transparent';
  const textColor = isLight ? 'text-black' : 'text-white';

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative px-10 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2 justify-center overflow-hidden ${className}`}
    >
      {/* Base background (white, black, or transparent for outlined) */}
      <div className={`absolute inset-0 ${bgColor} rounded-full ${isOutlined ? 'border-2 border-white' : ''}`} />
      
      {/* Sliding gradient that expands from right to left */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] rounded-full"
        initial={false}
        animate={isHovered ? { x: '0%' } : { x: '85%' }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      />
      
      {/* Text content - always on top with proper spacing from the pink edge */}
      <span className={`relative z-10 ${textColor} font-semibold tracking-wide`}>{children}</span>
      {showArrow && (
        <ArrowRight className={`relative z-10 w-4 h-4 ${textColor} transition-transform duration-300 group-hover:translate-x-0.5`} />
      )}
    </motion.button>
  );
}