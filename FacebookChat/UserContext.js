import React, { createContext, useState } from 'react';

// Tạo một Context
export const UserContext = createContext();

// Tạo một Provider cho Context
export const UserProvider = ({ children }) => {
  const [userCurrent, setUserCurrent] = useState(null); // Lưu thông tin người dùng

  return (
    <UserContext.Provider value={{ userCurrent, setUserCurrent }}>
      {children}
    </UserContext.Provider>
  );
};
