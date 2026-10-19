import Header from "@/components/Header";
import { inter, poppins } from "@/app/fonts";
import '../globals.css'
import Footer from "@/components/Footer";

export const metadata = {
  title: 'LinkTri Clone',
  description: 'Share your links, social profiles, contact info and more on one page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <main>
          <Header />
          <div className="max-w-6xl mx-auto p-6 flex flex-col min-h-screen">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
