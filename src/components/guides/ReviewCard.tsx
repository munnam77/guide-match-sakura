import React from 'react';
import { Review } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { travelers } from '@/data/travelers';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const traveler = travelers.find((t) => t.id === review.travelerId);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-pink-100 text-pink-600 font-semibold text-sm">
                  {traveler ? getInitials(traveler.name) : '??'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{traveler?.name || '匿名'}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(review.createdAt), 'yyyy年M月d日', { locale: ja })}
                </p>
              </div>
            </div>
            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 fill-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>

          {/* Helpful */}
          <div className="flex items-center space-x-2 pt-2 border-t">
            <button className="flex items-center space-x-1.5 text-sm text-gray-500 hover:text-pink-400 transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span>参考になった</span>
            </button>
            {review.helpful > 0 && (
              <span className="text-sm text-gray-400">({review.helpful})</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
