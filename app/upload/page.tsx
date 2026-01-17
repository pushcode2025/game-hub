'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  Check,
  Image as ImageIcon,
  Video,
  ArrowLeft,
  Sparkles,
  Tag,
  Save,
  Zap,
  Plus,
} from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { GamingButton } from '@/components/gaming/GamingButton';
import { GamingCard } from '@/components/gaming/GamingCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
  uploaded: boolean;
}

const MOCK_GAMES = [
  'Call of Duty: Modern Warfare',
  'Fortnite',
  'League of Legends',
  'Valorant',
  'Apex Legends',
  'Overwatch 2',
  'Counter-Strike 2',
  'Dota 2',
  'Rocket League',
  'Minecraft',
];

const MOCK_TAGS = [
  'Epic Moment',
  'Victory',
  'Funny',
  'Tutorial',
  'Gameplay',
  'Montage',
  'Tips & Tricks',
  'Fail',
  'Clutch',
  'Teamwork',
];

export default function MediaUploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFile, setExpandedFile] = useState<string | null>(null);
  const [autoSaved, setAutoSaved] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((uploadedFile, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles((prev) =>
          prev.map((f) =>
            f.preview === uploadedFile.preview ? { ...f, progress } : f
          )
        );

        if (progress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.preview === uploadedFile.preview ? { ...f, uploaded: true } : f
            )
          );
          toast.success('File uploaded successfully!', {
            description: uploadedFile.file.name,
          });
        }
      }, 200);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      mediaType === 'image'
        ? { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] }
        : { 'video/*': ['.mp4', '.webm'] },
    maxSize: mediaType === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024,
  });

  const removeFile = (preview: string) => {
    setFiles((prev) => prev.filter((f) => f.preview !== preview));
    URL.revokeObjectURL(preview);
    toast.info('File removed');
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Media uploaded successfully!', {
        description: 'Your content is now live in the gallery',
      });
      router.push('/gallery');
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <AnimatedParticles />

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GamingButton
              onClick={() => router.back()}
              className="mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </GamingButton>

            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Upload Media
                </h1>
                <p className="text-slate-400 mt-1">
                  Share your epic gaming moments with the community
                </p>
              </div>
              {autoSaved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-auto flex items-center gap-2 text-green-400 text-sm"
                >
                  <Save className="w-4 h-4" />
                  Draft saved
                </motion.div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <GamingCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Label className="text-lg font-semibold text-white">
                    Media Type
                  </Label>
                  <div className="flex gap-2">
                    {(['image', 'video'] as const).map((type) => (
                      <motion.button
                        key={type}
                        onClick={() => setMediaType(type)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          mediaType === type
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {type === 'image' ? (
                          <ImageIcon className="w-4 h-4" />
                        ) : (
                          <Video className="w-4 h-4" />
                        )}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div
                  {...getRootProps()}
                  className={`relative border-2 border-dashed rounded-xl p-12 transition-all cursor-pointer ${
                    isDragActive
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                      : 'border-slate-700 hover:border-purple-400 bg-slate-800/50'
                  }`}
                  style={{
                    boxShadow: isDragActive
                      ? '0 0 30px rgba(6, 182, 212, 0.3)'
                      : '0 0 0px rgba(6, 182, 212, 0)',
                  }}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center text-center">
                    <motion.div
                      animate={{
                        y: isDragActive ? -10 : 0,
                        scale: isDragActive ? 1.2 : 1,
                      }}
                      className="mb-4"
                    >
                      <Upload
                        className={`w-16 h-16 ${
                          isDragActive ? 'text-cyan-400' : 'text-slate-500'
                        }`}
                      />
                    </motion.div>
                    <p className="text-xl font-semibold text-white mb-2">
                      {isDragActive
                        ? 'Drop files here!'
                        : 'Drag & drop files here'}
                    </p>
                    <p className="text-slate-400 mb-4">
                      or click to browse from your device
                    </p>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <span>
                        Max size:{' '}
                        {mediaType === 'image' ? '10MB' : '100MB'}
                      </span>
                      <span>•</span>
                      <span>
                        Formats:{' '}
                        {mediaType === 'image'
                          ? 'JPG, PNG, GIF'
                          : 'MP4, WebM'}
                      </span>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    <AnimatePresence>
                      {files.map((file) => (
                        <motion.div
                          key={file.preview}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative group rounded-lg overflow-hidden bg-slate-800 border border-slate-700"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div
                            className="relative aspect-video cursor-pointer"
                            onClick={() => setExpandedFile(file.preview)}
                          >
                            {mediaType === 'image' ? (
                              <img
                                src={file.preview}
                                alt={file.file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={file.preview}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>

                          <div className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {file.file.name}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {formatFileSize(file.file.size)}
                                </p>
                              </div>
                              <motion.button
                                onClick={() => removeFile(file.preview)}
                                className="ml-2 p-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="w-4 h-4" />
                              </motion.button>
                            </div>

                            <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${file.progress}%` }}
                                className={`h-full rounded-full ${
                                  file.uploaded
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                    : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                                }`}
                              />
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-slate-400">
                                {file.progress}%
                              </span>
                              {file.uploaded && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <Check className="w-4 h-4 text-green-400" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </GamingCard>

              <GamingCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Media Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-white mb-2 block">
                      Title <span className="text-red-400">*</span>
                    </Label>
                    <motion.div whileFocus={{ scale: 1.01 }}>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter an epic title..."
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all"
                        maxLength={100}
                        dir="auto"
                      />
                    </motion.div>
                    <p className="text-xs text-slate-400 mt-1 text-right">
                      {title.length}/100
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white mb-2 block">
                      Description
                    </Label>
                    <motion.div whileFocus={{ scale: 1.01 }}>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us about this moment..."
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20 transition-all min-h-[120px]"
                        maxLength={500}
                        dir="auto"
                      />
                    </motion.div>
                    <p className="text-xs text-slate-400 mt-1 text-right">
                      {description.length}/500
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="game" className="text-white mb-2 block">
                      Game
                    </Label>
                    <Select value={selectedGame} onValueChange={setSelectedGame}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white focus:border-pink-400 focus:ring-pink-400/20">
                        <SelectValue placeholder="Select a game" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {MOCK_GAMES.map((game) => (
                          <SelectItem
                            key={game}
                            value={game}
                            className="text-white hover:bg-slate-700"
                          >
                            {game}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </GamingCard>
            </div>

            <div className="space-y-6">
              <GamingCard className="p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-cyan-400" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {MOCK_TAGS.map((tag) => (
                    <motion.button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: selectedTags.includes(tag)
                          ? '0 0 20px rgba(6, 182, 212, 0.4)'
                          : '0 0 0px rgba(6, 182, 212, 0)',
                      }}
                    >
                      {selectedTags.includes(tag) && (
                        <Check className="w-3 h-3 inline mr-1" />
                      )}
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </GamingCard>

              <GamingCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured" className="text-white font-semibold">
                      Featured Content
                    </Label>
                    <p className="text-sm text-slate-400 mt-1">
                      Highlight this in the gallery
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      boxShadow: featured
                        ? '0 0 20px rgba(168, 85, 247, 0.6)'
                        : '0 0 0px rgba(168, 85, 247, 0)',
                    }}
                    className="rounded-full"
                  >
                    <Switch
                      id="featured"
                      checked={featured}
                      onCheckedChange={setFeatured}
                    />
                  </motion.div>
                </div>
              </GamingCard>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GamingButton
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                    animate={{
                      x: isSubmitting ? ['-100%', '100%'] : '0%',
                    }}
                    transition={{
                      duration: 1,
                      repeat: isSubmitting ? Infinity : 0,
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                        Publish Media
                      </>
                    )}
                  </span>
                </GamingButton>
              </motion.div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {expandedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedFile(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full"
              >
                <button
                  onClick={() => setExpandedFile(null)}
                  className="absolute -top-12 right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                {mediaType === 'image' ? (
                  <img
                    src={expandedFile}
                    alt="Preview"
                    className="w-full h-auto rounded-xl"
                  />
                ) : (
                  <video
                    src={expandedFile}
                    controls
                    className="w-full h-auto rounded-xl"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageContainer>
  );
}

function AnimatedParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${
              ['#06b6d4', '#a855f7', '#ec4899'][Math.floor(Math.random() * 3)]
            }, transparent)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
