export type Product = {
  id: string;
  name: string;
  eyebrow: string;
  price: number;
  detail: string;
  art: 'tee-dark' | 'tee-blue' | 'plaque';
  tag?: string;
};

export const products: Product[] = [
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
