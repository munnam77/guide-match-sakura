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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-pink-50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration/Info */}
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-12 shadow-2xl text-white h-full">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-4xl">🌸</span>
                <span className="text-3xl font-extrabold">SakuraGuide</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                日本を<br />深く知る旅へ
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                認定ガイドと共に、本当の日本を体験しませんか？
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">安心・安全</h3>
                    <p className="text-white/80 text-sm">認定ガイドによる質の高いサービス</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">全国対応</h3>
                    <p className="text-white/80 text-sm">日本各地の優秀なガイドが在籍</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Luggage className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">柔軟な予約</h3>
                    <p className="text-white/80 text-sm">あなたの旅程に合わせてカスタマイズ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div>
            {/* Mobile Logo */}
            <Link href="/" className="flex md:hidden items-center justify-center space-x-2 mb-8">
              <span className="text-4xl">🌸</span>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                SakuraGuide
              </span>
            </Link>

            <Card className="shadow-2xl border-2 border-gray-100 backdrop-blur-sm bg-white/95">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-extrabold text-gray-900">ログイン</CardTitle>
                <CardDescription className="text-base mt-2">
                  SakuraGuideへようこそ
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                {/* Demo Login Buttons */}
                <div className="space-y-3 mb-8">
                  <p className="text-sm font-bold text-center text-gray-700 mb-5">
                    デモアカウントでログイン
                  </p>
                  <Button
                    onClick={() => handleDemoLogin('traveler')}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-7 text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Luggage className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>旅行者としてログイン</span>
                    </div>
                    <p className="text-xs mt-1 opacity-90">観光客として体験</p>
                  </Button>
                  <Button
                    onClick={() => handleDemoLogin('guide')}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-7 text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>ガイドとしてログイン</span>
                    </div>
                    <p className="text-xs mt-1 opacity-90">ツアーガイドとして体験</p>
                  </Button>
                  <Button
                    onClick={() => handleDemoLogin('admin')}
                    className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white py-7 text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Shield className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>管理者としてログイン</span>
                    </div>
                    <p className="text-xs mt-1 opacity-90">管理画面にアクセス</p>
                  </Button>
                </div>

                <div className="relative my-8">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-3 text-sm text-gray-600 font-medium">または</span>
                  </div>
                </div>

                {/* Regular Login Form */}
                <form onSubmit={handleRegularLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">メールアドレス</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-2 focus:border-pink-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">パスワード</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 border-2 focus:border-pink-400"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700 font-medium">ログイン状態を保持</span>
                    </label>
                    <a href="#" className="text-pink-600 hover:text-pink-700 font-semibold">
                      パスワードを忘れた
                    </a>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-7 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    ログイン
                  </Button>
                </form>

                {/* Register Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-700">
                    アカウントをお持ちでないですか？{' '}
                    <Link href="/login" className="text-pink-600 hover:text-pink-700 font-bold">
                      新規登録
                    </Link>
                  </p>
                </div>

                {/* Guide Registration CTA */}
                <div className="mt-6 p-5 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border-2 border-pink-200 shadow-sm">
                  <p className="text-sm text-gray-800 text-center mb-3 font-semibold">
                    ガイドとして登録しませんか？
                  </p>
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-2 border-pink-400 text-pink-600 hover:bg-pink-100 font-semibold py-5">
                      ガイド登録について
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <p className="text-center text-sm text-gray-600 mt-8 leading-relaxed">
              ログインすることで、
              <span className="text-pink-600 hover:underline cursor-pointer font-medium">利用規約</span>
              と
              <span className="text-pink-600 hover:underline cursor-pointer font-medium">プライバシーポリシー</span>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
