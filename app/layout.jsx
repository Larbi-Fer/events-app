import { Inter } from "next/font/google";
import "@styles/globals.css";
import "@styles/navbar.css";
import Provider from "@components/shared/Provider";
import Navbar from "@components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    absolute: '',
    default: "Events - for share your events",
    template: '%s | Events-App'
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <section>
            {children}
          </section>
        </body>
      </html>
    </Provider>
  );
}
