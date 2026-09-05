'use client';

import { Check, MessageSquare, Radio, Users } from 'lucide-react';
import { useState } from 'react';

export default function CommunityPage() {
  const [joined, setJoined] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#060a10] py-16 sm:py-24">
        <div className="cyber-grid absolute inset-0 opacity-50" />
        <div className="absolute right-[12%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#00a5ff]/10 blur-[100px]" />
        <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a5ff]">{'// Open channel'}</p>
          <h1 className="mt-4 max-w-4xl text-[clamp(3.2rem,8vw,6.5rem)] font-black uppercase italic leading-[.86] tracking-[-0.055em] text-white">For curious minds.<br /><span className="text-[#00a5ff]">Built together.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#a7adb3] sm:text-lg">Follow the work behind each release, trade field notes, and be first to know when a new drop goes live.</p>
        </div>
      </section>

      <section className="bg-[#0b111a] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-px bg-white/10 px-5 md:grid-cols-3 lg:px-8">
          {[
            [Radio, 'Drop signals', 'Low-volume alerts when new gear is ready.'],
            [MessageSquare, 'Field notes', 'Build stories, practical ideas, and lessons from the lab.'],
            [Users, 'Good actors', 'A community for people who stay curious and use what they learn well.'],
          ].map(([Icon, title, copy]) => (
            <article key={String(title)} className="bg-[#0b111a] p-8 sm:p-10"><Icon className="size-7 text-[#00a5ff]" /><h2 className="mt-8 text-2xl font-black uppercase italic tracking-[-0.03em] text-white">{String(title)}</h2><p className="mt-3 text-base leading-7 text-[#848b94]">{String(copy)}</p></article>
          ))}
        </div>
      </section>

      <section className="bg-[#00a5ff] py-16 text-[#03070b] sm:py-20">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em]">Packet received?</p>
            <h2 className="mt-2 text-3xl font-black uppercase italic tracking-[-0.035em] sm:text-5xl">Get the next drop signal.</h2>
            <p className="mt-3 text-base font-medium text-[#07324b]">New gear, builds, and field notes. Nothing noisy.</p>
          </div>
          {joined ? (
            <output className="flex min-h-12 items-center gap-3 border border-black/30 bg-black px-6 text-xs font-bold uppercase tracking-[0.1em] text-white"><Check className="size-4 text-[#00a5ff]" /> You&apos;re on the list</output>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setJoined(true); }} className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
              <label htmlFor="community-email" className="sr-only">Email address</label>
              <input id="community-email" name="email" type="email" required placeholder="you@example.com" className="h-12 min-w-0 flex-1 border border-black/30 bg-transparent px-4 font-mono text-sm placeholder:text-[#116190] focus:border-black focus:outline-none" />
              <button type="submit" className="h-12 bg-black px-6 text-xs font-black uppercase tracking-[0.12em] text-white hover:bg-[#111923]">Join the list</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
