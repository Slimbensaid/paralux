'use client';
import { useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

const QUESTIONS = [
  { id: 'skinType', label: 'Quel est votre type de peau ?', options: ['Dry', 'Oily', 'Mixed', 'Unknown'] },
  { id: 'sensitivity', label: 'Niveau de sensibilité ?', options: ['Low', 'Medium', 'High'] },
  { id: 'concerns', label: 'Préoccupations principales ?', options: ['Acne', 'Wrinkles', 'Spots', 'Texture'], multiple: true },
  { id: 'ageRange', label: 'Tranche d'âge ?', options: ['18-25', '26-35', '36-45', '46+'] },
  { id: 'environment', label: 'Environnement dominant ?', options: ['Urban', 'Rural', 'Humid', 'Dry'] },
];

export default function DiagnosticPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (option: string) => {
    const q = QUESTIONS[step];
    if (q.multiple) {
      const current = answers[q.id] || [];
      setAnswers({ ...answers, [q.id]: current.includes(option) ? current.filter(i => i !== option) : [...current, option] });
    } else {
      setAnswers({ ...answers, [q.id]: option });
    }
  };

  const finishQuiz = async () => {
    setLoading(true);
    try {
      const res = await api.post('/diagnostic/analyze', answers);
      setResult(res.data);
    } catch (e) {
      alert('Erreur lors du diagnostic');
    } finally {
      setLoading(false);
    }
  };

  if (result) return (
    <div className="max-w-4xl mx-auto p-8 text-center animate-in fade-in duration-500">
      <h2 className="text-4xl font-bold text-emerald-400 mb-4">Votre Diagnostic ParaLux</h2>
      <div className="bg-slate-900 p-6 rounded-2xl border border-emerald-500/30 mb-8">
        <p className="text-2xl mb-2">Type de peau détecté : <span className="font-bold text-white">{result.result.detectedSkinType}</span></p>
        <p className="text-slate-400 italic">"{result.result.advice}"</p>
      </div>
      <h3 className="text-2xl font-semibold mb-6 text-left">Produits recommandés pour vous :</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {result.result.recommendations.map((id: string) => (
          <div key={id} className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-center">
             <p className="text-slate-400 text-sm">Produit ID: {id}</p>
             <Link href={`/products/${id}`} className="text-emerald-400 font-medium hover:underline">Voir le produit →</Link>
          </div>
        ))}
      </div>
      <button onClick={() => setResult(null)} className="mt-10 text-slate-500 underline">Refaire le test</button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-8 py-20">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Diagnostic IA</h1>
        <span className="text-slate-500 font-mono">Étape {step + 1} / {QUESTIONS.length}</span>
      </div>
      
      <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <h2 className="text-2xl mb-8 text-slate-200">{QUESTIONS[step].label}</h2>
        <div className="grid grid-cols-1 gap-4">
          {QUESTIONS[step].options.map(opt => (
            <button 
              key={opt} 
              onClick={() => handleSelect(opt)}
              className={`p-4 rounded-xl text-left transition-all ${ (answers[QUESTIONS[step].id]?.includes ? answers[QUESTIONS[step].id]?.includes(opt) : answers[QUESTIONS[step].id] === opt) ? 'bg-emerald-500 text-slate-900 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700' }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-10 flex justify-between">
          <button disabled={step === 0} onClick={() => setStep(step - 1)} className="text-slate-500 disabled:opacity-0">Précédent</button>
          {step < QUESTIONS.length - 1 ? 
            <button onClick={() => setStep(step + 1)} className="bg-emerald-500 px-6 py-2 rounded-full text-slate-900 font-bold">Suivant</button> :
            <button onClick={finishQuiz} disabled={loading} className="bg-emerald-500 px-6 py-2 rounded-full text-slate-900 font-bold animate-pulse">
              {loading ? 'Analyse IA...' : 'Obtenir mon résultat'}
            </button>
          }
        </div>
      </div>
    </div>
  );
}
