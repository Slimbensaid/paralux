import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <h1 className="text-6xl font-extrabold tracking-tight text-white mb-6">
        La Beauté Précise, <br />
        <span className="text-emerald-400">Révélée par l'IA</span>
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mb-10">
        Ne devinez plus votre routine skincare. Obtenez un diagnostic dermatologique précis 
        grâce à notre moteur d'intelligence artificielle et accédez aux produits 
        parfaitement adaptés à votre profil unique.
      </p>
      <div className="flex gap-4">
        <Link href="/diagnostic" className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-400 transition-all transform hover:scale-105">
          Commencer le Diagnostic
        </Link>
        <Link href="/products" className="bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-bold border border-slate-700 hover:bg-slate-700 transition-all">
          Explorer le Catalogue
        </Link>
      </div>
    </div>
  );
}
