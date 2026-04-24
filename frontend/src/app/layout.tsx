import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className="flex justify-between items-center p-6 bg-slate-900 text-white border-b border-emerald-500/30">
          <Link href="/" className="text-2xl font-bold text-emerald-400">ParaLux</Link>
          <div className="space-x-6">
            <Link href="/products" className="hover:text-emerald-400 transition">Produits</Link>
            <Link href="/diagnostic" className="bg-emerald-500 px-4 py-2 rounded-full text-slate-900 font-semibold hover:bg-emerald-400 transition">Diagnostic IA</Link>
            <Link href="/auth/login" className="hover:text-emerald-400 transition">Connexion</Link>
          </div>
        </nav>
        <main className="min-h-screen bg-slate-950 text-slate-100">{children}</main>
      </body>
    </html>
  );
}
