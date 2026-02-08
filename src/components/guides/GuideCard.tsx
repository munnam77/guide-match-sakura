import React from 'react';
import Link from 'next/link';
import { Guide } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Languages, Verified, TrendingUp } from 'lucide-react';
import { getAvatarGradient, getInitials } from '@/lib/utils';

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  const isPopular = guide.reviewCount >= 100;

  return (
    <Link href={`/guides/${guide.id}`}>
      <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200 hover:border-pink-300">
        <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          {/* Gradient Avatar Circle */}
          <div className="relative">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getAvatarGradient(guide.name)} flex items-center justify-center shadow-xl ring-4 ring-white group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-4xl font-bold text-white tracking-wide">
                {getInitials(guide.name)}
              </span>
            </div>
          </div>

          {/* Gradient Overlay at Bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent"></div>

          {/* Verified Badge */}
          {guide.verified && (
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg ring-2 ring-blue-100">
              <Verified className="h-5 w-5 text-blue-500 fill-blue-500" />
            </div>
          )}

          {/* Popular Badge */}
          {isPopular && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-xs font-bold">人気</span>
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <div className="space-y-3">
            {/* Name and Rating */}
            <div>
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-pink-600 transition-colors mb-2">
                {guide.name}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="ml-1.5 text-sm font-bold text-gray-900">
                    {guide.rating > 0 ? guide.rating.toFixed(1) : '新規'}
                  </span>
                </div>
                {guide.reviewCount > 0 && (
                  <span className="text-sm text-gray-600 font-medium">({guide.reviewCount}件)</span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-700">
              <MapPin className="h-4 w-4 mr-2 text-pink-500" />
              <span className="text-sm font-medium">{guide.area}</span>
            </div>

            {/* Languages */}
            <div className="flex items-center text-gray-700">
              <Languages className="h-4 w-4 mr-2 text-pink-500" />
              <span className="text-sm font-medium">{guide.languages.join(', ')}</span>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2">
              {guide.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-medium bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200">
                  {specialty}
                </Badge>
              ))}
            </div>

            {/* Price */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ¥{guide.pricePerHour.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600 ml-1 font-medium">/時間</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
