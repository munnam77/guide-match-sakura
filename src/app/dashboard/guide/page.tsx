'use client';

import React from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/dashboard/StatsCard';
import { bookings } from '@/data/bookings';
import { guides } from '@/data/guides';
import { travelers } from '@/data/travelers';
import { getAvatarGradient, getInitials } from '@/lib/utils';
import { DollarSign, Calendar, Star, TrendingUp, Clock, User, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';

function GuideDashboardContent() {
  const guide = guides[0];
  const guideBookings = bookings.filter((b) => b.guideId === guide.id);
  const confirmedBookings = guideBookings.filter((b) => b.status === 'confirmed');
  const todayBookings = confirmedBookings.filter(
    (b) => format(new Date(b.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const thisMonthEarnings = guideBookings
    .filter((b) => b.status === 'completed' && new Date(b.createdAt).getMonth() === new Date().getMonth())
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const totalEarnings = guideBookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center space-x-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getAvatarGradient(guide.name)} flex items-center justify-center shadow-xl ring-4 ring-white/30`}>
              <span className="text-3xl font-bold text-white">{getInitials(guide.name)}</span>
            </div>
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">ようこそ、{guide.name}さん</h1>
              <div className="flex items-center space-x-4 text-white/80">
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{guide.area}</span>
                <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-300" />{guide.rating.toFixed(1)} ({guide.reviewCount}件)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 -mt-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="今月の収益"
            value={`¥${thisMonthEarnings.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: '+12.5%', positive: true }}
          />
          <StatsCard
            title="予約件数"
            value={confirmedBookings.length}
            icon={Calendar}
            description="確認済み"
          />
          <StatsCard
            title="評価"
            value={guide.rating.toFixed(1)}
            icon={Star}
            description={`${guide.reviewCount}件のレビュー`}
          />
          <StatsCard
            title="総収益"
            value={`¥${totalEarnings.toLocaleString()}`}
            icon={TrendingUp}
            description="累計"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-emerald-400" />
                    今日のスケジュール
                  </h2>
                  <Badge className="bg-white/10 text-white border-0">{todayBookings.length}件</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                {todayBookings.length > 0 ? (
                  <div className="space-y-4">
                    {todayBookings.map((booking) => {
                      const traveler = travelers.find((t) => t.id === booking.travelerId);
                      const tourPlan = guide.tourPlans.find((tp) => tp.id === booking.tourPlanId);
                      return (
                        <div key={booking.id} className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                          <div className="flex items-center space-x-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getAvatarGradient(traveler?.name || '')} flex items-center justify-center shadow-md`}>
                              <span className="text-lg font-bold text-white">{getInitials(traveler?.name || '?')}</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{tourPlan?.title}</h3>
                              <p className="text-sm text-gray-600">{traveler?.name} · {booking.numberOfPeople}名 · {tourPlan?.duration}時間</p>
                            </div>
                          </div>
                          <Link href="/messages">
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md">
                              <MessageSquare className="h-4 w-4 mr-2" />メッセージ
                            </Button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-10 w-10 text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-lg">今日の予定はありません</p>
                    <p className="text-gray-400 text-sm mt-1">ゆっくりお過ごしください</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">クイックアクション</h3>
                <div className="space-y-3">
                  <Link href="/messages" className="block">
                    <Button variant="outline" className="w-full justify-between h-12 hover:bg-pink-50 hover:border-pink-200">
                      <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-3 text-pink-500" />メッセージ</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Button>
                  </Link>
                  <Link href={`/guides/${guide.id}`} className="block">
                    <Button variant="outline" className="w-full justify-between h-12 hover:bg-blue-50 hover:border-blue-200">
                      <span className="flex items-center"><User className="h-4 w-4 mr-3 text-blue-500" />プロフィール</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-pink-50 to-rose-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">プロフィール完成度</h3>
                <div className="relative pt-2">
                  <div className="flex mb-2 items-center justify-between">
                    <span className="text-xs font-semibold text-pink-600">90%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-pink-200">
                    <div style={{ width: '90%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-400 to-rose-500 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <Card className="mt-8 mb-8 shadow-lg border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">今後の予約</h2>
              <Badge className="bg-gradient-to-r from-pink-400 to-rose-500 text-white border-0 px-4 py-1.5 text-sm">{confirmedBookings.length}件</Badge>
            </div>
            <div className="space-y-4">
              {confirmedBookings.slice(0, 5).map((booking) => {
                const traveler = travelers.find((t) => t.id === booking.travelerId);
                const tourPlan = guide.tourPlans.find((tp) => tp.id === booking.tourPlanId);
                return (
                  <div key={booking.id} className="flex items-start justify-between p-6 border rounded-xl hover:shadow-md transition-all duration-200 hover:border-pink-200 bg-white">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getAvatarGradient(traveler?.name || '')} flex items-center justify-center shadow-md flex-shrink-0`}>
                        <span className="text-lg font-bold text-white">{getInitials(traveler?.name || '?')}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{tourPlan?.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{traveler?.name}</p>
                        <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-full">
                            <Calendar className="h-3 w-3 mr-1.5" />{format(new Date(booking.date), 'M月d日(E)', { locale: ja })}
                          </span>
                          <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-full">
                            <User className="h-3 w-3 mr-1.5" />{booking.numberOfPeople}名
                          </span>
                          <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-full">
                            <Clock className="h-3 w-3 mr-1.5" />{tourPlan?.duration}時間
                          </span>
                        </div>
                        {booking.specialRequests && (
                          <p className="text-xs text-gray-500 mt-3 italic bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">&ldquo;{booking.specialRequests}&rdquo;</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xl font-bold text-gray-900 mb-3">
                        ¥{booking.totalPrice.toLocaleString()}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="hover:bg-gray-50">詳細</Button>
                        <Link href="/messages">
                          <Button size="sm" className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white shadow-md">
                            連絡
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function GuideDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['guide']}>
      <GuideDashboardContent />
    </ProtectedRoute>
  );
}
