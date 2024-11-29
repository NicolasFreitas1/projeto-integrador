import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function clearDatabase() {
  await prisma.user.deleteMany()
}

async function createAdminUser() {
  await prisma.user.create({
    data: {
      name: 'admin',
      login: 'admin',
      password: await hash('12345', 8),
      isAdmin: true,
    },
  })
}

async function main() {
  await clearDatabase()
  await createAdminUser()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
