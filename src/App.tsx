import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trends from './pages/Trends';
import Library from './pages/Library';
import Discover from './pages/Discover';
import Settings from './pages/Settings';

// Import the necessary context providers
import { SongProvider } from './contexts/SongContext.tsx';
import { PlaybackProvider } from './contexts/PlaybackContext.tsx';

function App() {
  return (
    <Router>
      <SongProvider>
        <PlaybackProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/library" element={<Library />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </PlaybackProvider>
      </SongProvider>
    </Router>
  );
}

export default App;

