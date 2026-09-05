import { ArrowRight, LockKeyhole, PackageCheck, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="relative isolate border-b border-white/10 bg-[#060a10]">
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
              <Link href="/shop" className="inline-flex h-12 items-center gap-3 bg-[#00a5ff] px-6 text-xs font-black uppercase tracking-[0.12em] text-black transition-transform hover:-translate-y-0.5">Shop the drop <ArrowRight className="size-4" /></Link>
              <Link href="/mission" className="inline-flex h-12 items-center border border-white/20 px-6 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/50 hover:bg-white/5">Read the mission</Link>
            </div>
          </div>

          <div className="relative mx-auto h-[380px] w-full max-w-[540px] overflow-hidden border border-[#00a5ff]/20 bg-[#070b12] shadow-[0_0_70px_rgba(0,165,255,.12)] lg:h-[480px]">
            <Image src="/greyhat-store-reference.jpeg" alt="Hooded cybersecurity figure working at a laptop" width={2048} height={1280} priority className="absolute h-auto min-w-[780px] max-w-none -translate-x-[41%] -translate-y-[4%] lg:min-w-[930px]" />
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

      <section className="bg-[#080d14] py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-px bg-white/10 px-5 lg:grid-cols-3 lg:px-8">
          {[
            ['/shop', '// Drop 001', 'Field-tested gear.', 'Browse the first run of apparel and desk gear.'],
            ['/mission', '// Our code', 'Curiosity, used well.', 'See the principles behind every GreyHatGoods release.'],
            ['/community', '// Open channel', 'Stay in the loop.', 'Get release signals, field notes, and community updates.'],
          ].map(([href, eyebrow, title, copy]) => (
            <Link key={href} href={href} className="group bg-[#080d14] p-8 transition-colors hover:bg-[#0d141e] sm:p-10">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a5ff]">{eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black uppercase italic tracking-[-0.04em] text-white">{title}</h2>
              <p className="mt-4 min-h-12 text-base leading-6 text-[#848b94]">{copy}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-white group-hover:text-[#00a5ff]">Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
