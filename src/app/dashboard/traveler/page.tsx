'use client';

import React from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bookings } from '@/data/bookings';
import { guides } from '@/data/guides';
import { travelers } from '@/data/travelers';
import { conversations } from '@/data/messages';
import { Calendar, Heart, MessageSquare, Star, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import { getInitials, getAvatarGradient } from '@/lib/utils';
import StatsCard from '@/components/dashboard/StatsCard';

function TravelerDashboardContent() {
  const traveler = travelers[0];
  const userBookings = bookings.filter((b) => b.travelerId === traveler.id);
  const upcomingBookings = userBookings.filter(
    (b) => b.status === 'confirmed' && new Date(b.date) > new Date()
  );
  const pastBookings = userBookings.filter((b) => b.status === 'completed');
  const favoriteGuides = guides.filter((g) => traveler.favorites.includes(g.id));
  const unreadMessages = conversations
    .filter((c) => c.participants.includes(traveler.id))
    .reduce((sum, c) => sum + c.unreadCount, 0);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; text: string }> = {
      confirmed: { color: 'bg-green-100 text-green-700', text: '確認済み' },
      pending: { color: 'bg-yellow-100 text-yellow-700', text: '確認待ち' },
      completed: { color: 'bg-blue-100 text-blue-700', text: '完了' },
      cancelled: { color: 'bg-red-100 text-red-700', text: 'キャンセル' },
    };
    const variant = variants[status] || variants.pending;
    return <Badge className={variant.color}>{variant.text}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Banner */}
        <div className="mb-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3">ダッシュボード</h1>
              <p className="text-xl md:text-2xl opacity-90 font-medium">ようこそ、{traveler.name}さん</p>
            </div>
            <div className="hidden md:block text-7xl">🌸</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="予約済みツアー"
            value={upcomingBookings.length}
            icon={Calendar}
          />
          <StatsCard
            title="完了したツアー"
            value={pastBookings.length}
            icon={Star}
          />
          <StatsCard
            title="お気に入りガイド"
            value={favoriteGuides.length}
            icon={Heart}
          />
          <StatsCard
            title="未読メッセージ"
            value={unreadMessages}
            icon={MessageSquare}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="bg-white p-1.5 shadow-md border-2 border-gray-200">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-semibold px-6 py-3"
            >
              予定のツアー
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-semibold px-6 py-3"
            >
              過去のツアー
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-semibold px-6 py-3"
            >
              お気に入り
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => {
                const guide = guides.find((g) => g.id === booking.guideId);
                const tourPlan = guide?.tourPlans.find((tp) => tp.id === booking.tourPlanId);
                return (
                  <Card key={booking.id} className="hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-pink-200">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-5 flex-1">
                          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getAvatarGradient(guide?.name || '')} flex items-center justify-center shadow-lg ring-4 ring-white`}>
                            <span className="text-3xl font-bold text-white">{getInitials(guide?.name || '')}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-2xl font-bold text-gray-900">{tourPlan?.title}</h3>
                              {getStatusBadge(booking.status)}
                            </div>
                            <p className="text-gray-700 mb-4 font-medium">ガイド: {guide?.name}</p>
                            <div className="flex flex-wrap gap-5 text-sm text-gray-700">
                              <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                                <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                                <span className="font-medium">{format(new Date(booking.date), 'yyyy年M月d日(E)', { locale: ja })}</span>
                              </div>
                              <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                                <Clock className="h-5 w-5 mr-2 text-pink-500" />
                                <span className="font-medium">{tourPlan?.duration}時間</span>
                              </div>
                              <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                                <MapPin className="h-5 w-5 mr-2 text-pink-500" />
                                <span className="font-medium">{guide?.area}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                            ¥{booking.totalPrice.toLocaleString()}
                          </p>
                          <div className="space-y-3">
                            <Link href="/messages">
                              <Button variant="outline" className="w-full border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-semibold">
                                メッセージ
                              </Button>
                            </Link>
                            <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 border-2 border-red-300 font-semibold">
                              キャンセル
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="border-2 border-gray-200">
                <CardContent className="p-16 text-center">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">予定のツアーはありません</h3>
                  <p className="text-gray-600 mb-8 text-lg">新しいツアーを予約しましょう</p>
                  <Link href="/guides">
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-lg">
                      ガイドを探す
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.map((booking) => {
              const guide = guides.find((g) => g.id === booking.guideId);
              const tourPlan = guide?.tourPlans.find((tp) => tp.id === booking.tourPlanId);
              return (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4 flex-1">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl font-bold text-pink-300">{guide?.photo}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{tourPlan?.title}</h3>
                          <p className="text-gray-600 mb-3">ガイド: {guide?.name}</p>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-pink-400" />
                            {format(new Date(booking.date), 'yyyy年M月d日(E)', { locale: ja })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 mb-4">
                          ¥{booking.totalPrice.toLocaleString()}
                        </p>
                        {!booking.reviewed && (
                          <Button className="bg-pink-400 hover:bg-pink-500 text-white">
                            レビューを書く
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="favorites" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-pink-200">
                <CardContent className="p-6">
                  <div className={`w-full aspect-square bg-gradient-to-br ${getAvatarGradient(guide.name)} rounded-2xl flex items-center justify-center mb-5 shadow-xl ring-4 ring-white`}>
                    <span className="text-6xl font-bold text-white">{getInitials(guide.name)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.name}</h3>
                  <div className="flex items-center mb-3 bg-amber-50 px-3 py-2 rounded-lg w-fit">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-1.5" />
                    <span className="text-sm font-bold">{guide.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-600 ml-1.5 font-medium">({guide.reviewCount})</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-5 font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5 text-pink-500" />
                    {guide.area}
                  </p>
                  <Link href={`/guides/${guide.id}`}>
                    <Button variant="outline" className="w-full border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-semibold py-6">
                      プロフィールを見る
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function TravelerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['traveler']}>
      <TravelerDashboardContent />
    </ProtectedRoute>
  );
}
