'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Play, Image as ImageIcon, Video, TrendingUp, Eye, Bookmark, ArrowRight, X, ThumbsUp, Smile, Flame, Award, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { GamingButton } from '@/components/gaming/GamingButton';
import { GamingCard } from '@/components/gaming/GamingCard';
import { Badge } from '@/components/gaming/Badge';
import { GlowText } from '@/components/gaming/GlowText';

const galleryItems = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'لقطة ملحمية من المعركة الأخيرة',
    author: 'أحمد المحترف',
    likes: 1245,
    comments: 89,
    views: 15600,
    game: 'The Last Guardian',
    trending: true
  },
  {
    id: 2,
    type: 'video',
    url: 'https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'أفضل لحظات اللعب هذا الأسبوع',
    author: 'فاطمة الجيمر',
    likes: 2180,
    comments: 156,
    views: 28900,
    game: 'Cyberpunk Dreams',
    trending: true
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.pexels.com/photos/3945635/pexels-photo-3945635.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3945635/pexels-photo-3945635.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'استكشاف العالم المفتوح',
    author: 'محمد اللاعب',
    likes: 890,
    comments: 67,
    views: 12400,
    game: 'Shadow Legends',
    trending: false
  },
  {
    id: 4,
    type: 'video',
    url: 'https://images.pexels.com/photos/3945668/pexels-photo-3945668.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3945668/pexels-photo-3945668.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'استراتيجية الفوز بالجولة الأخيرة',
    author: 'سارة القيمر',
    likes: 1567,
    comments: 203,
    views: 19800,
    game: 'Kingdom Rising',
    trending: false
  },
  {
    id: 5,
    type: 'image',
    url: 'https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'سباق مثير على الطريق السريع',
    author: 'خالد السائق',
    likes: 2340,
    comments: 178,
    views: 34200,
    game: 'Racing Thunder',
    trending: true
  },
  {
    id: 6,
    type: 'video',
    url: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'رحلة عبر الفضاء الخارجي',
    author: 'ليلى الفضائية',
    likes: 1890,
    comments: 134,
    views: 23500,
    game: 'Space Odyssey',
    trending: false
  },
  {
    id: 7,
    type: 'image',
    url: 'https://images.pexels.com/photos/3945625/pexels-photo-3945625.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3945625/pexels-photo-3945625.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'مواجهة التنين الأسطوري',
    author: 'يوسف المغامر',
    likes: 3120,
    comments: 245,
    views: 41000,
    game: 'Dragon Quest',
    trending: true
  },
  {
    id: 8,
    type: 'image',
    url: 'https://images.pexels.com/photos/3945664/pexels-photo-3945664.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3945664/pexels-photo-3945664.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'معركة العصور الوسطى',
    author: 'نور المحاربة',
    likes: 1678,
    comments: 112,
    views: 18900,
    game: 'Medieval Warriors',
    trending: false
  },
  {
    id: 9,
    type: 'video',
    url: 'https://images.pexels.com/photos/3945622/pexels-photo-3945622.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3945622/pexels-photo-3945622.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'أفضل الحركات الاحترافية',
    author: 'عمر البطل',
    likes: 2890,
    comments: 189,
    views: 37600,
    game: 'Combat Masters',
    trending: true
  }
];

const reactions = [
  { icon: ThumbsUp, label: 'إعجاب', color: 'text-blue-400' },
  { icon: Heart, label: 'حب', color: 'text-red-400' },
  { icon: Flame, label: 'نار', color: 'text-orange-400' },
  { icon: Award, label: 'رائع', color: 'text-yellow-400' },
  { icon: Smile, label: 'مضحك', color: 'text-green-400' }
];

const mockComments = [
  { id: 1, author: 'عمر الجيمر', comment: 'لقطة رائعة! كيف حصلت عليها؟', time: 'منذ ساعة', avatar: 'ع' },
  { id: 2, author: 'سارة اللاعبة', comment: 'أفضل محتوى شفته اليوم', time: 'منذ ساعتين', avatar: 'س' },
  { id: 3, author: 'أحمد البطل', comment: 'ممتاز! هل يمكنك مشاركة الإعدادات؟', time: 'منذ 3 ساعات', avatar: 'أ' },
  { id: 4, author: 'ليلى المغامرة', comment: 'يستاهل كل الاحترام', time: 'منذ 4 ساعات', avatar: 'ل' },
  { id: 5, author: 'خالد البطل', comment: 'واو! هذا مذهل', time: 'منذ 5 ساعات', avatar: 'خ' }
];

