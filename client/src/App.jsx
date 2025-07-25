import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { RequestProvider } from './contexts/RequestContext';
import Layout from './components/Layout';
import { SidebarProvider } from './components/ui/sidebar';

function App() {
  return (
    // All contexts
    <ThemeProvider>
      <RequestProvider>
        <SidebarProvider defaultOpen={true} className='min-w-[100vw]'>
          <div className="min-h-screen min-w-[100vw] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <Layout />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: '8px',
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
              }}
            />
          </div>
        </SidebarProvider>
      </RequestProvider>
    </ThemeProvider>
  );
}

export default App;