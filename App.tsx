import React from 'react';
import { RefreshCw, Hammer, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import AvisoAfiliado from './components/AvisoAfiliado';

// ✅ CONFIG (opcional)
const SHOW_WHATSAPP_BUTTON = false; // true = mostra botão
const WHATSAPP_LINK =
  'https://wa.me/5571982598343?text=Ol%C3%A1%20Cris!%20Vi%20o%20PohOfertas%20e%20quero%20entrar%20na%20lista%20VIP.';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">

      {/* GLOW / LUZES NO FUNDO */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[420px] h-[420px] bg-orange-500/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[520px] h-[520px] bg-blue-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,102,0,0.12),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.10),transparent_50%)]" />

      <div className="w-full max-w-2xl relative z-10">

        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-orange-500/20 rounded-full" />
            <svg viewBox="0 0 260 50" className="w-[210px] md:w-[280px] relative" fill="none">
              <g transform="translate(0, 5)">
                <path
                  d="M5 20C5 14.4772 9.47715 10 15 10H30L50 30L30 50H15C9.47715 50 5 45.5228 5 40V20Z"
                  fill="#FF6600"
                  transform="rotate(-15 25 30)"
                />
                <circle cx="18" cy="12" r="3" fill="white" transform="rotate(-15 25 30) translate(0, 5)" />
                <path
                  d="M18 28L24 34L36 18"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="rotate(-5 25 30) translate(2, 2)"
                />
              </g>
              <text
                x="60"
                y="36"
                fontFamily="Segoe UI"
                fontWeight="800"
                fontSize="32"
                fill="#ffffff"
                letterSpacing="-0.5"
              >
                PohOfertas
              </text>
            </svg>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

          {/* TOP BAR */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <Sparkles size={14} className="text-orange-400" />
              ATUALIZAÇÃO EM ANDAMENTO
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-white/70">
              <ShieldCheck size={14} className="text-green-400" />
              Preços sendo revisados
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="p-7 md:p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-500/15 p-4 rounded-2xl border border-orange-500/20 shadow-inner">
                <Hammer className="text-orange-400" size={42} />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              Site em manutenção 🛠️
            </h1>

            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              Em breve você vai parar de <span className="text-orange-300 font-bold">caçar ofertas</span> e encontrar
              <span className="text-orange-300 font-bold"> tudo num único site</span>. 🧡
            </p>

            <div className="bg-black/25 border border-white/10 rounded-2xl p-5 text-sm text-white/75">
              Estamos ajustando valores e links para garantir que você veja o preço real antes de comprar.
              <div className="mt-2 font-bold text-orange-300">Voltamos em breve.</div>
            </div>

            {SHOW_WHATSAPP_BUTTON && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-black py-3.5 rounded-xl hover:brightness-95 active:scale-[0.99] transition border-b-4 border-[#128c7e]"
              >
                <MessageCircle size={18} />
                Entrar no VIP pelo WhatsApp
              </a>
            )}
          </div>

          {/* RODAPÉ */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-center gap-2 text-white/60 text-sm">
            <RefreshCw className="animate-spin" size={16} />
            Trabalhando nos bastidores…
          </div>
        </div>

        {/* microtexto */}
        <p className="text-center text-xs text-white/35 mt-5">
          PohOfertas © 2026 — economia com pé no chão.
        </p>

        {/* AVISO AFILIADO (BLINDADO) */}
        <div className="mt-4">
          <AvisoAfiliado variant="medio" />
        </div>

      </div>
    </div>
  );
};

export default App;
