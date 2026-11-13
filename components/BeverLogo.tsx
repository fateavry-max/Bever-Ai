import React from 'react';
import Image from 'next/image';

const LOGO_SRC = '/assets/aistudio/file_000000002d0881f48e17e04ec2fb8044_0955766b.png';

interface BeverLogoProps {
  variant?: 'compact' | 'card' | 'footer';
  subtitle?: string;
}

export function BeverLogo({ variant = 'compact', subtitle }: BeverLogoProps) {
  if (variant === 'card') {
    return (
      <div className="inline-flex flex-col items-center gap-2">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white border border-black/[0.06] shadow-xs">
          <Image
            src={LOGO_SRC}
            alt="BEVER — Tasks Today. Intelligence Tomorrow."
            fill
            sizes="96px"
            referrerPolicy="no-referrer"
            className="object-contain p-1 mix-blend-multiply"
            priority
          />
        </div>
        {subtitle && (
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="inline-flex items-center gap-3.5">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-black/[0.06] shrink-0">
          <Image
            src={LOGO_SRC}
            alt="BEVER Logo"
            fill
            sizes="56px"
            referrerPolicy="no-referrer"
            className="object-contain p-0.5 mix-blend-multiply"
          />
        </div>
        <div>
          <span className="font-semibold tracking-[-0.035em] text-lg text-zinc-950 block leading-none">
            BEVER
          </span>
          <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block mt-1">
            Tasks Today. Intelligence Tomorrow.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white border border-black/[0.08] shrink-0">
        <Image
          src={LOGO_SRC}
          alt="BEVER Logo"
          fill
          sizes="36px"
          referrerPolicy="no-referrer"
          className="object-contain p-0.5 mix-blend-multiply"
          priority
        />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-semibold tracking-[-0.035em] text-base text-zinc-950 leading-none">
          BEVER
        </span>
        {subtitle && (
          <span className="text-zinc-400 text-xs font-normal leading-none">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
