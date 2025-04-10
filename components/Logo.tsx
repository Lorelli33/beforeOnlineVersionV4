'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className="relative flex items-center gap-2 pl-1 sm:pl-2 md:pl-6">
      <Image 
        src="https://i.imgur.com/iu42DU1.png" 
        alt="PrivateCharterX"
        width={80}
        height={80}
        className={`h-[70px] sm:h-[75px] md:h-[80px] w-auto object-contain ${className}`}
      />
    </Link>
  );
}