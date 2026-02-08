'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { guides } from '@/data/guides';
import { reviews } from '@/data/reviews';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReviewCard from '@/components/guides/ReviewCard';
import BookingDialog from '@/components/booking/BookingDialog';
import { getAvatarGradient, getInitials } from '@/lib/utils';
import {
  Star,
  MapPin,
  Languages,
  Verified,
  Award,
  Briefcase,
  Heart,
  Share2,
  Calendar,
  Clock,
  Users,
  CheckCircle,
} from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function GuideProfilePage() {
  const params = useParams();
  const guideId = params.id as string;
  const guide = guides.find((g) => g.id === guideId);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-12 w-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ガイドが見つかりません</h2>
          <p className="text-gray-600">このガイドは存在しないか、削除されました。</p>
        </div>
      </div>
    );
  }

  const guideReviews = reviews.filter((r) => r.guideId === guide.id);
  const today = startOfToday();
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(today, i)).filter((date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return guide.availability[dateStr] === true;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Guide Avatar */}
            <div className="lg:col-span-1">
              <div className={`relative aspect-square bg-gradient-to-br ${getAvatarGradient(guide.name)} rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-white`}>
                <span className="text-8xl md:text-9xl font-bold text-white/90">{getInitials(guide.name)}</span>
                {guide.verified && (
                  <div className="absolute top-5 right-5 bg-white rounded-full p-2.5 shadow-lg">
                    <Verified className="h-6 w-6 text-blue-500 fill-blue-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Guide Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">{guide.name}</h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-amber-50 px-4 py-2 rounded-xl">
                        <Star className="h-6 w-6 text-amber-400 fill-amber-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900">
                          {guide.rating > 0 ? guide.rating.toFixed(1) : '新規'}
                        </span>
                        {guide.reviewCount > 0 && (
                          <span className="text-gray-600 ml-2 font-medium">({guide.reviewCount}件)</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`h-12 w-12 rounded-xl border-2 ${isFavorite ? 'border-pink-300 bg-pink-50' : 'hover:border-pink-200'}`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-pink-400 text-pink-400' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2 hover:border-blue-200">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl">
                    <MapPin className="h-5 w-5 mr-2 text-pink-500" />
                    <span className="font-medium">{guide.area}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl">
                    <Languages className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="font-medium">{guide.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl">
                    <Briefcase className="h-5 w-5 mr-2 text-emerald-500" />
                    <span className="font-medium">{guide.yearsExperience}年の経験</span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">専門分野</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty, index) => (
                    <Badge key={index} className="bg-pink-50 text-pink-700 border-pink-200 px-3 py-1.5 text-sm font-medium">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {guide.certifications.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-amber-500" />
                    資格・認定
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="border-2 border-amber-200 text-gray-700 px-3 py-1.5">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Price CTA */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border border-pink-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      ¥{guide.pricePerHour.toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-2 text-lg">/時間</span>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => setBookingDialogOpen(true)}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  >
                    予約する
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="bg-white p-1.5 shadow-md border-2 border-gray-200 grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="about" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white font-semibold">概要</TabsTrigger>
            <TabsTrigger value="tours" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white font-semibold">ツアー</TabsTrigger>
            <TabsTrigger value="availability" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white font-semibold">空き状況</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white font-semibold">レビュー</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-5">自己紹介</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{guide.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">提供ツアー</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {guide.tourPlans.map((plan) => (
                <Card key={plan.id} className="hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-pink-200 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-6 py-5 border-b border-pink-100">
                      <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-5 leading-relaxed">{plan.description}</p>
                      <div className="flex flex-wrap gap-3 mb-5">
                        <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                          <Clock className="h-4 w-4 mr-1.5 text-pink-500" />
                          {plan.duration}時間
                        </span>
                        <span className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                          <Users className="h-4 w-4 mr-1.5 text-blue-500" />
                          最大{plan.maxPeople}名
                        </span>
                      </div>
                      <div className="border-t pt-5">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">含まれるもの</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {plan.includes.map((item, index) => (
                            <Badge key={index} className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {item}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                            ¥{plan.price.toLocaleString()}
                          </span>
                          <Button
                            onClick={() => setBookingDialogOpen(true)}
                            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md px-6"
                          >
                            予約する
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">空き状況</h2>
                <div className="space-y-3">
                  {availableDates.length > 0 ? (
                    availableDates.map((date) => (
                      <div
                        key={date.toISOString()}
                        className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-md mr-4">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900 text-lg">
                            {format(date, 'yyyy年M月d日(E)', { locale: ja })}
                          </span>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 px-4 py-1.5 font-semibold">
                          予約可能
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-10 w-10 text-gray-300" />
                      </div>
                      <p className="text-gray-500 text-lg">現在、予約可能な日程がありません</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                レビュー ({guideReviews.length}件)
              </h2>
              {guide.rating > 0 && (
                <div className="flex items-center space-x-5 bg-white p-5 rounded-2xl shadow-md border-2 border-gray-100 w-fit">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-amber-400 fill-amber-400 mr-3" />
                    <span className="text-4xl font-extrabold text-gray-900">
                      {guide.rating.toFixed(1)}
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <span className="text-gray-600 font-medium text-lg">{guide.reviewCount}件のレビュー</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {guideReviews.length > 0 ? (
                guideReviews.map((review) => <ReviewCard key={review.id} review={review} />)
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-10 w-10 text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-lg">まだレビューがありません</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Dialog */}
      <BookingDialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen} guide={guide} />
    </div>
  );
}
