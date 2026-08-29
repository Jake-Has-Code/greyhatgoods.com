'use client';

import {
  ArrowRight,
  Box,
  Check,
  ChevronDown,
  Code2,
  LockKeyhole,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Terminal,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type Product = {
  id: string;
  name: string;
  eyebrow: string;
  price: number;
  detail: string;
  art: 'tee-dark' | 'tee-blue' | 'plaque';
  tag?: string;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  {
    id: 'terminal-tee',
    name: 'Terminal State Tee',
    eyebrow: 'Heavyweight cotton',
    price: 32,
    detail: 'Relaxed unisex fit · Onyx',
    art: 'tee-dark',
    tag: 'First drop',
  },
  {
    id: 'curious-tee',
    name: 'Tools for the Curious Tee',
    eyebrow: 'Soft-washed cotton',
    price: 34,
    detail: 'Classic fit · Cyber blue ink',
    art: 'tee-blue',
  },
  {
    id: 'plaque',
    name: 'GreyHat Desk Plaque',
    eyebrow: '3D printed · Made to order',
    price: 28,
    detail: 'Matte charcoal · 6 in',
    art: 'plaque',
    tag: 'Prototype',
  },
];

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
      <img src="/greyhat-store-reference.jpeg" alt={name} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b11]/40 via-transparent to-transparent" />
    </div>
  );
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  const [joined, setJoined] = useState(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
    setCheckoutNotice(false);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function startCheckout() {
    const stripeLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
    if (stripeLink) {
      window.location.assign(stripeLink);
      return;
    }
    setCheckoutNotice(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="bg-[#00a5ff] px-5 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#05080d]">
        First drop incoming · Built for the curious
      </div>

      <header className="relative z-20 border-b border-white/10 bg-[#05080d]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <a href="#top" className="group flex items-center gap-3" aria-label="GreyHatGoods home">
            <span className="grid size-10 place-items-center border border-[#00a5ff]/50 bg-[#0d141e] font-mono text-sm font-black text-white shadow-[0_0_22px_rgba(0,165,255,.16)]">GH</span>
            <span className="text-[15px] font-black uppercase italic tracking-[0.03em] text-white sm:text-lg">
              GreyHat<span className="text-[#00a5ff]">Goods</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.12em] text-[#a7adb3] md:flex" aria-label="Main navigation">
            <a href="#shop" className="transition-colors hover:text-white">Shop</a>
            <a href="#story" className="transition-colors hover:text-white">Mission</a>
            <a href="#newsletter" className="transition-colors hover:text-white">Community</a>
          </nav>

          <div className="flex items-center gap-1">
            <a href="#shop" className="grid size-10 place-items-center text-[#a7adb3] transition-colors hover:text-white" aria-label="Search products">
              <Search className="size-[18px]" />
            </a>
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger
                className="relative grid size-10 place-items-center text-[#a7adb3] transition-colors hover:text-white"
                aria-label={`Open cart, ${itemCount} items`}
              >
                <ShoppingBag className="size-[18px]" />
                <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-[#00a5ff] font-mono text-[9px] font-black text-black">{itemCount}</span>
              </SheetTrigger>
              <SheetContent className="w-full border-white/10 bg-[#080d14] p-0 text-white sm:max-w-[460px]">
                <SheetHeader className="border-b border-white/10 px-6 py-6">
                  <SheetTitle className="font-black uppercase italic tracking-[-0.02em] text-white">Your loadout</SheetTitle>
                  <SheetDescription className="text-[#848b94]">{itemCount ? `${itemCount} item${itemCount === 1 ? '' : 's'} ready for checkout.` : 'Your bag is currently clear.'}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-3">
                  {cart.length === 0 ? (
                    <div className="grid h-full min-h-[360px] place-items-center text-center">
                      <div>
                        <ShoppingBag className="mx-auto size-10 text-[#33404e]" />
                        <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-[#848b94]">No gear selected</p>
                        <button type="button" onClick={() => setCartOpen(false)} className="mt-6 border border-[#00a5ff]/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#00a5ff]">Browse the drop</button>
                      </div>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 border-b border-white/10 py-5">
                        <div className="grid size-20 shrink-0 place-items-center overflow-hidden bg-[#111923]">
                          <Terminal className="size-7 text-[#00a5ff]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-bold text-white">{item.name}</h3>
                              <p className="mt-1 text-xs text-[#848b94]">{item.art === 'plaque' ? 'Charcoal' : 'Size M · Onyx'}</p>
                            </div>
                            <button type="button" onClick={() => setCart((current) => current.filter((cartItem) => cartItem.id !== item.id))} className="text-[#66707c] hover:text-white" aria-label={`Remove ${item.name}`}>
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-white/15">
                              <button type="button" onClick={() => changeQuantity(item.id, -1)} className="grid size-7 place-items-center hover:bg-white/5" aria-label={`Decrease ${item.name} quantity`}><Minus className="size-3" /></button>
                              <span className="grid size-7 place-items-center border-x border-white/15 font-mono text-xs">{item.quantity}</span>
                              <button type="button" onClick={() => changeQuantity(item.id, 1)} className="grid size-7 place-items-center hover:bg-white/5" aria-label={`Increase ${item.name} quantity`}><Plus className="size-3" /></button>
                            </div>
                            <p className="font-mono text-sm font-bold">${item.price * item.quantity}.00</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <SheetFooter className="border-t border-white/10 bg-[#0b111a] p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-[#a7adb3]">Subtotal</span>
                      <span className="font-mono text-lg font-bold text-white">${subtotal}.00</span>
                    </div>
                    <button type="button" onClick={startCheckout} className="flex h-12 w-full items-center justify-center gap-2 bg-[#00a5ff] text-xs font-black uppercase tracking-[0.12em] text-black hover:bg-[#32b7ff]">
                      <LockKeyhole className="size-4" /> Checkout with Stripe
                    </button>
                    {checkoutNotice && (
                      <p role="status" className="border border-[#00a5ff]/30 bg-[#00a5ff]/8 p-3 text-xs leading-5 text-[#a9dfff]">
                        Stripe Checkout is staged. Add your Payment Link to the site settings to make this button live.
                      </p>
                    )}
                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#66707c]">Secure payment · taxes calculated at checkout</p>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="top" className="relative isolate border-b border-white/10 bg-[#060a10]">
        <div className="cyber-grid absolute inset-0 -z-10 opacity-50" />
        <div className="absolute left-[8%] top-20 -z-10 h-60 w-60 rounded-full bg-[#00a5ff]/10 blur-[90px]" />
        <div className="mx-auto grid min-h-[660px] max-w-[1240px] items-center gap-8 px-5 py-16 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-20">
          <div className="relative z-10 max-w-[680px]">
            <p className="mb-6 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a5ff]"><span className="h-px w-8 bg-[#00a5ff]" /> Secure · Informed · Empowered</p>
            <h1 className="max-w-[720px] text-[clamp(3.1rem,7vw,6.5rem)] font-black uppercase italic leading-[.84] tracking-[-0.055em] text-white">
              Gear for the <span className="text-[#00a5ff]">grey hat</span> mindset.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#a7adb3] sm:text-lg">Apparel and desk gear for security builders, terminal dwellers, and anyone curious enough to look under the hood.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex h-12 items-center gap-3 bg-[#00a5ff] px-6 text-xs font-black uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5">Shop the drop <ArrowRight className="size-4" /></a>
              <a href="#story" className="inline-flex h-12 items-center border border-white/20 px-6 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/50 hover:bg-white/5">Read the mission</a>
            </div>
          </div>

          <div className="relative mx-auto h-[380px] w-full max-w-[540px] overflow-hidden border border-[#00a5ff]/20 bg-[#070b12] shadow-[0_0_70px_rgba(0,165,255,.12)] lg:h-[480px]">
            <img src="/greyhat-store-reference.jpeg" alt="Hooded cybersecurity figure working at a laptop" className="absolute h-auto min-w-[780px] max-w-none -translate-x-[41%] -translate-y-[4%] lg:min-w-[930px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a10] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#a7adb3]"><span>Signal: encrypted</span><span className="text-[#00a5ff]">Status: online</span></div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b111a]">
        <div className="mx-auto grid max-w-[1240px] divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          {[
            [ShieldCheck, 'Built with intent', 'Original gear for people in the field.'],
            [LockKeyhole, 'Checkout secured', 'Stripe-ready payments and trusted processing.'],
            [PackageCheck, 'Small-batch drops', 'Limited runs. No endless catalog noise.'],
          ].map(([Icon, title, copy]) => (
            <div key={String(title)} className="flex gap-4 px-0 py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <Icon className="mt-0.5 size-6 shrink-0 text-[#00a5ff]" />
              <div><h2 className="text-xs font-black uppercase tracking-[0.1em] text-white">{String(title)}</h2><p className="mt-1 text-sm text-[#848b94]">{String(copy)}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="bg-[#080d14] py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a5ff]">// Drop 001</p>
              <h2 className="mt-3 text-4xl font-black uppercase italic tracking-[-0.04em] text-white sm:text-5xl">Field-tested favorites.</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-[#848b94] md:block">Starter mockups for the first GreyHatGoods release. Product art and pricing can be swapped in as the catalog develops.</p>
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
                    <div><h3 className="text-lg font-black uppercase italic tracking-[-0.02em] text-white">{product.name}</h3><p className="mt-1 text-xs text-[#848b94]">{product.detail}</p></div>
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

      <section id="story" className="relative overflow-hidden border-y border-white/10 bg-[#0d141e] py-20 sm:py-28">
        <div className="cyber-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:px-8">
          <div className="relative mx-auto aspect-square w-full max-w-[410px] overflow-hidden border border-white/10 bg-[#e5e7eb]">
            <img src="/greyhat-brand-sheet.jpeg" alt="GreyHatGoods brand marks and visual identity" className="h-full w-full object-cover object-[48%_39%]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060a10] to-transparent p-5 pt-20"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#00a5ff]">Identity system · 2026</p></div>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a5ff]">// The mission</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black uppercase italic leading-[.95] tracking-[-0.045em] text-white sm:text-6xl">Learn. Build. Secure. Share.</h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#a7adb3]">GreyHatGoods lives where technical curiosity meets everyday craft. The goal is simple: make thoughtful gear that feels at home in a lab, at a meetup, or beside a terminal at 2 a.m.</p>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                [Code2, 'Built for builders'],
                [ShieldCheck, 'Security-minded'],
                [Sparkles, 'Designed with intent'],
                [Terminal, 'Terminal approved'],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="flex items-center gap-3 border border-white/10 bg-black/10 p-4"><Icon className="size-5 text-[#00a5ff]" /><span className="text-xs font-bold uppercase tracking-[0.09em] text-white">{String(label)}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="bg-[#00a5ff] py-16 text-[#03070b]">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em]">Packet received?</p>
            <h2 className="mt-2 text-3xl font-black uppercase italic tracking-[-0.035em] sm:text-4xl">Get the next drop signal.</h2>
            <p className="mt-2 text-sm font-medium text-[#07324b]">Low-volume updates on new gear, builds, and field notes.</p>
          </div>
          {joined ? (
            <div role="status" className="flex min-h-12 items-center gap-3 border border-black/30 bg-black px-6 text-xs font-bold uppercase tracking-[0.1em] text-white"><Check className="size-4 text-[#00a5ff]" /> You're on the list</div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setJoined(true); }} className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className="h-12 min-w-0 flex-1 border border-black/30 bg-transparent px-4 font-mono text-sm placeholder:text-[#116190] focus:border-black focus:outline-none" />
              <button type="submit" className="h-12 bg-black px-6 text-xs font-black uppercase tracking-[0.12em] text-white hover:bg-[#111923]">Join the list</button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-[#03070b] py-12">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row">
            <div><p className="text-lg font-black uppercase italic text-white">GreyHat<span className="text-[#00a5ff]">Goods</span></p><p className="mt-3 max-w-xs text-sm leading-6 text-[#66707c]">Tools for the curious. Gear for the grind. Knowledge for the journey.</p></div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs font-semibold uppercase tracking-[0.09em] text-[#848b94]"><a href="#shop" className="hover:text-white">Shop</a><a href="#story" className="hover:text-white">Mission</a><a href="#newsletter" className="hover:text-white">Community</a><a href="mailto:hello@greyhatgoods.com" className="hover:text-white">Contact</a></div>
          </div>
          <div className="flex flex-col gap-3 pt-7 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4f5863] sm:flex-row sm:items-center sm:justify-between"><p>© 2026 GreyHatGoods. All rights reserved.</p><p>Designed for good actors with curious minds.</p></div>
        </div>
      </footer>
    </main>
  );
}
