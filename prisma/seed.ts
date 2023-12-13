// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();
// generate code for group
function groupCodes(): string {
  const digits: string = '0123456789';
  let code: string = '';
  for (let i = 0; i < 5; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
}
async function main() {
  // create client Packages
  await prisma.packages.createMany({
    data: [
      {
        name: 'طلایی',
        price: '1000$',
        expirationTime: '1month',
      },
      {
        name: 'برنزی',
        price: '800$',
        expirationTime: '1month',
      },
      {
        name: 'نقره ایی',
        price: '500$',
        expirationTime: '1month',
      },
    ],
  });
  // create clients
  await prisma.clients.createMany({
    data: [
      {
        company_name: 'josh',
        company_logo: 'http://goole.com',
        province: 'tehran',
        city: 'karaj',
        Address: '',
        Phones: '093315432',
        Socials: ['www.google.com', 'www.gmail.com', 'www.instgram.com'],
        website: 'www.google.com',
        cto_name: 'ali',
        cto_nationCode: '20923123',
        cto_birthday: '12/12/1400',
        cto_fatherName: 'reza',
        cto_phone: '09331231243',
        email: 'alirmprewe@gmail.com',
        username: 'alireza',
        password: 'manirmp1386',
        packagesId: 2,
      },
      {
        company_name: 'candara',
        company_logo: 'http://goole.com',
        province: 'usa',
        city: 'montreal',
        Address: '',
        Phones: '32132',
        Socials: ['www.google.com', 'www.gmail.com', 'www.instgram.com'],
        website: 'www.google.com',
        cto_name: 'seyed',
        cto_nationCode: '209231233',
        cto_birthday: '5/2/1343',
        cto_fatherName: 'mmd',
        cto_phone: '09331231243',
        email: 'al342ei@gmail.com',
        username: 'alireza',
        password: 'manirmp13 ی86',
        packagesId: 1,
      },
    ],
  });
  await prisma.groups.createMany({
    data: [
      {
        name: 'ALIBABA',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
        status: 'ACTIVE',
        clientId: 12,
        image: '',
        groupCodes: groupCodes(),
      },
      {
        name: 'ALIBABA',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
        status: 'ACTIVE',
        clientId: 11,
        image: '',
        groupCodes: groupCodes(),
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
