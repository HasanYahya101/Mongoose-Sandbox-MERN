import React from 'react';
import { Menu, Moon, Sun, Database, Copy, ChevronsLeft, ChevronsRight, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const Navbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 z-10">
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors rounded-full"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-slate-600 dark:text-slate-300" />
        </button>

        <div className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 5 }}
          >
            <Database size={24} className="text-blue-500" />
          </motion.div>
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">MongoDB API Tester</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          href="https://github.com/HasanYahya101/"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          className="text-sm px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
        >
          <Github size={20} className="inline mr-0" />
          GitHub
        </Button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme.isDark ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-slate-600" />
          )}
        </button>
      </div>
    </header >
  );
};

export default Navbar;