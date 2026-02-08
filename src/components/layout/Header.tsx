'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, LayoutDashboard, MessageSquare, Heart } from 'lucide-react';
import { getInitials, getAvatarGradient } from '@/lib/utils';

export default function Header() {
  const { currentUser, logout } = useAuth();

  const getDashboardLink = () => {
    if (!currentUser) return '/';
    return `/dashboard/${currentUser.role}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover:scale-105">
            <span className="text-3xl">🌸</span>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              SakuraGuide
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/guides"
              className="text-sm font-medium text-gray-700 hover:text-pink-400 transition-colors"
            >
              ガイドを探す
            </Link>
            <Link
              href="/guides"
              className="text-sm font-medium text-gray-700 hover:text-pink-400 transition-colors"
            >
              SakuraGuideとは
            </Link>
            {currentUser?.role === 'guide' && (
              <Link
                href="/dashboard/guide"
                className="text-sm font-medium text-gray-700 hover:text-pink-400 transition-colors"
              >
                ガイドダッシュボード
              </Link>
            )}
            {currentUser?.role === 'admin' && (
              <Link
                href="/dashboard/admin"
                className="text-sm font-medium text-gray-700 hover:text-pink-400 transition-colors"
              >
                管理画面
              </Link>
            )}
          </nav>

          {/* User Menu / Login */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {currentUser.role !== 'admin' && (
                  <Link href="/messages">
                    <Button variant="ghost" size="icon" className="relative hover:bg-pink-50">
                      <MessageSquare className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold animate-pulse shadow-lg">
                        3
                      </span>
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-11 w-11 rounded-full p-0 hover:scale-105 transition-transform">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${getAvatarGradient(currentUser.name)} flex items-center justify-center shadow-md ring-2 ring-white`}>
                        <span className="text-white font-bold text-sm">
                          {getInitials(currentUser.name)}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardLink()} className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>ダッシュボード</span>
                      </Link>
                    </DropdownMenuItem>
                    {currentUser.role === 'traveler' && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/traveler" className="cursor-pointer">
                          <Heart className="mr-2 h-4 w-4" />
                          <span>お気に入り</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/messages" className="cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>メッセージ</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardLink()} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>プロフィール</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>ログアウト</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-pink-500 font-semibold">
                    ログイン
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all">
                    新規登録
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
