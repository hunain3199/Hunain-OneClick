import { Inter } from "next/font/google";
import "./globals.css";
// import AppProvider from "./components/AppContext";
import { AuthProvider } from "./store/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "One Click Digital",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <main className="max-w-5xl max-h-screen mx-auto"> */}
        <main>
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}