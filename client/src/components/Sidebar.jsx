import React, { useEffect, useState } from 'react';
import { getEndpointsByCategory } from '../data/endpoints';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Clock, Package, PlayCircle } from 'lucide-react';
import { endpoints } from '../data/endpoints';
import { SidebarInput, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';

const Sidebar = ({ onSelectEndpoint }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const rawEndpointsByCategory = getEndpointsByCategory();

  const endpointsByCategory = Object.entries(rawEndpointsByCategory).reduce((acc, [category, endpoints]) => {
    const lowerQuery = searchQuery.toLowerCase();
    const categoryMatches = category.toLowerCase().includes(lowerQuery);
    const filtered = endpoints.filter(endpoint =>
      categoryMatches || endpoint.name.toLowerCase().includes(lowerQuery)
    );

    if (filtered.length > 0) {
      acc[category] = filtered;
    }

    return acc;
  }, {});

  const [expandedCategories, setExpandedCategories] = useState(() => {
    const expanded = {};
    Object.keys(endpointsByCategory).forEach(category => {
      expanded[category] = true;
    });
    return expanded;
  });

  const [activeTab, setActiveTab] = useState('endpoints');

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getMethodColor = (method) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'text-green-500';
      case 'POST':
        return 'text-blue-500';
      case 'PUT':
        return 'text-amber-500';
      case 'DELETE':
        return 'text-red-500';
      case 'PATCH':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  useEffect(() => {
    const id = localStorage.getItem('selectedEndpointId');
    if (id && endpoints.some(endpoint => endpoint.id === id)) {
      onSelectEndpoint(id);
      localStorage.setItem('selectedEndpointId', id);
    } else {
      const resetEndpoint = rawEndpointsByCategory['Utility'].find(endpoint => endpoint.name === 'resetDatabase');
      if (resetEndpoint) {
        onSelectEndpoint(resetEndpoint.id);
        localStorage.setItem('selectedEndpointId', resetEndpoint.id);
      }
    }
  }, []);

  const [isLg, setIsLg] = React.useState(window.innerWidth >= 1024);

  const handleResize = () => {
    setIsLg(window.innerWidth >= 1024);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <div className="overflow-y-auto flex-1 p-2 mt-14">
        {activeTab === 'endpoints' && (
          <>
            {isLg === true && (<div className="mb-4">
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mt-1 pl-3 pr-8 text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>)}
            {!isLg && (
              <div className="mt-1.5"></div>)
            }

            {Object.entries(endpointsByCategory).map(([category, endpoints]) => (
              <div key={category} className="mb-2">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-2 text-sm font-medium rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center">
                    {expandedCategories[category] ? (
                      <ChevronDown size={16} className="mr-2 text-slate-400" />
                    ) : (
                      <ChevronRight size={16} className="mr-2 text-slate-400" />
                    )}
                    <span className="text-slate-700 dark:text-slate-300">{category}</span>
                  </div>
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs px-2 py-1 rounded-full">
                    {endpoints.length}
                  </span>
                </button>

                <AnimatePresence>
                  {expandedCategories[category] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden ml-6"
                    >
                      {endpoints.map(endpoint => (
                        <button
                          key={endpoint.id}
                          onClick={() => {
                            onSelectEndpoint(endpoint.id);
                            localStorage.setItem('selectedEndpointId', endpoint.id);
                          }}
                          className="w-full text-left p-2 text-sm rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center group/see my-1"
                        >
                          <span className={`mr-2 font-medium ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 truncate flex-1">
                            {endpoint.name}
                          </span>
                          <PlayCircle
                            size={16}
                            className="text-blue-500 opacity-0 group-hover/see:opacity-100 transition-opacity"
                          />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default Sidebar;