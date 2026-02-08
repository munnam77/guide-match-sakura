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

export default function Header() {
  const { currentUser, logout } = useAuth();

  const getDashboardLink = () => {
    if (!currentUser) return '/';
    return `/dashboard/${currentUser.role}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
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
                    <Button variant="ghost" size="icon" className="relative">
                      <MessageSquare className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-pink-400 text-white text-xs flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarFallback className="bg-pink-100 text-pink-600 font-semibold">
                          {getInitials(currentUser.name)}
                        </AvatarFallback>
                      </Avatar>
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
                  <Button variant="ghost" className="text-gray-700 hover:text-pink-400">
                    ログイン
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-pink-400 hover:bg-pink-500 text-white">
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
