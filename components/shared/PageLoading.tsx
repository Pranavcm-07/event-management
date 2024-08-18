'use client'

import { useSession } from 'next-auth/react';
import { useEffect, useState,ReactNode } from 'react';
import { LoadingSpinner } from '../ui/loading-spinner';

interface PageLoadingProps {
    children: ReactNode;
  }

const PageLoading:React.FC<PageLoadingProps> = ({ children }) => {
  const { status } = useSession();
  const [loading, setLoading] = useState(status === 'loading');

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <LoadingSpinner />
        </div>
    );
  }

  return <>{children}</>;
};

export default PageLoading;
