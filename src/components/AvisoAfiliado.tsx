import React from "react";

type Props = {
  variant?: "curto" | "medio" | "completo";
  className?: string;
};

export default function AvisoAfiliado({ variant = "medio", className = "" }: Props) {
  const title = "Aviso de Afiliado";

  const textCurto =
    "Alguns links neste site são links de afiliado. Isso significa que posso receber uma comissão se você comprar por eles, sem custo extra pra você.";

  const textMedio =
    "O PohOfertas divulga promoções e reviews com links de afiliado. Quando você compra através desses links, eu posso receber uma comissão — isso não muda o preço pra você e ajuda a manter o projeto no ar, trazendo mais ofertas e conteúdos.";

  const textCompleto =
    "Transparência é prioridade por aqui. O PohOfertas trabalha com programas de afiliados de lojas e plataformas parceiras. Em alguns conteúdos, usamos links de afiliado — ou seja, se você clicar e comprar, eu posso receber uma comissão. Você não paga nada a mais por isso, e isso ajuda a manter o projeto no ar com mais ofertas e reviews.";

  const body =
    variant === "curto" ? textCurto : variant === "completo" ? textCompleto : textMedio;

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 ${className}`}
      aria-label={title}
    >
      <div className="mb-1 text-xs font-semibold tracking-wide text-white/70">
        {title}
      </div>
      <p className="leading-relaxed">{body}</p>
    </section>
  );
}
