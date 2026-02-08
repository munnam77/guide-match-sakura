'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuideFilters as FilterType } from '@/types';
import { Filter, X } from 'lucide-react';

interface GuideFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
  onReset: () => void;
}

const areas = ['すべて', '東京', '京都', '大阪', '北海道', '沖縄', '広島'];
const languages = ['すべて', '英語', '中国語', '韓国語', 'フランス語', 'スペイン語', 'イタリア語', 'ドイツ語'];
const specialties = [
  'すべて',
  '歴史文化',
  '食べ歩き',
  '自然アウトドア',
  'ポップカルチャー',
  '写真撮影',
  '寺社仏閣',
  'マリンスポーツ',
  'ナイトライフ',
  '伝統工芸',
  '庭園',
  '着物体験',
  '平和学習',
  '世界遺産',
  'アニメ・マンガ',
  'テクノロジー',
];

export default function GuideFilters({ filters, onFilterChange, onReset }: GuideFiltersProps) {
  const hasActiveFilters =
    filters.area ||
    filters.language ||
    filters.specialty ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minRating;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-pink-400" />
            <h3 className="text-lg font-semibold text-gray-900">絞り込み</h3>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-gray-600 hover:text-pink-400"
            >
              <X className="h-4 w-4 mr-1" />
              クリア
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Area */}
          <div className="space-y-2">
            <Label htmlFor="area">エリア</Label>
            <Select
              value={filters.area || 'すべて'}
              onValueChange={(value) =>
                onFilterChange({ ...filters, area: value === 'すべて' ? undefined : value })
              }
            >
              <SelectTrigger id="area">
                <SelectValue placeholder="エリアを選択" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="language">言語</Label>
            <Select
              value={filters.language || 'すべて'}
              onValueChange={(value) =>
                onFilterChange({ ...filters, language: value === 'すべて' ? undefined : value })
              }
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="言語を選択" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Specialty */}
          <div className="space-y-2">
            <Label htmlFor="specialty">専門分野</Label>
            <Select
              value={filters.specialty || 'すべて'}
              onValueChange={(value) =>
                onFilterChange({ ...filters, specialty: value === 'すべて' ? undefined : value })
              }
            >
              <SelectTrigger id="specialty">
                <SelectValue placeholder="専門分野を選択" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>料金範囲（円/時間）</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Input
                  type="number"
                  placeholder="最低"
                  value={filters.minPrice || ''}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      minPrice: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Input
                  type="number"
                  placeholder="最高"
                  value={filters.maxPrice || ''}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      maxPrice: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label htmlFor="rating">評価</Label>
            <Select
              value={filters.minRating?.toString() || 'すべて'}
              onValueChange={(value) =>
                onFilterChange({
                  ...filters,
                  minRating: value === 'すべて' ? undefined : parseFloat(value),
                })
              }
            >
              <SelectTrigger id="rating">
                <SelectValue placeholder="評価を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="すべて">すべて</SelectItem>
                <SelectItem value="4.5">4.5以上</SelectItem>
                <SelectItem value="4.0">4.0以上</SelectItem>
                <SelectItem value="3.5">3.5以上</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
