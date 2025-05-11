import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const defaultRequest = {
  id: uuidv4(),
  name: 'New Request',
  url: `${BACKEND_URL}/api`,
  method: 'GET',
  headers: {},
  params: {},
  body: null,
  createdAt: new Date(),
};

const RequestContext = createContext({
  activeRequest: defaultRequest,
  updateRequest: () => { },
  response: null,
  isLoading: false,
  sendRequest: async () => { },
  collections: [],
  addCollection: () => { },
  addRequestToCollection: () => { },
  history: [],
  clearHistory: () => { },
  environments: [],
  activeEnvironment: null,
  setActiveEnvironment: () => { },
  saveRequest: () => { },
  loadRequest: () => { },
});

export const useRequest = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
  const [activeRequest, setActiveRequest] = useState(() => {
    const savedRequest = localStorage.getItem('activeRequest');
    return savedRequest ? JSON.parse(savedRequest) : defaultRequest;
  });

  /*useEffect(() => {
    console.log('Active Request:', activeRequest);
    // convert the body to string and also print
    if (typeof activeRequest.body === 'object') {
      console.log('Body:', JSON.stringify(activeRequest.body));
    } else {
      console.log('Body:', activeRequest.body);
    }

    // print url
    console.log('URL:', parseUrl(activeRequest.url));
  }, [activeRequest]);*/

  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [collections, setCollections] = useState(() => {
    const savedCollections = localStorage.getItem('collections');
    return savedCollections ? JSON.parse(savedCollections) : [];
  });

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('requestHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [environments, setEnvironments] = useState(() => {
    const savedEnvironments = localStorage.getItem('environments');
    return savedEnvironments ? JSON.parse(savedEnvironments) : [
      {
        id: uuidv4(),
        name: 'Default',
        variables: [],
        isActive: true
      }
    ];
  });

  const [activeEnvironment, setActiveEnvironment] = useState(() => {
    return environments.find(env => env.isActive) || null;
  });

  useEffect(() => {
    localStorage.setItem('activeRequest', JSON.stringify(activeRequest));
  }, [activeRequest]);

  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('requestHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('environments', JSON.stringify(environments));
  }, [environments]);

  const updateRequest = (requestData) => {
    setActiveRequest(prev => ({ ...prev, ...requestData }));
  };

  const saveRequest = () => {
    // Create copy to avoid modifying the original object
    const requestToSave = { ...activeRequest, id: uuidv4(), createdAt: new Date() };

    // Add to history
    setHistory(prev => [requestToSave, ...prev.slice(0, 19)]);

    toast.success('Request saved to history');
  };

  const loadRequest = (request) => {
    setActiveRequest(request);
    toast.success('Request loaded');
  };

  const replaceEnvironmentVariables = (text) => {
    if (!activeEnvironment || !text) return text;

    let result = text;
    activeEnvironment.variables.forEach(variable => {
      if (variable.enabled) {
        const regex = new RegExp(`\\{\\{${variable.key}\\}\\}`, 'g');
        result = result.replace(regex, variable.value);
      }
    });

    return result;
  };

  const parseUrl = (url) => {
    // Replace environment variables
    url = replaceEnvironmentVariables(url);

    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    return url;
  };

  const sendRequest = async () => {
    try {
      setIsLoading(true);

      const url = parseUrl(activeRequest.url);
      const method = activeRequest.method.toLowerCase();

      // Prepare headers
      const headers = {};
      Object.entries(activeRequest.headers).forEach(([key, value]) => {
        headers[key] = replaceEnvironmentVariables(value);
      });

      // Prepare params
      const params = {};
      Object.entries(activeRequest.params).forEach(([key, value]) => {
        params[key] = replaceEnvironmentVariables(value);
      });

      // Prepare body
      let body = activeRequest.body;
      if (typeof body === 'string') {
        body = replaceEnvironmentVariables(body);
        try {
          body = JSON.parse(body);
        } catch (e) {
          // Leave as string if not valid JSON
        }
      }

      const startTime = Date.now();

      // Send actual request using axios
      const res = await axios({
        url,
        method,
        headers,
        params,
        data: body,
        withCredentials: true,
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      const actualResponse = {
        status: res.status,
        statusText: res.statusText,
        data: res.data,
        headers: res.headers,
        time: duration,
        size: JSON.stringify(res.data).length,
      };

      setResponse(actualResponse);

      const historyItem = { ...activeRequest, id: uuidv4(), createdAt: new Date() };
      setHistory(prev => [historyItem, ...prev.slice(0, 19)]);

      toast.success('Request sent successfully');
    } catch (error) {
      console.error('Axios request error:', error);

      const errRes = error.response;
      if (errRes && errRes.status === 403) {
        toast.error('CORS error: Forbidden');
      } else {
        toast.error('Request failed');
      }

      setResponse({
        status: errRes?.status || 500,
        statusText: errRes?.statusText || 'Error',
        data: errRes?.data || { error: error.message },
        headers: errRes?.headers || {},
        time: 0,
        size: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addCollection = (name, description) => {
    const newCollection = {
      id: uuidv4(),
      name,
      description,
      requests: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setCollections(prev => [...prev, newCollection]);
    toast.success(`Collection "${name}" created`);
  };

  const addRequestToCollection = (collectionId, request) => {
    setCollections(prev =>
      prev.map(collection =>
        collection.id === collectionId
          ? {
            ...collection,
            requests: [...collection.requests, { ...request, id: uuidv4() }],
            updatedAt: new Date()
          }
          : collection
      )
    );
    toast.success('Request added to collection');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('requestHistory');
    toast.success('History cleared');
  };

  const setActiveEnvironmentById = (id) => {
    setEnvironments(prev =>
      prev.map(env => ({
        ...env,
        isActive: env.id === id
      }))
    );

    const newActiveEnv = environments.find(env => env.id === id);
    setActiveEnvironment(newActiveEnv || null);

    toast.success(`Environment "${newActiveEnv?.name}" activated`);
  };

  return (
    <RequestContext.Provider
      value={{
        activeRequest,
        updateRequest,
        response,
        isLoading,
        sendRequest,
        collections,
        addCollection,
        addRequestToCollection,
        history,
        clearHistory,
        environments,
        activeEnvironment,
        setActiveEnvironment: setActiveEnvironmentById,
        saveRequest,
        loadRequest
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};