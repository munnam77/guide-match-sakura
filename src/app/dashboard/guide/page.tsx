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
import { DollarSign, Calendar, Star, TrendingUp, Clock, User } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ガイドダッシュボード</h1>
          <p className="text-lg text-gray-600">ようこそ、{guide.name}さん</p>
        </div>

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

        {/* Today's Schedule */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">今日のスケジュール</h2>
            {todayBookings.length > 0 ? (
              <div className="space-y-4">
                {todayBookings.map((booking) => {
                  const traveler = travelers.find((t) => t.id === booking.travelerId);
                  const tourPlan = guide.tourPlans.find((tp) => tp.id === booking.tourPlanId);
                  return (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-pink-50 rounded-lg border border-pink-100">
                      <div className="flex items-center space-x-4">
                        <div className="bg-pink-200 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{tourPlan?.title}</h3>
                          <p className="text-sm text-gray-600">旅行者: {traveler?.name}</p>
                          <p className="text-xs text-gray-500">{booking.numberOfPeople}名 · {tourPlan?.duration}時間</p>
                        </div>
                      </div>
                      <Link href="/messages">
                        <Button variant="outline">メッセージ</Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p>今日の予定はありません</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">今後の予約</h2>
              <Badge className="bg-pink-100 text-pink-700">{confirmedBookings.length}件</Badge>
            </div>
            <div className="space-y-4">
              {confirmedBookings.slice(0, 5).map((booking) => {
                const traveler = travelers.find((t) => t.id === booking.travelerId);
                const tourPlan = guide.tourPlans.find((tp) => tp.id === booking.tourPlanId);
                return (
                  <div key={booking.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-3 rounded-lg">
                        <User className="h-6 w-6 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{tourPlan?.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">旅行者: {traveler?.name}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{format(new Date(booking.date), 'M月d日(E)', { locale: ja })}</span>
                          <span>{booking.numberOfPeople}名</span>
                          <span>{tourPlan?.duration}時間</span>
                        </div>
                        {booking.specialRequests && (
                          <p className="text-xs text-gray-500 mt-2 italic">"{booking.specialRequests}"</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 mb-2">
                        ¥{booking.totalPrice.toLocaleString()}
                      </p>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">詳細</Button>
                        <Link href="/messages">
                          <Button size="sm" className="bg-pink-400 hover:bg-pink-500 text-white">
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
