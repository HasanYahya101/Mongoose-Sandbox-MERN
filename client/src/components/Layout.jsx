import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Sidebar from './Sidebar';
import RequestPanel from './RequestPanel';
import ResponsePanel from './ResponsePanel';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTabId, setSelectedTabId] = useState(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex overflow-hidden relative">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`
                h-full border-r border-slate-200 dark:border-slate-700 overflow-y-auto
                lg:static lg:w-[280px]
                fixed inset-y-0 left-0 z-30 w-[280px] bg-slate-50 dark:bg-slate-900
              `}
            >
              <Sidebar onSelectEndpoint={(endpointId) => setSelectedTabId(endpointId)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/20 dark:bg-black/40 z-20"
            />
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="vertical">
            <Panel defaultSize={50} minSize={20}>
              <RequestPanel selectedEndpointId={selectedTabId} />
            </Panel>
            <PanelResizeHandle className="h-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-row-resize flex items-center justify-center">
              <div className="w-8 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            </PanelResizeHandle>
            <Panel defaultSize={50} minSize={20}>
              <ResponsePanel />
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
};

export default Layout;