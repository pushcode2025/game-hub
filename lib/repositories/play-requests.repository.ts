// repositories/play-requests.repository.ts
import { prisma } from '../prisma/prisma'

export class PlayRequestRepository {
  async getAllOpen() {
    return prisma.playRequest.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        playersNeeded: true,
        isOpen: true,
        gameId: true,
        userId: true,
      },
    })
  }

  async create(data: {
    title: string
    description?: string
    playersNeeded: number
    gameId: string
    userId: string
  }) {
    return prisma.playRequest.create({
      data,
      select: { id: true },
    })
  }

  async findById(id: string) {
    return prisma.playRequest.findUnique({
      where: { id },
      select: { id: true, playersNeeded: true, isOpen: true },
    })
  }
}
