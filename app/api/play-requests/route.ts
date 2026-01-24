import { NextResponse } from 'next/server'
import {PlayRequestService  } from '@/lib/services/play-requests.service'

const service = new PlayRequestService()

export async function GET() {
  const requests = await service.listOpen()
  return NextResponse.json(requests)
}

export async function POST(req: Request) {
  const body = await req.json()

  const request = await service.create({
    title: body.title,
    description: body.description,
    playersNeeded: body.playersNeeded,
    gameId: body.gameId,
    userId: body.userId,
  })

  return NextResponse.json(request)
}
