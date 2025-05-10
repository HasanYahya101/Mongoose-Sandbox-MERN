import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useRequest } from '../contexts/RequestContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Download, Copy, Check, ChevronRight, ChevronDown, SaveIcon } from 'lucide-react';

const ResponsePanel = () => {
  const { theme } = useTheme();
  const { response, isLoading } = useRequest();
  const [activeTab, setActiveTab] = useState('body');
  const [copied, setCopied] = useState(false);
  const [showStatusDetails, setShowStatusDetails] = useState(false);

  const handleCopyResponse = () => {
    if (!response) return;

    navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    if (status >= 300 && status < 400) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    if (status >= 400 && status < 500) return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
    if (status >= 500) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 overflow-hidden">
      {!response && !isLoading ? (
        <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
          <div className="text-center">
            <Download size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Send a request to see the response</p>
          </div>
        </div>
      ) : (
        <>
          <div className="border-b border-slate-200 dark:border-slate-700 p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {response && (
                  <>
                    <div className={`px-3 py-1 rounded-md font-medium text-sm ${getStatusColor(response.status)}`}>
                      {response.status} {response.statusText}
                    </div>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                      <Clock size={16} className="mr-1" />
                      <span>{response?.time || 0} ms</span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                      Size: {response ? (response.size / 1024).toFixed(2) : 0} KB
                    </div>
                  </>
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-500 dark:text-slate-400 text-sm flex items-center"
                  >
                    <div className="mr-2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading response...
                  </motion.div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyResponse}
                  disabled={!response || isLoading}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
                <button
                  disabled={!response || isLoading}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SaveIcon size={16} />
                </button>
                <button
                  onClick={() => setShowStatusDetails(!showStatusDetails)}
                  disabled={!response}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showStatusDetails ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showStatusDetails && response && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-md overflow-hidden text-sm"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Status</h4>
                      <p className={`inline-block px-2 py-0.5 rounded ${getStatusColor(response.status)}`}>
                        {response.status} {response.statusText}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Time</h4>
                      <p className="text-slate-700 dark:text-slate-300">{response.time} ms</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Size</h4>
                      <p className="text-slate-700 dark:text-slate-300">{(response.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Server</h4>
                      <p className="text-slate-700 dark:text-slate-300">{response.headers['server'] || 'Unknown'}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex">
              <button
                className={`px-4 py-2 text-sm border-b-2 transition-colors ${activeTab === 'body'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                  }`}
                onClick={() => setActiveTab('body')}
              >
                Body
              </button>
              <button
                className={`px-4 py-2 text-sm border-b-2 transition-colors ${activeTab === 'headers'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                  }`}
                onClick={() => setActiveTab('headers')}
              >
                Headers
              </button>
              <button
                className={`px-4 py-2 text-sm border-b-2 transition-colors ${activeTab === 'tests'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                  }`}
                onClick={() => setActiveTab('tests')}
              >
                Tests
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
                  <p className="text-slate-500 dark:text-slate-400">Loading response...</p>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'body' && response && (
                  <div className="h-full">
                    <SyntaxHighlighter
                      language="json"
                      style={theme.isDark ? vscDarkPlus : vs}
                      customStyle={{
                        margin: 0,
                        padding: '16px',
                        height: '100%',
                        fontSize: '14px',
                        backgroundColor: theme.isDark ? '#0f172a' : '#fff',
                        borderRadius: 0,
                      }}
                    >
                      {JSON.stringify(response.data, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                )}

                {activeTab === 'headers' && response && (
                  <div className="p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b border-slate-200 dark:border-slate-700">
                          <th className="pb-2 font-medium text-slate-500 dark:text-slate-400 w-1/3">Key</th>
                          <th className="pb-2 font-medium text-slate-500 dark:text-slate-400">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(response.headers).map(([key, value]) => (
                          <tr key={key} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-2 font-mono text-slate-700 dark:text-slate-300">{key}</td>
                            <td className="py-2 text-slate-700 dark:text-slate-300">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'tests' && (
                  <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                    <p>No tests have been written for this request</p>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResponsePanel;