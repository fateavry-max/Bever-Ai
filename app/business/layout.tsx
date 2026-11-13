'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BusinessLayout } from '@/components/layouts/BusinessLayout';

export default function BusinessSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If the user visits the public marketing page '/business', don't wrap in private BusinessLayout
  if (pathname === '/business') {
    return <>{children}</>;
  }

  // All private portal routes (/business/dashboard, /business/projects, etc.) get the enterprise BusinessLayout
  return <BusinessLayout>{children}</BusinessLayout>;
}
