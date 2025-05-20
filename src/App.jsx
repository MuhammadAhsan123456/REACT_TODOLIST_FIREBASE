import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Heading from "./components/Heading";
import TodoList from "./components/TodoList";
import Login from './components/Login';
import LogoutButton from './components/LogoutButton'; // ✅ Import logout
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsub();
  }, []);

  return (
    <BrowserRouter>
      <div className="App font-Poppins container py-16 px-6 min-h-screen mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <LogoutButton /> {/* ✅ Show logout */}
                  <Heading />
                  <TodoList />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
