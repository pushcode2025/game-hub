'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, Gamepad2, Users, Clock, Mic, MicOff, Trophy, Target, Zap, Globe, MessageCircle, Shield, Star, Swords } from 'lucide-react';
import { GamingCard } from '@/components/gaming/GamingCard';
import { GamingButton } from '@/components/gaming/GamingButton';
import { Badge } from '@/components/gaming/Badge';
import { GlowText } from '@/components/gaming/GlowText';

const popularGames = [
  { name: 'Valorant', icon: '🎯', color: 'from-red-500 to-pink-500', players: 2500 },
  { name: 'League of Legends', icon: '⚔️', color: 'from-blue-500 to-cyan-500', players: 3200 },
  { name: 'Apex Legends', icon: '🎮', color: 'from-orange-500 to-red-500', players: 1800 },
  { name: 'CS:GO', icon: '🔫', color: 'from-yellow-500 to-orange-500', players: 2100 },
  { name: 'Fortnite', icon: '🌟', color: 'from-purple-500 to-pink-500', players: 2800 },
  { name: 'Overwatch 2', icon: '🛡️', color: 'from-orange-400 to-yellow-500', players: 1500 },
  { name: 'Rocket League', icon: '🚗', color: 'from-blue-400 to-purple-500', players: 1200 },
  { name: 'Minecraft', icon: '🟫', color: 'from-green-500 to-emerald-600', players: 3500 },
];

const platforms = [
  { name: 'PC', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'PlayStation', icon: '🎮', color: 'from-blue-600 to-indigo-600' },
  { name: 'Xbox', icon: '🎯', color: 'from-green-500 to-emerald-500' },
  { name: 'Nintendo Switch', icon: '🕹️', color: 'from-red-500 to-pink-500' },
  { name: 'Mobile', icon: '📱', color: 'from-purple-500 to-pink-500' },
];

