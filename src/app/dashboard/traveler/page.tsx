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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ダッシュボード</h1>
          <p className="text-lg text-gray-600">ようこそ、{traveler.name}さん</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">予約済みツアー</p>
                  <p className="text-3xl font-bold text-gray-900">{upcomingBookings.length}</p>
                </div>
                <Calendar className="h-10 w-10 text-pink-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">完了したツアー</p>
                  <p className="text-3xl font-bold text-gray-900">{pastBookings.length}</p>
                </div>
                <Star className="h-10 w-10 text-pink-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">お気に入りガイド</p>
                  <p className="text-3xl font-bold text-gray-900">{favoriteGuides.length}</p>
                </div>
                <Heart className="h-10 w-10 text-pink-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">未読メッセージ</p>
                  <p className="text-3xl font-bold text-gray-900">{unreadMessages}</p>
                </div>
                <MessageSquare className="h-10 w-10 text-pink-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">予定のツアー</TabsTrigger>
            <TabsTrigger value="past">過去のツアー</TabsTrigger>
            <TabsTrigger value="favorites">お気に入り</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => {
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
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{tourPlan?.title}</h3>
                              {getStatusBadge(booking.status)}
                            </div>
                            <p className="text-gray-600 mb-3">ガイド: {guide?.name}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-pink-400" />
                                {format(new Date(booking.date), 'yyyy年M月d日(E)', { locale: ja })}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-pink-400" />
                                {tourPlan?.duration}時間
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                                {guide?.area}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 mb-4">
                            ¥{booking.totalPrice.toLocaleString()}
                          </p>
                          <div className="space-y-2">
                            <Link href="/messages">
                              <Button variant="outline" className="w-full">
                                メッセージ
                              </Button>
                            </Link>
                            <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
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
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">予定のツアーはありません</h3>
                  <p className="text-gray-600 mb-6">新しいツアーを予約しましょう</p>
                  <Link href="/guides">
                    <Button className="bg-pink-400 hover:bg-pink-500 text-white">
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

          <TabsContent value="favorites" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteGuides.map((guide) => (
              <Card key={guide.id}>
                <CardContent className="p-6">
                  <div className="w-full aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-pink-300">{guide.photo}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{guide.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{guide.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500 ml-1">({guide.reviewCount})</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{guide.area}</p>
                  <Link href={`/guides/${guide.id}`}>
                    <Button variant="outline" className="w-full">
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
