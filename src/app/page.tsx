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

export default function HomePage() {
  const featuredGuides = guides.filter((g) => g.status === 'approved').slice(0, 6);
  const topReviews = reviews.slice(0, 3);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl">🌸</div>
          <div className="absolute top-40 right-20 text-6xl">🗾</div>
          <div className="absolute bottom-20 left-1/4 text-7xl">⛩️</div>
          <div className="absolute bottom-32 right-1/3 text-5xl">🍜</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              日本を
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                深く知る
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              現地ガイドと旅行者をつなぐプラットフォーム
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              認定ガイドによるプライベートツアーで、本当の日本を体験しませんか？
              <br />
              歴史、文化、グルメ、自然...あなただけの特別な旅を。
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-3 max-w-3xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-pink-400 mr-2" />
                  <input
                    type="text"
                    placeholder="行き先を入力（例: 京都、東京、沖縄）"
                    className="bg-transparent outline-none w-full text-gray-700"
                  />
                </div>
                <Link href="/guides" className="md:w-auto w-full">
                  <Button className="w-full bg-pink-400 hover:bg-pink-500 text-white px-8 py-6 text-lg rounded-lg">
                    <Search className="h-5 w-5 mr-2" />
                    ガイドを探す
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-pink-400" />
                <span className="text-sm">安心の返金保証</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-pink-400" />
                <span className="text-sm">認定ガイドのみ</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-pink-400" />
                <span className="text-sm">1000組以上の実績</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ご利用方法</h2>
            <p className="text-lg text-gray-600">3つの簡単なステップで予約完了</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-pink-100 hover:border-pink-200 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. ガイドを探す</h3>
                <p className="text-gray-600">
                  エリア、言語、専門分野から、あなたにぴったりのガイドを見つけましょう。
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-100 hover:border-pink-200 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. 予約する</h3>
                <p className="text-gray-600">
                  日時とツアープランを選んで予約。メッセージで詳細を相談できます。
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-100 hover:border-pink-200 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. 体験する</h3>
                <p className="text-gray-600">
                  現地ガイドと一緒に、忘れられない日本の旅を楽しみましょう。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">人気のガイド</h2>
            <p className="text-lg text-gray-600">経験豊富な認定ガイドがお待ちしています</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/guides">
              <Button
                size="lg"
                className="bg-pink-400 hover:bg-pink-500 text-white px-8"
              >
                すべてのガイドを見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">旅行者の声</h2>
            <p className="text-lg text-gray-600">実際にご利用いただいた方々のレビュー</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {topReviews.map((review) => {
              const traveler = travelers.find((t) => t.id === review.travelerId);
              return (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 fill-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 line-clamp-4">{review.comment}</p>
                    <div className="flex items-center space-x-3 border-t pt-4">
                      <Avatar>
                        <AvatarFallback className="bg-pink-100 text-pink-600 font-semibold">
                          {traveler ? getInitials(traveler.name) : '??'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{traveler?.name || '匿名'}</p>
                        <p className="text-sm text-gray-500">{traveler?.nationality || ''}</p>
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
      <section className="py-20 bg-gradient-to-r from-pink-400 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            あなただけの日本体験を始めませんか？
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            認定ガイドによるプライベートツアーで、
            <br />
            ガイドブックにはない特別な旅を。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides">
              <Button
                size="lg"
                className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-6 text-lg"
              >
                ガイドを探す
              </Button>
            </Link>
            <Link href="/become-guide">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
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
