import React from 'react';
import { Menu, Moon, Sun, Database, Copy, ChevronsLeft, ChevronsRight, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { SidebarTrigger } from './ui/sidebar';

const Navbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = React.useState(window.innerWidth >= 445);

  React.useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 445);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1024);

  React.useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(newIsDesktop);
      // If switching to desktop, ensure sidebar is open
      if (newIsDesktop) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 z-40 relative">
      <div className="flex items-center space-x-2">
        {isDesktop ? (
          <SidebarTrigger />
        ) : (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
        )}
        {isVisible && (
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 5 }}
            >
              <Database size={24} className="text-blue-500" />
            </motion.div>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-white"
            >MongoDB API Tester</h1>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => {
            window.open('https://github.com/HasanYahya101/Mongoose-Sandbox-MERN', '_blank');
          }}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          className="text-sm px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
        >
          <Github size={20} className="inline mr-0" />
          GitHub
        </Button>

        <Button
          onClick={toggleTheme}
          variant='ghost'
          className="rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors h-10 w-10"
          aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme.isDark ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-slate-600" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;