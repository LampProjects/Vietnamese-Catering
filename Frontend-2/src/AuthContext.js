// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

//STEP 1: store TOKEN in the context
export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});