const activityTypes = [
  { name: 'Ranked', icon: Trophy, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'Casual', icon: Gamepad2, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'Co-op', icon: Users, color: 'text-green-400', bg: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Tournament', icon: Target, color: 'text-pink-400', bg: 'from-pink-500/20 to-rose-500/20' },
];

const teamSizes = ['1v1', '2v2', '3v3', '5v5', 'Squad', 'Any'];

const mockPosts = [
  {
    id: 1,
    player: { name: 'ShadowHunter', avatar: '🦊', level: 85, rank: 'Diamond II' },
    game: 'Valorant',
    platform: 'PC',
    activityType: 'Ranked',
    teamSize: '5v5',
    description: 'Looking for serious teammates to push to Immortal. Must have good aim and comms.',
    voiceRequired: true,
    playTime: 'Now',
    lookingFor: ['Good Communication', 'High Skill', 'Positive Attitude'],
    timePosted: '5 min ago'
  },
  {
    id: 2,
    player: { name: 'MysticGamer', avatar: '🐉', level: 62, rank: 'Platinum III' },
    game: 'League of Legends',
    platform: 'PC',
    activityType: 'Casual',
    teamSize: 'Any',
    description: 'Chill ARAM games, just want to have fun and make friends!',
    voiceRequired: false,
    playTime: 'Evening',
    lookingFor: ['Friendly', 'Casual Players'],
    timePosted: '12 min ago'
  },
  {
    id: 3,
    player: { name: 'StormBreaker', avatar: '⚡', level: 94, rank: 'Master' },
    game: 'Apex Legends',
    platform: 'PlayStation',
    activityType: 'Ranked',
    teamSize: '3v3',
    description: 'Need 2 for ranked grind. Pushing to Predator. Let\'s get it!',
    voiceRequired: true,
    playTime: 'Now',
    lookingFor: ['Experienced', 'Mic Required', 'Competitive'],
    timePosted: '20 min ago'
  },
  {
    id: 4,
    player: { name: 'LunarKnight', avatar: '🌙', level: 71, rank: 'Gold I' },
    game: 'Fortnite',
    platform: 'Xbox',
    activityType: 'Co-op',
    teamSize: 'Squad',
    description: 'Squad fill for some chill BR games. No toxicity please!',
    voiceRequired: false,
    playTime: 'Afternoon',
    lookingFor: ['Friendly', 'Team Player'],
    timePosted: '35 min ago'
  },
  {
    id: 5,
    player: { name: 'PhoenixRising', avatar: '🔥', level: 88, rank: 'Champion' },
    game: 'Rocket League',
    platform: 'PC',
    activityType: 'Tournament',
    teamSize: '3v3',
    description: 'Looking for tournament teammates. Need to be Grand Champ or higher.',
    voiceRequired: true,
    playTime: 'Weekend',
    lookingFor: ['High Skill', 'Tournament Experience', 'Dedicated'],
    timePosted: '1 hour ago'
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
              <Users className="w-4 h-4 mr-2" />
              {mockPosts.length}+ Players Online
            </Badge>
            <h1 className="text-6xl md:text-7xl font-black mb-4">
              Find Your <GlowText color="blue">Squad</GlowText>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Connect with gamers who match your playstyle and skill level
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input
                type="text"
                placeholder="Search by game, player, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 backdrop-blur-xl border-2 border-slate-700 rounded-2xl pl-16 pr-6 py-5 text-lg focus:outline-none focus:border-cyan-500 transition-all"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
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
              Select Game
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 hover:border-cyan-500 transition-all"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
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
                    <Users className="w-3 h-3 mr-1" />
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
                      Platform
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {platforms.map((platform, index) => (
                        <motion.button
                          key={platform.name}
                          initial={{ opacity: 0, x: -20 }}
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
                      Activity Type
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
                      Team Size
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
                      <span className="text-xl font-bold">Voice Chat Required</span>
                    </motion.button>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearFilters}
                      className="px-8 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl font-semibold transition-all"
                    >
                      Clear All Filters
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
            Available Players
          </h2>
          <Badge variant="success" className="text-lg px-6 py-2">
            <Zap className="w-5 h-5 mr-2" />
            {mockPosts.length} Active Posts
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
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl">
                        {post.player.avatar}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{post.player.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="info" className="text-xs">
                            Lvl {post.player.level}
                          </Badge>
                          <Badge variant="warning" className="text-xs">
                            <Trophy className="w-3 h-3 mr-1" />
                            {post.player.rank}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="success" className="mb-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.playTime}
                      </Badge>
                      <p className="text-xs text-slate-500">{post.timePosted}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="info">
                      <Gamepad2 className="w-3 h-3 mr-1" />
                      {post.game}
                    </Badge>
                    <Badge variant="info">
                      <Globe className="w-3 h-3 mr-1" />
                      {post.platform}
                    </Badge>
                    <Badge variant="warning">{post.activityType}</Badge>
                    <Badge variant="success">
                      <Users className="w-3 h-3 mr-1" />
                      {post.teamSize}
                    </Badge>
                    {post.voiceRequired ? (
                      <Badge variant="info">
                        <Mic className="w-3 h-3 mr-1" />
                        Voice
                      </Badge>
                    ) : (
                      <Badge>
                        <MicOff className="w-3 h-3 mr-1" />
                        Optional
                      </Badge>
                    )}
                  </div>

                  <p className="text-slate-300 mb-4 leading-relaxed">{post.description}</p>

                  <div className="mb-6">
                    <p className="text-sm text-slate-400 mb-2">Looking for:</p>
                    <div className="flex flex-wrap gap-2">
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <GamingButton variant="accent" className="w-full" glow>
                        <Users className="w-4 h-4 mr-2" />
                        Join Squad
                      </GamingButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <GamingButton variant="ghost">
                        <MessageCircle className="w-4 h-4" />
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
            Load More Players
          </GamingButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 z-50"
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
