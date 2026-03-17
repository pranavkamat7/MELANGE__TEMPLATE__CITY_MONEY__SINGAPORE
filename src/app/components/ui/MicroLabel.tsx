interface MicroLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function MicroLabel({ children, className = '' }: MicroLabelProps) {
  return (
    <div className={`text-xs tracking-[0.4em] uppercase font-extralight spectral-drift ${className}`}>
      {children}
    </div>
  );
}
