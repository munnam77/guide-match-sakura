import React from 'react';
import Link from 'next/link';
import { Guide } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Languages, Verified } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden">
        <div className="relative h-48 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center overflow-hidden">
          <div className="text-5xl font-bold text-pink-300 group-hover:scale-110 transition-transform duration-300">
            {guide.photo}
          </div>
          {guide.verified && (
            <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md">
              <Verified className="h-4 w-4 text-blue-500 fill-blue-500" />
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Name and Rating */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-pink-500 transition-colors">
                {guide.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {guide.rating > 0 ? guide.rating.toFixed(1) : '新規'}
                  </span>
                </div>
                {guide.reviewCount > 0 && (
                  <span className="text-sm text-gray-500">({guide.reviewCount}件)</span>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-pink-400" />
              <span className="text-sm">{guide.area}</span>
            </div>

            {/* Languages */}
            <div className="flex items-center text-gray-600">
              <Languages className="h-4 w-4 mr-1.5 text-pink-400" />
              <span className="text-sm">{guide.languages.join(', ')}</span>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1.5">
              {guide.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-pink-50 text-pink-700 hover:bg-pink-100">
                  {specialty}
                </Badge>
              ))}
            </div>

            {/* Price */}
            <div className="pt-2 border-t">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900">¥{guide.pricePerHour.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 ml-1">/時間</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
