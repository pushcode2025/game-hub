'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Clock, Eye, Heart, Newspaper, Search, X, Zap } from 'lucide-react';
import { GamingCard } from '@/components/gaming/GamingCard';
import { GamingButton } from '@/components/gaming/GamingButton';
import { Badge } from '@/components/gaming/Badge';
import { GlowText } from '@/components/gaming/GlowText';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface News {
  id: string;
  title: string;
  slug: string;
  cover_image: string;
  excerpt: string;
  author_name: string;
  category: string;
  tags: string[];
  views_count: number;
  likes_count: number;
  is_featured: boolean;
  created_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [featuredNews, setFeaturedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['أخبار', 'تحديثات', 'إعلانات', 'مقابلات', 'تقارير'];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data: featured } = await supabase
      .from('game_news')
      .select('*')
      .eq('published', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(2);

    const { data: regular } = await supabase
      .from('game_news')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (featured) setFeaturedNews(featured);
    if (regular) setNews(regular);
    setLoading(false);
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'منذ أقل من ساعة';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'منذ يوم واحد';
    if (diffInDays < 7) return `منذ ${diffInDays} أيام`;
    return past.toLocaleDateString('ar-SA');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-20 px-6">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress')] opacity-5 bg-cover bg-center" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Badge variant="warning" glow className="mb-6 inline-flex">
              <Zap className="w-4 h-4 ml-2" />
              {news.length} خبر جديد
            </Badge>
            <h1 className="text-6xl md:text-7xl font-black mb-4">
              <GlowText color="blue">أخبار</GlowText> الألعاب
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              آخر المستجدات والأخبار الحصرية من عالم الألعاب
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث عن خبر..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 backdrop-blur-xl border-2 border-slate-700 rounded-2xl pr-16 pl-6 py-5 text-lg focus:outline-none focus:border-blue-500 transition-all text-right"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">الفئات</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                !selectedCategory
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              الكل
            </motion.button>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <GamingCard className="h-96 bg-slate-800">
                  <div className="w-full h-full" />
                </GamingCard>
              </div>
            ))}
          </div>
        ) : (
          <>
            {featuredNews.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-orange-400" />
                  أخبار مميزة
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <Link href={`/news/${item.slug}`}>
                        <GamingCard hover glow className="h-full overflow-hidden cursor-pointer group">
                          <div className="relative h-80">
                            <img
                              src={item.cover_image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                            <div className="absolute top-4 right-4">
                              <Badge variant="danger" glow>
                                <TrendingUp className="w-4 h-4 ml-1" />
                                مميز
                              </Badge>
                            </div>

                            <div className="absolute bottom-0 right-0 left-0 p-6">
                              <Badge variant="warning" className="mb-3">
                                {item.category}
                              </Badge>
                              <h3 className="text-2xl font-bold mb-3 text-right group-hover:text-blue-400 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-slate-300 mb-4 line-clamp-2 text-right">
                                {item.excerpt}
                              </p>
                              <div className="flex items-center justify-between text-sm text-slate-400">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    <span>{item.likes_count}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{item.views_count}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{getTimeAgo(item.created_at)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </GamingCard>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-3xl font-bold mb-6">آخر الأخبار</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <Link href={`/news/${item.slug}`}>
                      <GamingCard hover glow className="p-0 overflow-hidden h-full cursor-pointer group">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={item.cover_image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                          <div className="absolute top-4 right-4">
                            <Badge variant="info">
                              {item.category}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors text-right">
                            {item.title}
                          </h3>

                          <p className="text-slate-400 text-sm mb-4 line-clamp-2 text-right">
                            {item.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-800 pt-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                <span>{item.likes_count}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{item.views_count}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-slate-400">
                              <Clock className="w-4 h-4" />
                              <span>{getTimeAgo(item.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </GamingCard>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {!loading && filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Newspaper className="w-20 h-20 text-slate-700 mx-auto mb-4" />
            <p className="text-2xl text-slate-500">لم يتم العثور على أخبار</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
