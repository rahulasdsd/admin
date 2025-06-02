import React from 'react';
import { useAuth } from './AuthContext';

function Home() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <h2>Welcome, {currentUser?.name}!</h2>
      <p>Email: {currentUser?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;