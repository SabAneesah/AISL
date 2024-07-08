import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from an API or local storage
    const fetchData = async () => {
      const response = await fetch('/api/user'); // Replace with your API endpoint
      const data = await response.json();
      setUser(data);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ user }}>
      {children}
    </DataContext.Provider>
  );
};
