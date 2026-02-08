'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Luggage, MapPin, Shield } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (role: 'traveler' | 'guide' | 'admin') => {
    login(role);
    // Redirect based on role
    if (role === 'admin') {
      router.push('/dashboard/admin');
    } else if (role === 'guide') {
      router.push('/dashboard/guide');
    } else {
      router.push('/dashboard/traveler');
    }
  };

  const handleRegularLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, just login as traveler
    alert('通常ログインはデモでは利用できません。デモログインをお使いください。');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <span className="text-3xl">🌸</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            SakuraGuide
          </span>
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">ログイン</CardTitle>
            <CardDescription>
              SakuraGuideへようこそ
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Login Buttons */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-center text-gray-600 mb-4">
                デモアカウントでログイン
              </p>
              <Button
                onClick={() => handleDemoLogin('traveler')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-base"
              >
                <Luggage className="h-5 w-5 mr-2" />
                🧳 旅行者としてログイン
              </Button>
              <Button
                onClick={() => handleDemoLogin('guide')}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-base"
              >
                <MapPin className="h-5 w-5 mr-2" />
                🗾 ガイドとしてログイン
              </Button>
              <Button
                onClick={() => handleDemoLogin('admin')}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 text-base"
              >
                <Shield className="h-5 w-5 mr-2" />
                ⚙️ 管理者としてログイン
              </Button>
            </div>

            <div className="relative my-6">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">または</span>
              </div>
            </div>

            {/* Regular Login Form */}
            <form onSubmit={handleRegularLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">ログイン状態を保持</span>
                </label>
                <a href="#" className="text-pink-500 hover:text-pink-600">
                  パスワードを忘れた
                </a>
              </div>
              <Button
                type="submit"
                className="w-full bg-pink-400 hover:bg-pink-500 text-white py-6 text-base"
              >
                ログイン
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                アカウントをお持ちでないですか？{' '}
                <Link href="/login" className="text-pink-500 hover:text-pink-600 font-medium">
                  新規登録
                </Link>
              </p>
            </div>

            {/* Guide Registration CTA */}
            <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-100">
              <p className="text-sm text-gray-700 text-center mb-2">
                ガイドとして登録しませんか？
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full border-pink-300 text-pink-600 hover:bg-pink-100">
                  ガイド登録について
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <p className="text-center text-sm text-gray-500 mt-6">
          ログインすることで、
          <span className="text-pink-500 hover:underline cursor-pointer">利用規約</span>
          と
          <span className="text-pink-500 hover:underline cursor-pointer">プライバシーポリシー</span>
          に同意したものとみなされます。
        </p>
      </div>
    </div>
  );
}
