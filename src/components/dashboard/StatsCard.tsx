import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  description?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, description }: StatsCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-pink-500 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <p className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">{value}</p>
            {trend && (
              <p
                className={`text-sm font-semibold ${
                  trend.positive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.positive ? '↑' : '↓'} {trend.value}
              </p>
            )}
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          </div>
          <div className="ml-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
