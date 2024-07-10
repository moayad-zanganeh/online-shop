import { ReactNode } from 'react';
import Header from './Header';
import Footer from './footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen mx-auto " dir="rtl">
      <Header />

      <main className="container flex-grow mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
