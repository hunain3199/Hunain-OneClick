import React, { createContext, useContext, useState } from 'react'

export const Usercontext=createContext()
export const UserProvider=Usercontext.Provider
export default function userdetails(){
  return useContext(Usercontext)
  }