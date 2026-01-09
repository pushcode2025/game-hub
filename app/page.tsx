'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Trophy, Gamepad2, MessageSquare, Image, Star, TrendingUp, Zap, Globe } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GameCard } from '@/components/gaming/GameCard';
import { GamingButton } from '@/components/gaming/GamingButton';
import { GamingCard } from '@/components/gaming/GamingCard';
import { Badge } from '@/components/gaming/Badge';
import { GlowText } from '@/components/gaming/GlowText';
import { mockGames, getTrendingGames } from '@/lib/mockData';

export default function Home() {
  const trendingGames = getTrendingGames();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 py-20 px-6">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress')] opacity-10 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="info" glow className="mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Join 50M+ Gamers Worldwide
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Your Ultimate <GlowText color="blue">Gaming</GlowText> Hub
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Connect with players, join teams, share content, compete in tournaments, and build your gaming legacy.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/matchmaking/create">
                <GamingButton variant="accent" size="lg" glow>
                  <Users className="w-5 h-5 mr-2" />
                  Find Players
                </GamingButton>
              </Link>
              <Link href="/leaderboard">
                <GamingButton variant="ghost" size="lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  View Leaderboard
                </GamingButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/teams">
            <GamingCard hover glow className="p-6 text-center cursor-pointer">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Teams & Clans</h3>
              <p className="text-sm text-slate-400">Join or create competitive teams</p>
            </GamingCard>
          </Link>
          <Link href="/matchmaking/create">
            <GamingCard hover glow className="p-6 text-center cursor-pointer">
              <Gamepad2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Matchmaking</h3>
              <p className="text-sm text-slate-400">Find players for your next game</p>
            </GamingCard>
          </Link>
          <Link href="/forums">
            <GamingCard hover glow className="p-6 text-center cursor-pointer">
              <MessageSquare className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Forums</h3>
              <p className="text-sm text-slate-400">Discuss strategies and tips</p>
            </GamingCard>
          </Link>
          <Link href="/gallery">
            <GamingCard hover glow className="p-6 text-center cursor-pointer">
              <Image className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Media Gallery</h3>
              <p className="text-sm text-slate-400">Share your best moments</p>
            </GamingCard>
          </Link>
        </div>

        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold gradient-text">Trending Games</h2>
            <Link href="/games">
              <GamingButton variant="ghost">View All</GamingButton>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingGames.map((game) => (
              <GameCard key={game.id} title={game.title} coverImage={game.coverImage} rating={game.rating} playerCount={game.playerCount} trending={game.trending} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <GamingCard gradient className="p-8">
            <Zap className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Complete Daily Quests</h3>
            <p className="text-slate-300 mb-6">Earn XP and unlock exclusive rewards by completing daily and weekly challenges.</p>
            <Link href="/quests">
              <GamingButton variant="primary" glow>
                View Quests
              </GamingButton>
            </Link>
          </GamingCard>

          <GamingCard gradient className="p-8">
            <Trophy className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Climb the Leaderboard</h3>
            <p className="text-slate-300 mb-6">Compete with players worldwide and earn your place among the top gamers.</p>
            <Link href="/leaderboard">
              <GamingButton variant="primary" glow>
                View Rankings
              </GamingButton>
            </Link>
          </GamingCard>
        </div>

        <GamingCard className="p-8 text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/30">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Become a Creator</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Share your gaming content, build your audience, and earn recognition in the gaming community.</p>
          <Link href="/creators">
            <GamingButton variant="accent" size="lg" glow>
              Join Creator Program
            </GamingButton>
          </Link>
        </GamingCard>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">50M+</div>
            <div className="text-slate-400">Active Players</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
            <div className="text-slate-400">Teams & Clans</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">500K+</div>
            <div className="text-slate-400">Daily Matches</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-400 mb-2">1M+</div>
            <div className="text-slate-400">Media Uploads</div>
          </div>
        </div>
      </div>

      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/news" className="hover:text-white transition-colors">News</Link>
            <Link href="/reviews/create" className="hover:text-white transition-colors">Reviews</Link>
            <Link href="/translations" className="hover:text-white transition-colors">
              <Globe className="w-4 h-4 inline mr-1" />
              Translations
            </Link>
            <Link href="/creators" className="hover:text-white transition-colors">Creators</Link>
          </div>
          <p>2024 Gaming Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
