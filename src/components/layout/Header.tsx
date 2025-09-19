import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Church } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'history', label: 'História' },
    { id: 'pastorals', label: 'Pastorais' },
    { id: 'celebrations', label: 'Celebrações' },
    { id: 'blog', label: 'Blog' },
    { id: 'photos', label: 'Fotos' },
    { id: 'contact', label: 'Contato' }
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  // Função específica para Android com preventDefault e stopPropagation
  const handleMobileNavigate = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Força o fechamento do menu primeiro
    setIsMenuOpen(false);
    
    // Pequeno delay para garantir que o menu feche antes da navegação
    setTimeout(() => {
      onNavigate(section);
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-900/95 to-red-800/95 backdrop-blur-md shadow-lg safe-area-inset-top will-change-transform w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 w-full">
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => handleNavigate('home')}
            whileHover={{ scale: 1.05 }}
          >
            <Church className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-sm sm:text-lg">Catedral São Miguel Arcanjo</h1>
              <p className="text-blue-200 text-xs sm:text-sm">São Miguel Paulista</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-white font-bold text-sm">Catedral São Miguel</h1>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="text-white hover:text-blue-300 font-medium transition-colors duration-200 text-sm xl:text-base"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-blue-300 p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ touchAction: 'manipulation' }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-blue-700/50 bg-blue-900/98 backdrop-blur-md w-full max-w-full overflow-hidden"
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="mx-2 w-auto max-w-full"
                  whileHover={{ x: 10 }}
                >
                  <button
                    onClick={(e) => handleMobileNavigate(e, item.id)}
                    className="block w-full text-left px-4 py-3 text-white hover:text-blue-300 font-medium transition-colors duration-200 hover:bg-blue-800/50 rounded-lg touch-manipulation max-w-full overflow-hidden"
                    style={{ 
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      minHeight: '48px'
                    }}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};