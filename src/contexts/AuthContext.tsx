'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, User, Traveler, Guide, Admin } from '@/types';
import { travelers } from '@/data/travelers';
import { guides } from '@/data/guides';

interface AuthContextType {
  currentUser: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers = {
  traveler: travelers[0] as Traveler,
  guide: guides[0] as Guide,
  admin: {
    id: 'admin-1',
    name: '管理者',
    nameEn: 'Admin',
    email: 'admin@sakuraguide.com',
    role: 'admin' as UserRole,
    permissions: ['all'],
    createdAt: '2024-01-01T00:00:00Z',
  } as Admin,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('sakuraguide_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('sakuraguide_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole) => {
    const user = demoUsers[role];
    setCurrentUser(user);
    localStorage.setItem('sakuraguide_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sakuraguide_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected route wrapper component
export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <p className="text-gray-600 mb-6">このページを表示するにはログインしてください。</p>
          <a
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-pink-400 text-white font-medium rounded-lg hover:bg-pink-500 transition-colors"
          >
            ログインページへ
          </a>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">アクセス権限がありません</h2>
          <p className="text-gray-600 mb-6">このページにアクセスする権限がありません。</p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-pink-400 text-white font-medium rounded-lg hover:bg-pink-500 transition-colors"
          >
            トップページへ
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
