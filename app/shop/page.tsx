'use client';

import { Box, Plus } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/components/site-shell';
import { products, type Product } from '@/lib/catalog';

function ProductVisual({ art, name }: Pick<Product, 'art' | 'name'>) {
  if (art === 'plaque') {
    return (
      <div className="plaque-placeholder" aria-label={`${name} placeholder rendering`}>
        <div className="plaque-copy">
          <Box className="size-11 text-[#00a5ff]" />
          <strong>3D product render</strong>
          <small>COMING SOON</small>
        </div>
        <p>Placeholder product imagery</p>
      </div>
    );
  }

  return (
    <div className={`product-photo ${art}`}>
      <Image src="/greyhat-store-reference.jpeg" alt={name} width={2048} height={1280} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b11]/40 via-transparent to-transparent" />
    </div>
  );
}

export default function ShopPage() {
  const { addToCart } = useCart();

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#060a10] py-16 sm:py-24">
        <div className="cyber-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a5ff]">{'// Supply cache'}</p>
          <h1 className="mt-4 text-[clamp(3.2rem,8vw,6.5rem)] font-black uppercase italic leading-[.86] tracking-[-0.055em] text-white">Shop the<br /><span className="text-[#00a5ff]">first drop.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#a7adb3] sm:text-lg">Small-batch apparel and desk gear made for labs, meetups, late-night builds, and everywhere in between.</p>
        </div>
      </section>

      <section className="bg-[#080d14] py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a5ff]">{'// Drop 001'}</p>
              <h2 className="mt-3 text-4xl font-black uppercase italic tracking-[-0.04em] text-white sm:text-5xl">Field-tested favorites.</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-[#848b94] md:block">The opening GreyHatGoods release. Limited runs, considered materials, no endless catalog noise.</p>
          </div>

          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="group bg-[#080d14] p-3">
                <div className="relative aspect-[4/4.45] overflow-hidden bg-[#111923]">
                  {product.tag && <span className="absolute left-4 top-4 z-10 bg-[#00a5ff] px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-black">{product.tag}</span>}
                  <ProductVisual art={product.art} name={product.name} />
                </div>
                <div className="px-2 pb-3 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#00a5ff]">{product.eyebrow}</p>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <div><h2 className="text-lg font-black uppercase italic tracking-[-0.02em] text-white">{product.name}</h2><p className="mt-1 text-xs text-[#848b94]">{product.detail}</p></div>
                    <span className="font-mono text-base font-bold text-white">${product.price}</span>
                  </div>
                  <button type="button" onClick={() => addToCart(product)} className="mt-5 flex h-11 w-full items-center justify-center gap-2 border border-white/15 text-xs font-black uppercase tracking-[0.12em] text-white transition-colors hover:border-[#00a5ff] hover:bg-[#00a5ff] hover:text-black">
                    <Plus className="size-4" /> Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
