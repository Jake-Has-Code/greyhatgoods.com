import { Code2, Eye, Scale, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const principles = [
  [Eye, 'Stay curious', 'Ask better questions, inspect the system, and keep learning past the obvious answer.'],
  [Scale, 'Use it well', 'Technical knowledge carries responsibility. Build, test, and share with intent.'],
  [ShieldCheck, 'Strengthen the field', 'Make security culture more open, practical, and welcoming to the next builder.'],
];

export default function MissionPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0d141e] py-16 sm:py-24">
        <div className="cyber-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8">
          <div className="relative mx-auto aspect-square w-full max-w-[430px] overflow-hidden border border-white/10 bg-[#e5e7eb]">
            <Image src="/greyhat-brand-sheet.jpeg" alt="GreyHatGoods brand marks and visual identity" width={1080} height={728} className="h-full w-full object-cover object-[48%_39%]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060a10] to-transparent p-5 pt-20"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#00a5ff]">Identity system · 2026</p></div>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a5ff]">{'// The mission'}</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(3.2rem,7vw,6.5rem)] font-black uppercase italic leading-[.86] tracking-[-0.055em] text-white">Learn. Build.<br /><span className="text-[#00a5ff]">Secure. Share.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#a7adb3] sm:text-lg">GreyHatGoods lives where technical curiosity meets everyday craft. We make thoughtful gear that feels at home in a lab, at a meetup, or beside a terminal at 2 a.m.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#080d14] py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a5ff]">{'// Operating principles'}</p>
          <div className="mt-8 grid gap-px bg-white/10 lg:grid-cols-3">
            {principles.map(([Icon, title, copy], index) => (
              <article key={String(title)} className="bg-[#080d14] p-8 sm:p-10">
                <div className="flex items-center justify-between"><Icon className="size-7 text-[#00a5ff]" /><span className="font-mono text-xs text-[#4f5863]">0{index + 1}</span></div>
                <h2 className="mt-10 text-2xl font-black uppercase italic tracking-[-0.03em] text-white">{String(title)}</h2>
                <p className="mt-4 text-base leading-7 text-[#848b94]">{String(copy)}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[[Code2, 'Built for builders'], [ShieldCheck, 'Security-minded'], [Sparkles, 'Designed with intent'], [Terminal, 'Terminal approved']].map(([Icon, label]) => (
              <div key={String(label)} className="flex items-center gap-3 border border-white/10 bg-[#0d141e] p-5"><Icon className="size-5 text-[#00a5ff]" /><span className="text-xs font-bold uppercase tracking-[0.09em] text-white">{String(label)}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#00a5ff] py-14 text-[#03070b]">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 px-5 sm:flex-row sm:items-center lg:px-8">
          <div><p className="font-mono text-[10px] font-black uppercase tracking-[0.18em]">The next signal</p><h2 className="mt-2 text-3xl font-black uppercase italic tracking-[-0.035em]">Join the community channel.</h2></div>
          <Link href="/community" className="inline-flex h-12 shrink-0 items-center justify-center bg-black px-6 text-xs font-black uppercase tracking-[0.12em] text-white hover:bg-[#111923]">Connect with us</Link>
        </div>
      </section>
    </>
  );
}
