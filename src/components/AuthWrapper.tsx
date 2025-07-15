import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { ReactNode } from 'react';

interface AuthWrapperProps {
  readonly children: ReactNode;
  readonly redirectTo?: string;
  readonly fallback?: ReactNode;
}

export default async function AuthWrapper({
  children,
  redirectTo = '/login',
  fallback,
}: AuthWrapperProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    if (fallback) {
      return <>{fallback}</>;
    }
    redirect(redirectTo);
  }

  return <>{children}</>;
}
