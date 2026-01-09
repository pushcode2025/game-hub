'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, Gamepad2, Users, Clock, Mic, MicOff, Trophy, Target, Zap, Globe, MessageCircle, Shield, Star, Swords } from 'lucide-react';
import { GamingCard } from '@/components/gaming/GamingCard';
import { GamingButton } from '@/components/gaming/GamingButton';
import { Badge } from '@/components/gaming/Badge';
import { GlowText } from '@/components/gaming/GlowText';

const popularGames = [
  { name: 'فالورانت', icon: '🎯', color: 'from-red-500 to-pink-500', players: 2500 },
  { name: 'ليج أوف ليجندز', icon: '⚔️', color: 'from-blue-500 to-cyan-500', players: 3200 },
  { name: 'أبيكس ليجندز', icon: '🎮', color: 'from-orange-500 to-red-500', players: 1800 },
  { name: 'CS:GO', icon: '🔫', color: 'from-yellow-500 to-orange-500', players: 2100 },
  { name: 'فورتنايت', icon: '🌟', color: 'from-purple-500 to-pink-500', players: 2800 },
  { name: 'أوفرواتش 2', icon: '🛡️', color: 'from-orange-400 to-yellow-500', players: 1500 },
  { name: 'روكيت ليج', icon: '🚗', color: 'from-blue-400 to-purple-500', players: 1200 },
  { name: 'ماينكرافت', icon: '🟫', color: 'from-green-500 to-emerald-600', players: 3500 },
];

const platforms = [
  { name: 'الحاسوب', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'بلايستيشن', icon: '🎮', color: 'from-blue-600 to-indigo-600' },
  { name: 'إكس بوكس', icon: '🎯', color: 'from-green-500 to-emerald-500' },
  { name: 'نينتندو سويتش', icon: '🕹️', color: 'from-red-500 to-pink-500' },
  { name: 'الجوال', icon: '📱', color: 'from-purple-500 to-pink-500' },
];

const activityTypes = [
  { name: 'تصنيف', icon: Trophy, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'عادي', icon: Gamepad2, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'تعاوني', icon: Users, color: 'text-green-400', bg: 'from-green-500/20 to-emerald-500/20' },
  { name: 'بطولة', icon: Target, color: 'text-pink-400', bg: 'from-pink-500/20 to-rose-500/20' },
];

const teamSizes = ['1ضد1', '2ضد2', '3ضد3', '5ضد5', 'فريق', 'أي'];

const mockPosts = [
  {
    id: 1,
    player: { name: 'صائد الظلال', avatar: '🦊', level: 85, rank: 'ماسي II' },
    game: 'فالورانت',
    platform: 'الحاسوب',
    activityType: 'تصنيف',
    teamSize: '5ضد5',
    description: 'أبحث عن زملاء جادين للوصول إلى رتبة خالد. يجب أن يكون لديك تصويب جيد وتواصل ممتاز.',
    voiceRequired: true,
    playTime: 'الآن',
    lookingFor: ['تواصل جيد', 'مهارة عالية', 'موقف إيجابي'],
    timePosted: 'منذ 5 دقائق'
  },
  {
    id: 2,
    player: { name: 'اللاعب الغامض', avatar: '🐉', level: 62, rank: 'بلاتيني III' },
    game: 'ليج أوف ليجندز',
    platform: 'الحاسوب',
    activityType: 'عادي',
    teamSize: 'أي',
    description: 'ألعاب ARAM هادئة، فقط أريد الاستمتاع وتكوين صداقات!',
    voiceRequired: false,
    playTime: 'المساء',
    lookingFor: ['ودود', 'لاعبين عاديين'],
    timePosted: 'منذ 12 دقيقة'
  },
  {
    id: 3,
    player: { name: 'كاسر العواصف', avatar: '⚡', level: 94, rank: 'ماستر' },
    game: 'أبيكس ليجندز',
    platform: 'بلايستيشن',
    activityType: 'تصنيف',
    teamSize: '3ضد3',
    description: 'أحتاج 2 للعب التصنيف. نهدف إلى المفترس. لنحقق ذلك!',
    voiceRequired: true,
    playTime: 'الآن',
    lookingFor: ['خبرة', 'ميكروفون مطلوب', 'تنافسي'],
    timePosted: 'منذ 20 دقيقة'
  },
  {
    id: 4,
    player: { name: 'الفارس القمري', avatar: '🌙', level: 71, rank: 'ذهبي I' },
    game: 'فورتنايت',
    platform: 'إكس بوكس',
    activityType: 'تعاوني',
    teamSize: 'فريق',
    description: 'ملء الفريق لبعض ألعاب BR الهادئة. لا سلبية من فضلك!',
    voiceRequired: false,
    playTime: 'بعد الظهر',
    lookingFor: ['ودود', 'لاعب فريق'],
    timePosted: 'منذ 35 دقيقة'
  },
  {
    id: 5,
    player: { name: 'طائر الفينيق', avatar: '🔥', level: 88, rank: 'بطل' },
    game: 'روكيت ليج',
    platform: 'الحاسوب',
    activityType: 'بطولة',
    teamSize: '3ضد3',
    description: 'أبحث عن زملاء للبطولة. يجب أن تكون جراند شامب أو أعلى.',
    voiceRequired: true,
    playTime: 'عطلة نهاية الأسبوع',
    lookingFor: ['مهارة عالية', 'خبرة بطولة', 'ملتزم'],
    timePosted: 'منذ ساعة'
  },
];

