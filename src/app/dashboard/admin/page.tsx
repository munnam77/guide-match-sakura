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
import { getAvatarGradient, getInitials } from '@/lib/utils';
import { Users, UserCheck, Calendar, DollarSign, CheckCircle, X, Eye, Shield, Settings, ClipboardList, ArrowRight, MapPin, Briefcase } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50/50">
      {/* Admin Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-xl ring-4 ring-white/20">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">管理ダッシュボード</h1>
              <p className="text-white/70 text-lg">システム管理・ガイド承認・設定</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 -mt-6">
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
        <Tabs defaultValue="pending" className="space-y-6 mb-8">
          <TabsList className="bg-white p-1.5 shadow-md border-2 border-gray-200">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-semibold px-6 py-3"
            >
              承認待ち
              {pendingGuides.length > 0 && (
                <Badge className="ml-2 bg-white/20 text-white border-0">{pendingGuides.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-semibold px-6 py-3"
            >
              <Users className="h-4 w-4 mr-2" />ユーザー管理
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-semibold px-6 py-3"
            >
              <ClipboardList className="h-4 w-4 mr-2" />予約管理
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-semibold px-6 py-3"
            >
              <Settings className="h-4 w-4 mr-2" />設定
            </TabsTrigger>
          </TabsList>

          {/* Pending Guides */}
          <TabsContent value="pending" className="space-y-4">
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <UserCheck className="h-5 w-5 mr-3" />
                  ガイド承認待ち
                  <Badge className="ml-3 bg-white/20 text-white border-0">{pendingGuides.length}件</Badge>
                </h2>
              </div>
              <CardContent className="p-8">
                {pendingGuides.length > 0 ? (
                  <div className="space-y-6">
                    {pendingGuides.map((guide) => (
                      <div key={guide.id} className="border-2 border-gray-100 rounded-2xl p-6 bg-white hover:border-amber-200 hover:shadow-lg transition-all duration-200">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-start space-x-5">
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getAvatarGradient(guide.name)} flex items-center justify-center shadow-lg ring-4 ring-white`}>
                              <span className="text-2xl font-bold text-white">{getInitials(guide.name)}</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{guide.name}</h3>
                              <p className="text-gray-500 mb-2">{guide.email}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-full">
                                  <MapPin className="h-3 w-3 mr-1.5 text-pink-500" />{guide.area}
                                </span>
                                <span className="flex items-center bg-gray-100 px-2.5 py-1 rounded-full">
                                  <Briefcase className="h-3 w-3 mr-1.5 text-blue-500" />{guide.yearsExperience}年の経験
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-3 py-1">
                            承認待ち
                          </Badge>
                        </div>

                        <div className="mb-5 bg-gray-50 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">自己紹介</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{guide.bio}</p>
                        </div>

                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">専門分野</h4>
                          <div className="flex flex-wrap gap-2">
                            {guide.specialties.map((s, i) => (
                              <Badge key={i} className="bg-pink-50 text-pink-700 border-pink-200">{s}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-5">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">資格</h4>
                          <div className="flex flex-wrap gap-2">
                            {guide.certifications.map((cert, i) => (
                              <Badge key={i} variant="outline" className="border-blue-200 text-blue-700">{cert}</Badge>
                            ))}
                          </div>
                        </div>

                        {guide.qualificationDocs && (
                          <div className="mb-5">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">提出書類</h4>
                            <div className="flex flex-wrap gap-2">
                              {guide.qualificationDocs.map((doc, i) => (
                                <Button key={i} variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                                  <Eye className="h-4 w-4 mr-2 text-blue-500" />
                                  {doc}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-3 pt-5 border-t">
                          <Button
                            onClick={() => handleApproveGuide(guide.id)}
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md h-12 text-base"
                          >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            承認
                          </Button>
                          <Button
                            onClick={() => handleRejectGuide(guide.id)}
                            variant="outline"
                            className="flex-1 text-red-600 border-2 border-red-200 hover:bg-red-50 h-12 text-base"
                          >
                            <X className="h-5 w-5 mr-2" />
                            却下
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <UserCheck className="h-12 w-12 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">すべて処理済み</h3>
                    <p className="text-gray-500">承認待ちのガイドはいません</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Users className="h-5 w-5 mr-3" />
                  ユーザー管理
                </h2>
              </div>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b-2 border-gray-100">
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">ユーザー</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">メール</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">役割</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">登録日</th>
                        <th className="text-right py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {travelers.slice(0, 5).map((traveler) => (
                        <tr key={traveler.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(traveler.name)} flex items-center justify-center shadow-sm`}>
                                <span className="text-xs font-bold text-white">{getInitials(traveler.name)}</span>
                              </div>
                              <span className="font-medium text-gray-900">{traveler.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-600">{traveler.email}</td>
                          <td className="py-4 px-6">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200">旅行者</Badge>
                          </td>
                          <td className="py-4 px-6 text-gray-500">{new Date(traveler.createdAt).toLocaleDateString('ja-JP')}</td>
                          <td className="py-4 px-6 text-right">
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                              詳細 <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {approvedGuides.slice(0, 3).map((guide) => (
                        <tr key={guide.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(guide.name)} flex items-center justify-center shadow-sm`}>
                                <span className="text-xs font-bold text-white">{getInitials(guide.name)}</span>
                              </div>
                              <span className="font-medium text-gray-900">{guide.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-600">{guide.email}</td>
                          <td className="py-4 px-6">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">ガイド</Badge>
                          </td>
                          <td className="py-4 px-6 text-gray-500">{new Date(guide.createdAt).toLocaleDateString('ja-JP')}</td>
                          <td className="py-4 px-6 text-right">
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                              詳細 <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
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
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <ClipboardList className="h-5 w-5 mr-3" />
                  予約管理
                  <Badge className="ml-3 bg-white/20 text-white border-0">{bookings.length}件</Badge>
                </h2>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {bookings.slice(0, 10).map((booking) => {
                    const guide = guides.find((g) => g.id === booking.guideId);
                    const traveler = travelers.find((t) => t.id === booking.travelerId);
                    return (
                      <div key={booking.id} className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-xl hover:border-pink-200 hover:shadow-md transition-all duration-200 bg-white">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center -space-x-2">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(traveler?.name || '')} flex items-center justify-center shadow-sm ring-2 ring-white z-10`}>
                              <span className="text-xs font-bold text-white">{getInitials(traveler?.name || '?')}</span>
                            </div>
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(guide?.name || '')} flex items-center justify-center shadow-sm ring-2 ring-white`}>
                              <span className="text-xs font-bold text-white">{getInitials(guide?.name || '?')}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {traveler?.name} <span className="text-gray-400 mx-1">→</span> {guide?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.date).toLocaleDateString('ja-JP')} · <span className="font-medium text-gray-700">¥{booking.totalPrice.toLocaleString()}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={
                            booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            booking.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }>
                            {booking.status === 'confirmed' && '確認済み'}
                            {booking.status === 'completed' && '完了'}
                            {booking.status === 'cancelled' && 'キャンセル'}
                            {booking.status === 'pending' && '確認待ち'}
                          </Badge>
                          <Button variant="outline" size="sm" className="hover:bg-pink-50 hover:border-pink-300">
                            詳細 <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
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
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-700 to-gray-800 px-8 py-5">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Shield className="h-5 w-5 mr-3 text-amber-400" />
                    メッセージフィルター設定
                  </h2>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-5">
                    <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl">
                      <input
                        type="checkbox"
                        checked={appSettings.wordFilter.enabled}
                        className="rounded h-5 w-5 text-violet-600 focus:ring-violet-500"
                        readOnly
                      />
                      <span className="text-sm font-semibold text-gray-700">
                        メッセージフィルターを有効にする
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        禁止ワードリスト（カンマ区切り）
                      </label>
                      <Textarea
                        value={wordFilter}
                        onChange={(e) => setWordFilter(e.target.value)}
                        rows={6}
                        placeholder="価格, 料金, 支払, 銀行, 現金..."
                        className="border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-300 rounded-xl"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        これらの単語を含むメッセージは自動的に***に置き換えられます
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-md h-11 px-6">
                      設定を保存
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-700 to-gray-800 px-8 py-5">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-emerald-400" />
                    手数料設定
                  </h2>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        プラットフォーム手数料（%）
                      </label>
                      <Input
                        type="number"
                        value={appSettings.commission.rate}
                        className="max-w-xs border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-300 rounded-xl h-11"
                        readOnly
                      />
                    </div>
                    <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-md h-11 px-6">
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