export default function MediaGallery() {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [commentText, setCommentText] = useState('');
  const [selectedReaction, setSelectedReaction] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(item =>
    filter === 'all' || item.type === filter
  );

  const trendingItems = galleryItems.filter(item => item.trending).slice(0, 3);

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getCurrentItemIndex = () => {
    if (!selectedItem) return -1;
    return filteredItems.findIndex(item => item.id === selectedItem.id);
  };

  const navigateToNext = () => {
    const currentIndex = getCurrentItemIndex();
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    }
  };

  const navigateToPrevious = () => {
    const currentIndex = getCurrentItemIndex();
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.08)_0%,_transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <motion.div
          className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-pink-900/20 to-slate-900 border-b border-slate-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress')] opacity-5 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <Link href="/">
              <motion.div
                className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-5 h-5 ml-2" />
                العودة للرئيسية
              </motion.div>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge variant="danger" glow className="mb-6 inline-flex">
                  <ImageIcon className="w-4 h-4 ml-2" />
                  أكثر من 50 ألف صورة وفيديو
                </Badge>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-7xl font-black mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <GlowText color="pink">معرض الوسائط</GlowText> المجتمعي
              </motion.h1>

              <motion.p
                className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                شارك أفضل لحظاتك في الألعاب واستمتع بمحتوى المجتمع
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row min-h-screen">
          <motion.div
            className={`${selectedItem ? 'lg:w-1/2' : 'w-full'} transition-all duration-500 px-6 py-16`}
            animate={{
              width: selectedItem ? '50%' : '100%',
            }}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-black">
                    المحتوى <GlowText color="pink">الرائج</GlowText>
                  </h2>
                  <TrendingUp className="w-8 h-8 text-pink-400 animate-pulse" />
                </div>

                <div className={`grid grid-cols-1 ${selectedItem ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 transition-all duration-500`}>
                  {trendingItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      onClick={() => setSelectedItem(item)}
                    >
                      <GamingCard hover glow className="overflow-hidden group cursor-pointer">
                        <div className="relative h-72 overflow-hidden">
                          <motion.img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                          {item.type === 'video' && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              <motion.div
                                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                whileHover={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                              >
                                <Play className="w-8 h-8 text-white mr-1" fill="white" />
                              </motion.div>
                            </motion.div>
                          )}

                          <div className="absolute top-4 right-4">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                            >
                              <Badge variant="danger" glow>
                                <TrendingUp className="w-3 h-3 ml-1" />
                                رائج
                              </Badge>
                            </motion.div>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-4 text-white text-sm">
                              <motion.div
                                className="flex items-center gap-1"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Heart className="w-4 h-4" />
                                <span>{item.likes.toLocaleString('ar-SA')}</span>
                              </motion.div>
                              <motion.div
                                className="flex items-center gap-1"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Eye className="w-4 h-4" />
                                <span>{item.views.toLocaleString('ar-SA')}</span>
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 bg-gradient-to-br from-slate-900/95 to-slate-800/95">
                          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>{item.author}</span>
                            <span>{item.game}</span>
                          </div>
                        </div>
                      </GamingCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                  <h2 className="text-4xl font-black">
                    جميع <GlowText color="blue">الوسائط</GlowText>
                  </h2>

                  <div className="flex gap-3">
                    {[
                      { value: 'all', label: 'الكل', icon: ImageIcon },
                      { value: 'image', label: 'صور', icon: ImageIcon },
                      { value: 'video', label: 'فيديوهات', icon: Video }
                    ].map(({ value, label, icon: Icon }) => (
                      <motion.button
                        key={value}
                        onClick={() => setFilter(value as typeof filter)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${
                          filter === value
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                            : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 inline ml-2" />
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className={`grid grid-cols-1 ${selectedItem ? 'md:grid-cols-1 lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 transition-all duration-500`}>
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => setSelectedItem(item)}
                    >
                      <GamingCard hover className="overflow-hidden group cursor-pointer">
                        <div className="relative h-64 overflow-hidden">
                          <motion.img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

                          {item.type === 'video' && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              whileHover={{ scale: 1.1 }}
                            >
                              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Play className="w-7 h-7 text-white mr-1" fill="white" />
                              </div>
                            </motion.div>
                          )}

                          <div className="absolute top-3 right-3 flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(item.id);
                              }}
                              className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                                bookmarked.has(item.id)
                                  ? 'bg-yellow-500/30 text-yellow-400'
                                  : 'bg-black/30 text-white hover:bg-black/50'
                              }`}
                            >
                              <Bookmark className="w-4 h-4" fill={bookmarked.has(item.id) ? 'currentColor' : 'none'} />
                            </motion.button>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="flex items-center justify-between text-white text-sm">
                              <div className="flex items-center gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLike(item.id);
                                  }}
                                  className="flex items-center gap-1"
                                >
                                  <Heart
                                    className={`w-4 h-4 transition-colors ${
                                      liked.has(item.id) ? 'text-red-400' : ''
                                    }`}
                                    fill={liked.has(item.id) ? 'currentColor' : 'none'}
                                  />
                                  <span>{(item.likes + (liked.has(item.id) ? 1 : 0)).toLocaleString('ar-SA')}</span>
                                </motion.button>
                                <motion.div
                                  className="flex items-center gap-1"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{item.comments.toLocaleString('ar-SA')}</span>
                                </motion.div>
                              </div>
                              <motion.div
                                className="flex items-center gap-1"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Eye className="w-4 h-4" />
                                <span>{item.views.toLocaleString('ar-SA')}</span>
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">{item.author}</span>
                            <Badge variant="info" className="text-xs">{item.game}</Badge>
                          </div>
                        </div>
                      </GamingCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {selectedItem && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed lg:sticky top-0 right-0 w-full lg:w-1/2 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 overflow-y-auto z-40"
              >
                <div className="relative h-full">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 left-4 z-50 p-3 rounded-xl bg-slate-800/80 backdrop-blur-sm text-white hover:bg-slate-700 transition-all shadow-lg"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>

                  {getCurrentItemIndex() > 0 && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={navigateToPrevious}
                      className="absolute top-1/2 left-4 z-50 p-3 rounded-full bg-slate-800/80 backdrop-blur-sm text-white hover:bg-slate-700 transition-all shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                  )}

                  {getCurrentItemIndex() < filteredItems.length - 1 && (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={navigateToNext}
                      className="absolute top-1/2 right-4 z-50 p-3 rounded-full bg-slate-800/80 backdrop-blur-sm text-white hover:bg-slate-700 transition-all shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  )}

                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative h-[50vh] lg:h-[60vh] overflow-hidden bg-slate-950"
                  >
                    <motion.img
                      key={selectedItem.id}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="w-full h-full object-contain"
                    />
                    {selectedItem.type === 'video' && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-2xl"
                        >
                          <Play className="w-10 h-10 text-white mr-1" fill="white" />
                        </motion.div>
                      </motion.div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                  </motion.div>

                  <div className="p-6 lg:p-8 space-y-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-3xl lg:text-4xl font-black mb-3 leading-tight">
                            {selectedItem.title}
                          </h2>
                          <div className="flex items-center gap-4 text-slate-400">
                            <span className="text-lg">{selectedItem.author}</span>
                            <span>•</span>
                            <Badge variant="info">{selectedItem.game}</Badge>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all shadow-lg"
                        >
                          <Share2 className="w-5 h-5" />
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                        {reactions.map(({ icon: Icon, label, color }, index) => (
                          <motion.button
                            key={label}
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.05 + 0.3, type: 'spring' }}
                            whileHover={{ scale: 1.15, y: -5, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedReaction(selectedReaction === index ? null : index)}
                            className={`p-3 rounded-xl transition-all group ${
                              selectedReaction === index
                                ? 'bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg'
                                : 'bg-slate-800 hover:bg-slate-700'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
                          </motion.button>
                        ))}
                      </div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="grid grid-cols-3 gap-4 mb-6"
                      >
                        {[
                          { icon: Heart, value: selectedItem.likes, label: 'إعجاب', color: 'red' },
                          { icon: MessageCircle, value: selectedItem.comments, label: 'تعليق', color: 'cyan' },
                          { icon: Eye, value: selectedItem.views, label: 'مشاهدة', color: 'green' }
                        ].map(({ icon: Icon, value, label, color }, index) => (
                          <motion.div
                            key={label}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.1 + 0.4, type: 'spring' }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="p-4 rounded-xl bg-slate-800/50 text-center cursor-pointer hover:bg-slate-800 transition-all"
                          >
                            <div className={`flex items-center justify-center gap-2 text-${color}-400 mb-1`}>
                              <Icon className="w-5 h-5" />
                              <span className="text-2xl font-bold">{value.toLocaleString('ar-SA')}</span>
                            </div>
                            <p className="text-slate-400 text-sm">{label}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="border-t border-slate-800 pt-6"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-black flex items-center gap-2">
                          <MessageCircle className="w-6 h-6 text-cyan-400" />
                          التعليقات
                        </h3>
                        <Badge variant="info">{mockComments.length}</Badge>
                      </div>

                      <motion.div
                        className="flex gap-3 mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <motion.input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="اكتب تعليقك..."
                          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          whileFocus={{ scale: 1.02 }}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                        >
                          <Send className="w-5 h-5" />
                        </motion.button>
                      </motion.div>

                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {mockComments.map((comment, index) => (
                          <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.7 }}
                            whileHover={{ x: 5, scale: 1.01 }}
                            className="flex gap-3 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer"
                          >
                            <motion.div
                              className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              {comment.avatar}
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-bold text-sm">{comment.author}</span>
                                <span className="text-slate-500 text-xs">{comment.time}</span>
                              </div>
                              <p className="text-slate-300 text-sm leading-relaxed">{comment.comment}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                                >
                                  <Heart className="w-3 h-3" />
                                  إعجاب
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                                >
                                  رد
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
