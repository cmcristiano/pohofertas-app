import React from 'react';
import { RefreshCw, Hammer } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans">
      
      {/* LOGO ANIMADO */}
      <div className="mb-10 animate-bounce">
         <svg viewBox="0 0 260 50" className="w-[200px] md:w-[280px]" fill="none">
             <g transform="translate(0, 5)">
                <path d="M5 20C5 14.4772 9.47715 10 15 10H30L50 30L30 50H15C9.47715 50 5 45.5228 5 40V20Z" fill="#FF6600" transform="rotate(-15 25 30)"/>
                <circle cx="18" cy="12" r="3" fill="white" transform="rotate(-15 25 30) translate(0, 5)" />
                <path d="M18 28L24 34L36 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-5 25 30) translate(2, 2)"/>
             </g>
             <text x="60" y="36" fontFamily="Segoe UI" fontWeight="800" fontSize="32" fill="#0A192F" letterSpacing="-0.5">PohOfertas</text>
         </svg>
      </div>

      {/* AVISO PRINCIPAL */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-4 rounded-full">
                <Hammer className="text-[#FF6600]" size={40} />
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-gray-800 mb-4">
            Estamos em Manutenção
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            "Em breve você vai parar de caçar ofertas e encontrar tudo num único site..." 🧡
          </p>

          <div className="text-sm text-gray-400 border-t pt-4">
             Estamos atualizando os preços para garantir a sua economia. <br/>
             <span className="font-bold text-[#FF6600]">Voltamos em instantes!</span>
          </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-gray-400 text-sm">
        <RefreshCw className="animate-spin" size={16}/>
        Trabalhando nos bastidores...
      </div>

    </div>
  );
};

export default App;