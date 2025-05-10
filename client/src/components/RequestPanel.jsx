import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { getEndpointById } from '../data/endpoints';
import { useRequest } from '../contexts/RequestContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, PlusCircle, Save, Code, Database, PlayCircle, ChevronDown, ChevronUp } from 'lucide-react';
import MethodSelector from './request/MethodSelector';
import { useTheme } from '../contexts/ThemeContext';

const RequestPanel = ({ selectedEndpointId }) => {
  const { theme } = useTheme();
  const {
    activeRequest,
    updateRequest,
    sendRequest,
    isLoading
  } = useRequest();

  const [activeTab, setActiveTab] = useState('body');
  const [bodyFormat, setBodyFormat] = useState('json');
  const [showPathParams, setShowPathParams] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  // get base path from environment variable
  const basePath = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (selectedEndpointId) {
      const endpoint = getEndpointById(selectedEndpointId);
      if (endpoint) {
        setSelectedEndpoint(endpoint);
        const initialBody = endpoint.exampleRequest ? JSON.stringify(endpoint.exampleRequest, null, 2) : '';
        setBodyInput(initialBody);
        updateRequest({
          url: `${basePath}${endpoint.path}`,
          method: endpoint.method,
          body: endpoint.exampleRequest || null
        });

        if (endpoint.method === 'GET') {
          setActiveTab('params');
        } else {
          setActiveTab('body');
        }
      }
    }
  }, [selectedEndpointId]);


  const handleMethodChange = (method) => {
    updateRequest({ method });
  };

  const handleUrlChange = (e) => {
    updateRequest({ url: e.target.value });
  };

  const handleBodyChange = (value) => {
    try {
      const parsedBody = value ? JSON.parse(value) : null;
      updateRequest({ body: parsedBody });
    } catch (e) {
      // Allow invalid JSON during editing
      updateRequest({ body: value || null });
    }
  };

  const getBodyString = () => {
    if (typeof activeRequest.body === 'string') {
      return activeRequest.body;
    }
    return activeRequest.body ? JSON.stringify(activeRequest.body, null, 2) : '';
  };

  const [bodyInput, setBodyInput] = useState('');

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2 mb-2">
          <MethodSelector
            value={activeRequest.method}
            onChange={handleMethodChange}
          />

          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full h-10 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter request URL"
              value={activeRequest.url}
              onChange={handleUrlChange}
              disabled
            />
          </div>

          <button
            className="px-4 py-2 h-10 bg-blue-500 method-button hover:bg-blue-600 text-white rounded-md transition-colors flex items-center"
            onClick={() => sendRequest()}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <PlayCircle size={18} />
              </motion.div>
            ) : (
              <Send size={18} className="mr-2" />
            )}
            Send
          </button>
        </div>

        {selectedEndpoint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-slate-500 dark:text-slate-400 mt-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{selectedEndpoint.name}</span>
                <span className="mx-2">•</span>
                <span>{selectedEndpoint.description}</span>
              </div>
              <button
                onClick={() => setShowPathParams(!showPathParams)}
                className="text-blue-500 hover:text-blue-600 transition-colors flex items-center"
              >
                {showPathParams ? (
                  <>
                    <ChevronUp size={16} className="mr-1" />
                    <span>Hide Details</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="mr-1" />
                    <span>Show Details</span>
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {showPathParams && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-md overflow-hidden"
                >
                  <h3 className="font-medium mb-2">Endpoint Details</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Path</h4>
                      <p className="text-slate-700 dark:text-slate-300 font-mono">{selectedEndpoint.path}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Method</h4>
                      <p className={`font-mono ${getMethodColor(selectedEndpoint.method)}`}>{selectedEndpoint.method}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Category</h4>
                      <p className="text-slate-700 dark:text-slate-300">{selectedEndpoint.category}</p>
                    </div>
                  </div>

                  {selectedEndpoint.params && selectedEndpoint.params.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Parameters</h4>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="font-medium text-slate-500">Name</div>
                        <div className="font-medium text-slate-500">Type</div>
                        <div className="font-medium text-slate-500">Required</div>
                        <div className="font-medium text-slate-500">Description</div>

                        {selectedEndpoint.params.map((param, index) => (
                          <React.Fragment key={index}>
                            <div className="font-mono text-slate-700 dark:text-slate-300">{param.name}</div>
                            <div className="text-blue-500">{param.type}</div>
                            <div>{param.required ? '✓' : '✗'}</div>
                            <div className="text-slate-600 dark:text-slate-400">{param.description}</div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEndpoint.body && selectedEndpoint.body.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-xs uppercase text-slate-400 mb-1">Body</h4>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="font-medium text-slate-500">Name</div>
                        <div className="font-medium text-slate-500">Type</div>
                        <div className="font-medium text-slate-500">Required</div>
                        <div className="font-medium text-slate-500">Description</div>

                        {selectedEndpoint.body.map((field, index) => (
                          <React.Fragment key={index}>
                            <div className="font-mono text-slate-700 dark:text-slate-300">{field.name}</div>
                            <div className="text-blue-500">{field.type}</div>
                            <div>{field.required ? '✓' : '✗'}</div>
                            <div className="text-slate-600 dark:text-slate-400">{field.description}</div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">

        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-2 border-b border-slate-200 dark:border-slate-700">
            <div className="flex">
              <span
                className={`px-3 py-1 text-xs rounded-md ${bodyFormat === 'json'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
                  }`}
              >
                JSON
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <Editor
              language="json"
              value={bodyInput}
              onChange={(value) => {
                setBodyInput(value);
                try {
                  const parsed = JSON.parse(value);
                  updateRequest({ body: parsed });
                } catch {
                  updateRequest({ body: value });
                }
              }}
              theme={theme.isDark ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
                formatOnPaste: true,
                formatOnType: true,
                autoIndent: true,
                padding: { top: 10 }
              }}
              className="h-full"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get method color
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

export default RequestPanel;