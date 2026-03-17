import { motion } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { PrimaryButton } from '@/app/components/buttons/PrimaryButton';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[100] md:hidden bg-[rgba(10,10,18,0.78)] backdrop-blur-[14px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#B44CFF]/6 via-[#5A7CFF]/3 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#5A7CFF]/6 via-[#B44CFF]/3 to-transparent opacity-50 pointer-events-none" />
      
      <div className="relative h-full overflow-y-auto flex flex-col">
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-white/90" />
          </button>
        </div>
        
        <nav className="flex-1 flex flex-col justify-center px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="text-[13px] tracking-[0.4em] uppercase mb-12 font-extralight text-center spectral-drift"
          >
            SELECT DESTINATION
          </motion.div>
          
          {[
            { label: "Services",   href: "#services"                        },
  { label: "Work",       href: "#Work"                            },
  { label: "About Us",   href: "https://melangedigital.co/about"  },
  { label: "Blogs",      href: "https://melangedigital.co/blogs"  },
  { label: "Careers",    href: "https://melangedigital.co/careers"},
          ].map((link, index) => (
            <div key={link.label}>
              <motion.a
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                onClick={onClose}
                whileTap={{ scale: 0.98 }}
                className="group relative py-5 text-left block"
              >
                <motion.div
                  className="absolute -inset-2 rounded-lg opacity-0 group-active:opacity-100 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileTap={{ 
                    opacity: [0, 1, 0],
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B44CFF]/20 via-[#5A7CFF]/20 to-[#B44CFF]/20 blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B44CFF]/30 via-[#5A7CFF]/30 to-[#B44CFF]/30 blur-md" />
                </motion.div>
                
                <span className="block text-[21px] font-light tracking-[0.12em] uppercase transition-all duration-300 relative z-10 text-white/85">
                  {link.label}
                </span>
                
                <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-[#B44CFF]/60 via-[#5A7CFF]/60 to-[#B44CFF]/60 transition-all duration-500 mt-2 opacity-60" />
              </motion.a>
              
              {index < 4 && (
                <div className="h-px w-full my-1 bg-white/[0.06]" />
              )}
            </div>
          ))}
        </nav>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="px-8 pb-10"
        >
          <PrimaryButton className="w-full" onClick={onClose}>
            Contact Us
          </PrimaryButton>
        </motion.div>
      </div>
    </motion.div>
  );
}