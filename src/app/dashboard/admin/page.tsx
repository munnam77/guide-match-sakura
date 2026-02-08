'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsCard from '@/components/dashboard/StatsCard';
import { guides } from '@/data/guides';
import { bookings } from '@/data/bookings';
import { travelers } from '@/data/travelers';
import { appSettings } from '@/data/settings';
import { Users, UserCheck, Calendar, DollarSign, CheckCircle, X, Eye, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function AdminDashboardContent() {
  const pendingGuides = guides.filter((g) => g.status === 'pending');
  const approvedGuides = guides.filter((g) => g.status === 'approved');
  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const [wordFilter, setWordFilter] = useState(appSettings.wordFilter.bannedWords.join(', '));

  const handleApproveGuide = (guideId: string) => {
    alert(`ガイド ${guideId} を承認しました`);
  };

  const handleRejectGuide = (guideId: string) => {
    alert(`ガイド ${guideId} を却下しました`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">管理ダッシュボード</h1>
          <p className="text-lg text-gray-600">システム管理とガイド承認</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="総ユーザー数"
            value={travelers.length + guides.length}
            icon={Users}
            trend={{ value: '+8', positive: true }}
          />
          <StatsCard
            title="登録ガイド数"
            value={approvedGuides.length}
            icon={UserCheck}
            description="承認済み"
          />
          <StatsCard
            title="総予約数"
            value={totalBookings}
            icon={Calendar}
            trend={{ value: '+23', positive: true }}
          />
          <StatsCard
            title="総売上"
            value={`¥${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            description="完了済み"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              承認待ち
              {pendingGuides.length > 0 && (
                <Badge className="ml-2 bg-pink-400">{pendingGuides.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users">ユーザー管理</TabsTrigger>
            <TabsTrigger value="bookings">予約管理</TabsTrigger>
            <TabsTrigger value="settings">設定</TabsTrigger>
          </TabsList>

          {/* Pending Guides */}
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">ガイド承認待ち</h2>
                {pendingGuides.length > 0 ? (
                  <div className="space-y-6">
                    {pendingGuides.map((guide) => (
                      <div key={guide.id} className="border rounded-lg p-6 bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
                              <span className="text-3xl font-bold text-pink-300">{guide.photo}</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{guide.name}</h3>
                              <p className="text-gray-600 mb-2">{guide.email}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{guide.area}</span>
                                <span>•</span>
                                <span>{guide.yearsExperience}年の経験</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                            承認待ち
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">自己紹介</h4>
                          <p className="text-sm text-gray-600">{guide.bio}</p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">専門分野</h4>
                          <div className="flex flex-wrap gap-2">
                            {guide.specialties.map((s, i) => (
                              <Badge key={i} variant="secondary">{s}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">資格</h4>
                          <div className="flex flex-wrap gap-2">
                            {guide.certifications.map((cert, i) => (
                              <Badge key={i} variant="outline">{cert}</Badge>
                            ))}
                          </div>
                        </div>

                        {guide.qualificationDocs && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">提出書類</h4>
                            <div className="flex flex-wrap gap-2">
                              {guide.qualificationDocs.map((doc, i) => (
                                <Button key={i} variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  {doc}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-3 pt-4 border-t">
                          <Button
                            onClick={() => handleApproveGuide(guide.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            承認
                          </Button>
                          <Button
                            onClick={() => handleRejectGuide(guide.id)}
                            variant="outline"
                            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-2" />
                            却下
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <UserCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p>承認待ちのガイドはいません</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">ユーザー管理</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">名前</th>
                        <th className="text-left py-3 px-4">メール</th>
                        <th className="text-left py-3 px-4">役割</th>
                        <th className="text-left py-3 px-4">登録日</th>
                        <th className="text-right py-3 px-4">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {travelers.slice(0, 5).map((traveler) => (
                        <tr key={traveler.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{traveler.name}</td>
                          <td className="py-3 px-4">{traveler.email}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">旅行者</Badge>
                          </td>
                          <td className="py-3 px-4">{new Date(traveler.createdAt).toLocaleDateString('ja-JP')}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm">詳細</Button>
                          </td>
                        </tr>
                      ))}
                      {approvedGuides.slice(0, 3).map((guide) => (
                        <tr key={guide.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{guide.name}</td>
                          <td className="py-3 px-4">{guide.email}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-100 text-green-700">ガイド</Badge>
                          </td>
                          <td className="py-3 px-4">{new Date(guide.createdAt).toLocaleDateString('ja-JP')}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm">詳細</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Management */}
          <TabsContent value="bookings">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">予約管理</h2>
                <div className="space-y-3">
                  {bookings.slice(0, 10).map((booking) => {
                    const guide = guides.find((g) => g.id === booking.guideId);
                    const traveler = travelers.find((t) => t.id === booking.travelerId);
                    return (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {traveler?.name} → {guide?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString('ja-JP')} · ¥{booking.totalPrice.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }>
                            {booking.status === 'confirmed' && '確認済み'}
                            {booking.status === 'completed' && '完了'}
                            {booking.status === 'cancelled' && 'キャンセル'}
                            {booking.status === 'pending' && '確認待ち'}
                          </Badge>
                          <Button variant="outline" size="sm">詳細</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">メッセージフィルター設定</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center space-x-2 mb-4">
                        <input
                          type="checkbox"
                          checked={appSettings.wordFilter.enabled}
                          className="rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          メッセージフィルターを有効にする
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        禁止ワードリスト（カンマ区切り）
                      </label>
                      <Textarea
                        value={wordFilter}
                        onChange={(e) => setWordFilter(e.target.value)}
                        rows={6}
                        placeholder="価格, 料金, 支払, 銀行, 現金..."
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        これらの単語を含むメッセージは自動的に***に置き換えられます
                      </p>
                    </div>
                    <Button className="bg-pink-400 hover:bg-pink-500 text-white">
                      設定を保存
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">手数料設定</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        プラットフォーム手数料（%）
                      </label>
                      <Input
                        type="number"
                        value={appSettings.commission.rate}
                        className="max-w-xs"
                      />
                    </div>
                    <Button className="bg-pink-400 hover:bg-pink-500 text-white">
                      設定を保存
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
