import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.program.createMany({
    data: [
      {
        name: 'تست',
        groupsCode: '2312312',
        status: 'ACTIVE',
        time: '2day',
        departure: 'test',
        destination: 'Test',
        price: 'test',
      },
      {
        name: '2تست',
        groupsCode: '2312312',
        status: 'ACTIVE',
        time: '190day',
        departure: 'test',
        destination: 'Test',
        price: 'test',
      },
    ],
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
