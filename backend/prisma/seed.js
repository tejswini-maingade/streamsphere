import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

try {
  const creator = await prisma.user.upsert({
    where: { email: 'creator@streamsphere.local' },
    update: {},
    create: {
      email: 'creator@streamsphere.local',
      passwordHash: 'DEMO_ONLY_NO_LOGIN',
      displayName: 'StreamSphere Studio',
      role: 'CREATOR',
    },
  })

  const existingVideo = await prisma.video.findFirst({
    where: { title: 'Building Your First DevOps Lab', creatorId: creator.id },
  })

  if (!existingVideo) {
    await prisma.video.create({
      data: {
        title: 'Building Your First DevOps Lab',
        description: 'An original sample video about learning Linux, Docker, and cloud fundamentals.',
        category: 'Technology',
        creatorId: creator.id,
        durationSeconds: 420,
        status: 'READY',
        published: true,
      },
    })
  }

  console.log('Sample creator and video are ready.')
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}