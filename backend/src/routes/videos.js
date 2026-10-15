import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  try {
    const videos = await prisma.video.findMany({
      where: {
        published: true,
        status: 'READY',
      },
      include: {
        creator: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json({
      videos,
      total: videos.length,
    })
  } catch (error) {
    next(error)
  }
})

export default router