export interface PlayRequestDTO {
  id: string
  title: string
  description: string | null
  playersNeeded: number
  isOpen: boolean
  gameId: string
  userId: string
}