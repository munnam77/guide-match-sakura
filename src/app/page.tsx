import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GuideCard from '@/components/guides/GuideCard';
import { guides } from '@/data/guides';
import { reviews } from '@/data/reviews';
import { travelers } from '@/data/travelers';
import { Search, MapPin, Calendar, Star, Shield, Award, Users, Heart } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials, getAvatarGradient } from '@/lib/utils';

export default function HomePage() {
  const featuredGuides = guides.filter((g) => g.status === 'approved').slice(0, 6);
  const topReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50/30 to-pink-50 py-28 md:py-40 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-9xl">🌸</div>
          <div className="absolute top-40 right-20 text-7xl">🗾</div>
          <div className="absolute bottom-20 left-1/4 text-8xl">⛩️</div>
          <div className="absolute bottom-32 right-1/3 text-6xl">🍜</div>
        </div>
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-transparent to-purple-100/40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
              日本を
              <span className="block mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                深く知る
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-medium">
              現地ガイドと旅行者をつなぐプラットフォーム
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
              認定ガイドによるプライベートツアーで、本当の日本を体験しませんか？
              <br />
              歴史、文化、グルメ、自然...あなただけの特別な旅を。
            </p>

            {/* Search Bar with Glass Morphism */}
            <div className="backdrop-blur-xl bg-white/90 border border-white/40 rounded-3xl shadow-2xl p-4 max-w-3xl mx-auto mb-12 hover:shadow-3xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex items-center px-5 py-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                  <MapPin className="h-6 w-6 text-pink-500 mr-3" />
                  <input
                    type="text"
                    placeholder="行き先を入力（例: 京都、東京、沖縄）"
                    className="bg-transparent outline-none w-full text-gray-800 placeholder:text-gray-500 text-lg"
                  />
                </div>
                <Link href="/guides" className="md:w-auto w-full">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-7 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                    <Search className="h-6 w-6 mr-2" />
                    ガイドを探す
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Badges with Cards */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-700">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md border border-white/50">
                <Shield className="h-6 w-6 text-pink-500" />
                <span className="text-sm font-semibold">安心の返金保証</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md border border-white/50">
                <Award className="h-6 w-6 text-pink-500" />
                <span className="text-sm font-semibold">認定ガイドのみ</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md border border-white/50">
                <Users className="h-6 w-6 text-pink-500" />
                <span className="text-sm font-semibold">1000組以上の実績</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">ご利用方法</h2>
            <p className="text-xl text-gray-600 font-medium">3つの簡単なステップで予約完了</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"></div>

            <Card className="border-2 border-gray-200 hover:border-pink-300 hover:shadow-2xl transition-all duration-300 relative">
              <CardContent className="p-10 text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">ガイドを探す</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  エリア、言語、専門分野から、あなたにぴったりのガイドを見つけましょう。
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-pink-300 hover:shadow-2xl transition-all duration-300 relative">
              <CardContent className="p-10 text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">予約する</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  日時とツアープランを選んで予約。メッセージで詳細を相談できます。
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-pink-300 hover:shadow-2xl transition-all duration-300 relative">
              <CardContent className="p-10 text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">体験する</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  現地ガイドと一緒に、忘れられない日本の旅を楽しみましょう。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">人気のガイド</h2>
            <p className="text-xl text-gray-600 font-medium">経験豊富な認定ガイドがお待ちしています</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/guides">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                すべてのガイドを見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">旅行者の声</h2>
            <p className="text-xl text-gray-600 font-medium">実際にご利用いただいた方々のレビュー</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topReviews.map((review) => {
              const traveler = travelers.find((t) => t.id === review.travelerId);
              return (
                <Card key={review.id} className="hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-pink-200 relative">
                  <CardContent className="p-8">
                    {/* Large Quote Mark */}
                    <div className="absolute top-6 left-6 text-6xl text-pink-200 font-serif leading-none">"</div>

                    <div className="relative z-10">
                      <div className="flex items-center space-x-1 mb-6 mt-8">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < review.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300 fill-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-8 line-clamp-4 text-base leading-relaxed">{review.comment}</p>
                      <div className="flex items-center space-x-4 border-t pt-6">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarGradient(traveler?.name || 'A')} flex items-center justify-center shadow-lg ring-2 ring-white`}>
                          <span className="text-white font-bold text-lg">
                            {traveler ? getInitials(traveler.name) : '??'}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-base">{traveler?.name || '匿名'}</p>
                          <p className="text-sm text-gray-600 font-medium">{traveler?.nationality || ''}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl rotate-12">🌸</div>
          <div className="absolute bottom-10 right-10 text-8xl -rotate-12">⛩️</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
            あなただけの日本体験を<br />始めませんか？
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed font-medium">
            認定ガイドによるプライベートツアーで、
            <br />
            ガイドブックにはない特別な旅を。
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/guides">
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-gray-50 px-12 py-7 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                ガイドを探す
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-3 border-white text-white hover:bg-white hover:text-pink-600 px-12 py-7 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                ガイドとして登録
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
