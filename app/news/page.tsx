'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, MessageSquare } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GamingCard } from '@/components/gaming/GamingCard';
import { Badge } from '@/components/gaming/Badge';

const mockNews = [
  { id: '1', title: 'New Season Launch: Battle Royale Returns', game: 'Apex Legends', image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=800', excerpt: 'Season 20 brings massive map changes, new legend, and exciting weapon additions to the battlefield.', category: 'Update', time: '2 hours ago', comments: 45, trending: true },
  { id: '2', title: 'Championship Finals This Weekend', game: 'Valorant', image: 'https://images.pexels.com/photos/7915286/pexels-photo-7915286.jpeg?auto=compress&w=800', excerpt: 'The top 8 teams compete for the championship title and $1 million prize pool.', category: 'Esports', time: '5 hours ago', comments: 89, trending: true },
  { id: '3', title: 'Patch Notes: Balance Changes', game: 'League of Legends', image: 'https://images.pexels.com/photos/7048041/pexels-photo-7048041.jpeg?auto=compress&w=800', excerpt: 'Major balance updates to champions and items ahead of the competitive season.', category: 'Patch', time: '1 day ago', comments: 156, trending: false },
  { id: '4', title: 'DLC Expansion Announced', game: 'Elden Ring', image: 'https://images.pexels.com/photos/9072319/pexels-photo-9072319.jpeg?auto=compress&w=800', excerpt: 'Shadow of the Erdtree expansion brings new areas, bosses, and storylines.', category: 'Announcement', time: '2 days ago', comments: 234, trending: false },
];

export default function NewsPage() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Gaming News</h1>
        <p className="text-xl text-slate-400">Stay updated with the latest gaming news and updates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {mockNews.slice(0, 2).map((news) => (
          <GamingCard key={news.id} hover glow>
            <div className="relative h-64 overflow-hidden">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
              {news.trending && (
                <div className="absolute top-4 left-4">
                  <Badge variant="danger" size="sm">
                    <TrendingUp className="w-3 h-3 mr-1 inline" />
                    Trending
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="info" size="sm" className="mb-2">{news.category}</Badge>
                <h2 className="text-2xl font-bold text-white mb-2">{news.title}</h2>
                <p className="text-slate-300 text-sm mb-3">{news.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {news.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {news.comments}
                  </span>
                  <Badge size="sm">{news.game}</Badge>
                </div>
              </div>
            </div>
          </GamingCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockNews.slice(2).map((news) => (
          <GamingCard key={news.id} hover>
            <div className="p-6">
              <div className="flex gap-4">
                <img src={news.image} alt={news.title} className="w-32 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="info" size="sm">{news.category}</Badge>
                    {news.trending && <Badge variant="danger" size="sm">Trending</Badge>}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{news.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{news.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {news.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {news.comments}
                    </span>
                    <Badge size="sm">{news.game}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </GamingCard>
        ))}
      </div>
    </PageContainer>
  );
}