export default function PlayerDiscoveryPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedTeamSize, setSelectedTeamSize] = useState<string | null>(null);
  const [voiceOnly, setVoiceOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    );
  };

  const clearFilters = () => {
    setSelectedGame(null);
    setSelectedPlatforms([]);
    setSelectedActivities([]);
    setSelectedTeamSize(null);
    setVoiceOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 py-16 px-6">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress')] opacity-5 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Badge variant="success" glow className="mb-6 inline-flex">
              <Users className="w-4 h-4 ml-2" />
              {mockPosts.length}+ لاعب متصل
            </Badge>
            <h1 className="text-6xl md:text-7xl font-black mb-4">
              ابحث عن <GlowText color="blue">فريقك</GlowText>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              تواصل مع اللاعبين الذين يطابقون أسلوب لعبك ومستوى مهارتك
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
                placeholder="ابحث عن لعبة، لاعب، أو وسم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 backdrop-blur-xl border-2 border-slate-700 rounded-2xl pr-16 pl-6 py-5 text-lg focus:outline-none focus:border-cyan-500 transition-all text-right"
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
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Gamepad2 className="w-8 h-8 text-cyan-400" />
              اختر اللعبة
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 hover:border-cyan-500 transition-all"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {popularGames.map((game, index) => (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGame(game.name === selectedGame ? null : game.name)}
                className="cursor-pointer"
              >
                <GamingCard
                  hover
                  glow={selectedGame === game.name}
                  className={`p-6 text-center relative overflow-hidden transition-all ${
                    selectedGame === game.name ? 'ring-2 ring-cyan-500' : ''
                  }`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${game.color} ${
                      selectedGame === game.name ? 'opacity-20' : 'opacity-0'
                    } transition-opacity`}
                  />
                  <div className="text-4xl mb-3 relative">{game.icon}</div>
                  <h3 className="text-sm font-bold mb-2 relative">{game.name}</h3>
                  <Badge variant="info" className="text-xs">
                    <Users className="w-3 h-3 ml-1" />
                    {game.players}
                  </Badge>
                </GamingCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <GamingCard className="p-8 mb-12 bg-slate-900/50 backdrop-blur-xl">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Globe className="w-6 h-6 text-purple-400" />
                      المنصة
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {platforms.map((platform, index) => (
                        <motion.button
                          key={platform.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => togglePlatform(platform.name)}
                          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all ${
                            selectedPlatforms.includes(platform.name)
                              ? `bg-gradient-to-r ${platform.color} text-white shadow-lg`
                              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                          }`}
                        >
                          <span className="text-xl">{platform.icon}</span>
                          {platform.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Target className="w-6 h-6 text-orange-400" />
                      نوع النشاط
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {activityTypes.map((activity, index) => (
                        <motion.button
                          key={activity.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleActivity(activity.name)}
                          className={`p-6 rounded-2xl border-2 transition-all ${
                            selectedActivities.includes(activity.name)
                              ? `border-${activity.color.split('-')[1]}-500 bg-gradient-to-br ${activity.bg}`
                              : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                          }`}
                        >
                          <activity.icon className={`w-8 h-8 ${activity.color} mx-auto mb-3`} />
                          <p className="font-bold">{activity.name}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-green-400" />
                      حجم الفريق
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {teamSizes.map((size, index) => (
                        <motion.button
                          key={size}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedTeamSize(size === selectedTeamSize ? null : size)}
                          className={`w-20 h-20 rounded-2xl font-bold text-lg transition-all ${
                            selectedTeamSize === size
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setVoiceOnly(!voiceOnly)}
                      className={`w-full p-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-4 ${
                        voiceOnly
                          ? 'border-blue-500 bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                          : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                      }`}
                    >
                      {voiceOnly ? (
                        <Mic className="w-6 h-6 text-blue-400" />
                      ) : (
                        <MicOff className="w-6 h-6 text-slate-400" />
                      )}
                      <span className="text-xl font-bold">مطلوب دردشة صوتية</span>
                    </motion.button>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearFilters}
                      className="px-8 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl font-semibold transition-all"
                    >
                      مسح جميع الفلاتر
                    </motion.button>
                  </div>
                </div>
              </GamingCard>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-cyan-400" />
            اللاعبون المتاحون
          </h2>
          <Badge variant="success" className="text-lg px-6 py-2">
            <Zap className="w-5 h-5 ml-2" />
            {mockPosts.length} منشور نشط
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <GamingCard hover glow className="p-8 relative overflow-hidden group h-full">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-right">
                      <Badge variant="success" className="mb-2">
                        <Clock className="w-3 h-3 ml-1" />
                        {post.playTime}
                      </Badge>
                      <p className="text-xs text-slate-500">{post.timePosted}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1 text-right">{post.player.name}</h3>
                        <div className="flex items-center gap-2 justify-end">
                          <Badge variant="info" className="text-xs">
                            مستوى {post.player.level}
                          </Badge>
                          <Badge variant="warning" className="text-xs">
                            <Trophy className="w-3 h-3 ml-1" />
                            {post.player.rank}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl">
                        {post.player.avatar}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 justify-end">
                    <Badge variant="info">
                      <Gamepad2 className="w-3 h-3 ml-1" />
                      {post.game}
                    </Badge>
                    <Badge variant="info">
                      <Globe className="w-3 h-3 ml-1" />
                      {post.platform}
                    </Badge>
                    <Badge variant="warning">{post.activityType}</Badge>
                    <Badge variant="success">
                      <Users className="w-3 h-3 ml-1" />
                      {post.teamSize}
                    </Badge>
                    {post.voiceRequired ? (
                      <Badge variant="info">
                        <Mic className="w-3 h-3 ml-1" />
                        صوتي
                      </Badge>
                    ) : (
                      <Badge>
                        <MicOff className="w-3 h-3 ml-1" />
                        اختياري
                      </Badge>
                    )}
                  </div>

                  <p className="text-slate-300 mb-4 leading-relaxed text-right">{post.description}</p>

                  <div className="mb-6">
                    <p className="text-sm text-slate-400 mb-2 text-right">يبحث عن:</p>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {post.lookingFor.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-slate-800/50 rounded-lg text-sm text-slate-300 border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <GamingButton variant="ghost">
                        <MessageCircle className="w-4 h-4" />
                      </GamingButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <GamingButton variant="accent" className="w-full" glow>
                        <Users className="w-4 h-4 ml-2" />
                        انضم للفريق
                      </GamingButton>
                    </motion.div>
                  </div>
                </div>
              </GamingCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <GamingButton variant="primary" size="lg">
            تحميل المزيد من اللاعبين
          </GamingButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="fixed bottom-8 left-8 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <button className="relative w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:shadow-2xl transition-all">
            <Star className="w-8 h-8 text-white" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
