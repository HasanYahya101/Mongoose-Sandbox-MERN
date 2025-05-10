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

      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full border-r border-slate-200 dark:border-slate-700 overflow-y-auto"
            >
              <Sidebar onSelectEndpoint={(endpointId) => setSelectedTabId(endpointId)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="vertical">
            <Panel defaultSize={50} minSize={20}>
              <RequestPanel selectedEndpointId={selectedTabId} />
            </Panel>
            <PanelResizeHandle className="h-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-row-resize flex items-center justify-center">
              <div className="w-8 h-1 rounded-full bg-slate-300 dark:bg-slate-900" />
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