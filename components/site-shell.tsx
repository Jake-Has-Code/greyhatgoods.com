'use client';

import {
  LockKeyhole,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Terminal,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from '@/lib/catalog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type CartItem = Product & { quantity: number };
type CartContextValue = { addToCart: (product: Product) => void };

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used within SiteShell');
  return cart;
}

const navItems = [
  { href: '/shop', label: 'Shop' },
  { href: '/mission', label: 'Mission' },
  { href: '/community', label: 'Community' },
];

function NavLink({ href, label }: (typeof navItems)[number]) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`relative py-3 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#00a5ff] after:transition-transform ${
        active
          ? 'text-white after:scale-x-100'
          : 'text-[#a7adb3] after:scale-x-0 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState(false);

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
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
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
    <CartContext.Provider value={{ addToCart }}>
      <div className="min-h-screen overflow-hidden bg-background text-foreground">
        <div className="bg-[#00a5ff] px-5 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#05080d]">
          First drop incoming · Built for the curious
        </div>

        <header className="relative z-20 border-b border-white/10 bg-[#05080d]/95 backdrop-blur-xl">
          <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
            <Link href="/" className="group flex items-center gap-3" aria-label="GreyHatGoods home">
              <span className="grid size-10 place-items-center border border-[#00a5ff]/50 bg-[#0d141e] font-mono text-sm font-black text-white shadow-[0_0_22px_rgba(0,165,255,.16)]">GH</span>
              <span className="text-[15px] font-black uppercase italic tracking-[0.03em] text-white sm:text-lg">
                GreyHat<span className="text-[#00a5ff]">Goods</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.12em] md:flex" aria-label="Main navigation">
              {navItems.map((item) => <NavLink key={item.href} {...item} />)}
            </nav>

            <div className="flex items-center gap-1">
              <Link href="/shop" className="grid size-10 place-items-center text-[#a7adb3] transition-colors hover:text-white" aria-label="Browse products">
                <Search className="size-[18px]" />
              </Link>
              <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetTrigger className="relative grid size-10 place-items-center text-[#a7adb3] transition-colors hover:text-white" aria-label={`Open cart, ${itemCount} items`}>
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
                          <Link href="/shop" onClick={() => setCartOpen(false)} className="mt-6 inline-block border border-[#00a5ff]/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#00a5ff]">Browse the drop</Link>
                        </div>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b border-white/10 py-5">
                          <div className="grid size-20 shrink-0 place-items-center overflow-hidden bg-[#111923]"><Terminal className="size-7 text-[#00a5ff]" /></div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div><h3 className="text-sm font-bold text-white">{item.name}</h3><p className="mt-1 text-xs text-[#848b94]">{item.art === 'plaque' ? 'Charcoal' : 'Size M · Onyx'}</p></div>
                              <button type="button" onClick={() => setCart((current) => current.filter((cartItem) => cartItem.id !== item.id))} className="text-[#66707c] hover:text-white" aria-label={`Remove ${item.name}`}><Trash2 className="size-4" /></button>
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
                      <div className="mb-2 flex items-center justify-between"><span className="text-sm text-[#a7adb3]">Subtotal</span><span className="font-mono text-lg font-bold">${subtotal}.00</span></div>
                      <button type="button" onClick={startCheckout} className="flex h-12 w-full items-center justify-center gap-2 bg-[#00a5ff] text-xs font-black uppercase tracking-[0.12em] text-black hover:bg-[#32b7ff]"><LockKeyhole className="size-4" /> Checkout with Stripe</button>
                      {checkoutNotice && <output className="block border border-[#00a5ff]/30 bg-[#00a5ff]/8 p-3 text-xs leading-5 text-[#a9dfff]">Stripe Checkout is staged. Add your Payment Link to the site settings to make this button live.</output>}
                      <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[#66707c]">Secure payment · taxes calculated at checkout</p>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <nav className="mx-auto grid max-w-[1240px] grid-cols-3 border-t border-white/10 px-5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] md:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => <NavLink key={item.href} {...item} />)}
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-[#03070b] py-12">
          <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row">
              <div><Link href="/" className="text-lg font-black uppercase italic text-white">GreyHat<span className="text-[#00a5ff]">Goods</span></Link><p className="mt-3 max-w-xs text-sm leading-6 text-[#66707c]">Tools for the curious. Gear for the grind. Knowledge for the journey.</p></div>
              <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs font-semibold uppercase tracking-[0.09em] text-[#848b94]"><Link href="/shop" className="hover:text-white">Shop</Link><Link href="/mission" className="hover:text-white">Mission</Link><Link href="/community" className="hover:text-white">Community</Link><a href="mailto:hello@greyhatgoods.com" className="hover:text-white">Contact</a></div>
            </div>
            <div className="flex flex-col gap-3 pt-7 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4f5863] sm:flex-row sm:items-center sm:justify-between"><p>© 2026 GreyHatGoods. All rights reserved.</p><p>Designed for good actors with curious minds.</p></div>
          </div>
        </footer>
      </div>
    </CartContext.Provider>
  );
}
