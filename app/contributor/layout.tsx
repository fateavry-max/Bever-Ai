'use client';

import React from 'react';
import { ContributorLayout } from '@/components/layouts/ContributorLayout';

export default function ContributorSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContributorLayout>{children}</ContributorLayout>;
}
