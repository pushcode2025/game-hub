import { PrismaClient } from './generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  connectionLimit: 5,
  database:"gaming_hub",
  user:"root",
  password:""

  
})
const prisma = new PrismaClient({ adapter })

async function main() {
  /* ================= USERS ================= */
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@gaming.hub',
      password: 'hashed_password_here',
      name: 'Admin User',
      avatar: null,
    },
  })

  /* ================= GAMES ================= */
  const game = await prisma.game.create({
    data: {
      name: 'Cyber Arena',
      slug: 'cyber-arena',
      description: 'Sci-fi competitive shooter',
      developer: 'Nova Studio',
      publisher: 'Nova',
    },
  })

  /* ================= PLATFORMS ================= */
  const pc = await prisma.platform.create({
    data: { name: 'PC', slug: 'pc' },
  })

  await prisma.gamePlatform.create({
    data: {
      gameId: game.id,
      platformId: pc.id,
    },
  })

  /* ================= TAGS ================= */
  const tagBreaking = await prisma.tag.create({
    data: { name: 'Breaking', slug: 'breaking' },
  })

  const tagUpdate = await prisma.tag.create({
    data: { name: 'Update', slug: 'update' },
  })

  /* ================= NEWS ================= */
  const news = await prisma.news.create({
    data: {
      title: 'إطلاق Cyber Arena رسميًا',
      slug: 'cyber-arena-launch',
      excerpt: 'تم إطلاق لعبة Cyber Arena رسميًا على منصة PC.',
      contentPath: '/content/news/cyber-arena.md',
      contentType: 'markdown',
      category: 'أخبار',
      isFeatured: true,
      published: true,
      authorId: admin.id,
      gameId: game.id,
    },
  })

  await prisma.newsTag.createMany({
    data: [
      { newsId: news.id, tagId: tagBreaking.id },
      { newsId: news.id, tagId: tagUpdate.id },
    ],
  })

  /* ================= GENRES ================= */
  const genreAction = await prisma.genre.create({
    data: { name: 'Action', slug: 'action' },
  })

  /* ================= REVIEW ================= */
  const review = await prisma.review.create({
    data: {
      title: 'Cyber Arena Review',
      slug: 'cyber-arena-review',
      excerpt: 'تجربة لعب سريعة ومنافسة.',
      contentPath: '/content/reviews/cyber-arena.md',
      contentType: 'markdown',
      rating: 8.7,
      authorId: admin.id,
      gameId: game.id,
    },
  })

  await prisma.reviewGenre.create({
    data: {
      reviewId: review.id,
      genreId: genreAction.id,
    },
  })

  await prisma.reviewPlatform.create({
    data: {
      reviewId: review.id,
      platformId: pc.id,
    },
  })

  console.log('✅ Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
