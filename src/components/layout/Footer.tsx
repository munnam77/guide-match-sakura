import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto relative overflow-hidden">
      {/* Top Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🌸</span>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                SakuraGuide
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              日本を深く知る。現地ガイドと旅行者をつなぐプラットフォーム。
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:scale-110 bg-white p-2 rounded-lg shadow-sm hover:shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:scale-110 bg-white p-2 rounded-lg shadow-sm hover:shadow-md"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:scale-110 bg-white p-2 rounded-lg shadow-sm hover:shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:scale-110 bg-white p-2 rounded-lg shadow-sm hover:shadow-md"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Travelers */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base">旅行者の方へ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  ガイドを探す
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  ご利用方法
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  安全への取り組み
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>

          {/* For Guides */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base">ガイドの方へ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  ガイド登録
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  ガイド一覧
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  品質基準
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  ガイドFAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 mb-5 text-base">会社情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  プレスリリース
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  採用情報
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-pink-400 transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © 2026 SakuraGuide, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="text-sm text-gray-500 hover:text-pink-400 transition-colors cursor-pointer">
                利用規約
              </span>
              <span className="text-sm text-gray-500 hover:text-pink-400 transition-colors cursor-pointer">
                プライバシーポリシー
              </span>
              <span className="text-sm text-gray-500 hover:text-pink-400 transition-colors cursor-pointer">
                特定商取引法
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
