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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Guide Photo */}
            <div className="lg:col-span-1">
              <div className="relative aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                <div className="text-9xl font-bold text-pink-300">{guide.photo}</div>
                {guide.verified && (
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <Verified className="h-6 w-6 text-blue-500 fill-blue-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Guide Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{guide.name}</h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-xl font-semibold text-gray-900">
                          {guide.rating > 0 ? guide.rating.toFixed(1) : '新規'}
                        </span>
                        {guide.reviewCount > 0 && (
                          <span className="text-gray-600 ml-2">({guide.reviewCount}件のレビュー)</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-pink-400 text-pink-400' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-pink-400" />
                    <span>{guide.area}</span>
                  </div>
                  <div className="flex items-center">
                    <Languages className="h-5 w-5 mr-2 text-pink-400" />
                    <span>{guide.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-pink-400" />
                    <span>{guide.yearsExperience}年の経験</span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">専門分野</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty, index) => (
                    <Badge key={index} className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {guide.certifications.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-pink-400" />
                    資格・認定
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="border-pink-200 text-gray-700">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      ¥{guide.pricePerHour.toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-2">/時間</span>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => setBookingDialogOpen(true)}
                    className="bg-pink-400 hover:bg-pink-500 text-white px-8"
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
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="about">概要</TabsTrigger>
            <TabsTrigger value="tours">ツアー</TabsTrigger>
            <TabsTrigger value="availability">空き状況</TabsTrigger>
            <TabsTrigger value="reviews">レビュー</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">自己紹介</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{guide.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">提供ツアー</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {guide.tourPlans.map((plan) => (
                <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{plan.title}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-pink-400" />
                        <span>{plan.duration}時間</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-pink-400" />
                        <span>最大{plan.maxPeople}名</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-2">含まれるもの:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {plan.includes.map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-pink-500">
                          ¥{plan.price.toLocaleString()}
                        </span>
                        <Button
                          onClick={() => setBookingDialogOpen(true)}
                          className="bg-pink-400 hover:bg-pink-500"
                        >
                          予約する
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">空き状況</h2>
                <div className="space-y-3">
                  {availableDates.length > 0 ? (
                    availableDates.map((date) => (
                      <div
                        key={date.toISOString()}
                        className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-green-600 mr-3" />
                          <span className="font-medium text-gray-900">
                            {format(date, 'yyyy年M月d日(E)', { locale: ja })}
                          </span>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                          予約可能
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      現在、予約可能な日程がありません
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                レビュー ({guideReviews.length}件)
              </h2>
              {guide.rating > 0 && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 mr-2" />
                    <span className="text-3xl font-bold text-gray-900">
                      {guide.rating.toFixed(1)}
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <span className="text-gray-600">{guide.reviewCount}件のレビュー</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {guideReviews.length > 0 ? (
                guideReviews.map((review) => <ReviewCard key={review.id} review={review} />)
              ) : (
                <div className="text-center py-12 text-gray-500">
                  まだレビューがありません
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
