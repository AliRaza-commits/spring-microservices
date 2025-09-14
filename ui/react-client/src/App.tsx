import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import DetailPage from './Components/DetailPage';
import Box from '@mui/material/Box';
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import SchoolDetail from './pages/School';
import StudenDetail from './pages/Student';
import { useAuth } from './hooks/useAuth';
import WelcomePage from './pages/Welcome';
import LoginPage from './pages/LoginPage';
import SchoolCreate from './pages/SchoolCreate';
import StudentCreate from './pages/StudentCreate';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Inbox'); // Default item
  const navigate = useNavigate();
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated ?? false;

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleItemClick = (item: string, path: string) => {
    setSelectedItem(item);
    setIsSidebarOpen(false);
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {isAuthenticated && <Navbar onMenuClick={handleMenuClick} /> }
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar
          open={isSidebarOpen}
          onClose={handleSidebarClose}
          onItemClick={handleItemClick}
        />
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
           <Routes>
              <Route path="/" element={ isAuthenticated ? <WelcomePage/> : <LoginPage/>  }></Route>
              <Route path="/school" element={<SchoolDetail /> }></Route>
              <Route path="/school/create" element={<SchoolCreate type={'create'} /> }></Route>
              <Route path="/school/edit/:id" element={<SchoolCreate type={'edit'} /> }></Route>
              <Route path="/student" element={<StudenDetail /> }></Route>
              <Route path="/student/create" element={<StudentCreate type={'create'} /> }></Route>
              <Route path="/student/edit/:id" element={<StudentCreate type={'edit'} /> }></Route>
            </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;