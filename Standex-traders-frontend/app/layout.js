import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Head from "next/head";

import 'animate.css';
import { AuthProvider } from "./context/AuthContext";
import Whatsapp from "./components/ui/Whatsapp";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Standex traders ",
  description: "This is home page of standex traders",
};

export default function RootLayout({ children }) {
  return (
    
    
   <html lang="en" >

      <AuthProvider>
      <body className={inter.className}>
<Header/>
        {children}
        <Whatsapp/>
        <Footer/>
        </body>
        </AuthProvider>
    </html>
    
  );
}
