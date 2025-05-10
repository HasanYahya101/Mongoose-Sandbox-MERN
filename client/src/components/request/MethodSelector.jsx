import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];

const MethodSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (method) => {
    onChange(method);
    setIsOpen(false);
  };

  return (
    <div className="relative w-28" ref={ref}>
      <button
        className={`method-button method-${value} w-full h-10 flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled
      >
        <span className='ml-4'>{value}</span>
        <ChevronRight size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-1 w-full bg-white dark:bg-slate-700 shadow-lg rounded-md overflow-hidden z-50 border border-slate-200 dark:border-slate-600"
          >
            <ul role="listbox">
              {METHODS.map((method) => (
                <li key={method}>
                  <button
                    type="button"
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors ${method === value ? 'bg-slate-100 dark:bg-slate-600 font-medium' : ''
                      }`}
                    onClick={() => handleSelect(method)}
                  >
                    <span className={`method-${method} px-2 py-0.5 rounded`}>{method}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MethodSelector;