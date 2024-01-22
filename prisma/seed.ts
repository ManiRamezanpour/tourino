import { PrismaClient, Stats } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.packages.createMany({
    data: [
      {
        name: 'golden',
        price: '10',
        expirationTime: '30Days',
      },
    ],
  });
  await prisma.clients.createMany({
    data: [
      {
        packagesId: 1,
        company_name: 'ALIBABA',
        province: 'Mazandran',
        city: 'Sari',
        cto_name: 'Ali',
        cto_nationCode: '2081356007',
        cto_phone: '402934023',
        email: 'manirmp@gmail.com',
        username: 'manirmp',
        password: '*******',
        groupCodes: '2312312',
        company_logo: '',
        Address: '',
        Phones: '',
        website: '',
        cto_birthday: '',
        cto_fatherName: '',
        groupName: '',
        description: '',
      },
      {
        packagesId: 1,
        company_name: 'Snap',
        province: 'tehran',
        city: 'andimeshk',
        cto_name: 'test',
        cto_nationCode: '84534',
        cto_phone: '84488324',
        email: 'testclient@gmail.com',
        username: 'testclient',
        password: '*******',
        groupCodes: '2312313',
        company_logo: '',
        Address: '',
        Phones: '',
        website: '',
        cto_birthday: '',
        cto_fatherName: '',
        groupName: '',
        description: '',
      },
    ],
  });
  await prisma.bonus.createMany({
    data: [
      {
        title: 'women days',
        persent: 10,
      },
      {
        title: 'new years',
        persent: 50,
      },
    ],
  });
  await prisma.news.createMany({
    data: [
      { title: 'تمام سفر های این هفته تعطیل است', description: 'test1' },
      { title: 'تمام سفر های این هفته تعطیل است', description: 'test2' },
      { title: 'تمام سفر های این هفته تعطیل است', description: 'test3' },
    ],
  });

  await prisma.program.createMany({
    data: [
      {
        name: 'جواهرده رامسر',
        groupsCode: '2312312',
        status: Stats.ACTIVE,
        time: '6 صبح',
        departure: 'میدان آزادی',
        price: '9500000',
        description:
          'این برنامه به صورت آفرود در جاده زیبای جواهرده رامسر به صورت فول برد برگزار می شود',
        type: 'آفرود',
        capacity: '30 نفر',
        access: 'اتوبوس توریستی و ماشین آفرود',
        cautions: [
          'بدون اطلاع لیدر از گروه جدا نشوید',
          'وظایف و مسئولیت های خود را حتما انجام دهید',
          'پول نقد کمتر همراه داشته باشید',
          'به حیوانات مطلقا نزدیک نشوید',
        ],
        maxBonuses: '10',
        stars: '1',
        date: '1402/04/01',
        images: [
          'https://images.kojaro.com/2021/5/aab47fd4-ff41-4064-a5fb-a6f6cb4eaba4-840x560.jpg',
          'https://images.kojaro.com/2021/5/66247575-d161-483d-b0a1-63ed173ad4c9-840x560.jpg',
        ],
        days: '2',
        leader: 'پیام محمدی',
        services: ['ترنسفر،بیمه،لیدر کارت دار حرفه ای،چای آتیشی'],
        options: ['وای فای رایگان'],
        gadgets: [
          'کوله پشتی',
          'کفش کوهنوری',
          'فلاسک',
          'کیسه خواب',
          'ظروف شخصی',
        ],
      },
      {
        name: 'چشمه بل',
        groupsCode: '2312313',
        status: Stats.ACTIVE,
        time: '10 صبح',
        departure: 'میدان آزادی',
        price: '2700000',
        description: 'این برنامه به صورت آفرود در چشمه زیبای بل برگزار می شود',
        type: 'آفرود',
        capacity: '30 نفر',
        access: 'اتوبوس توریستی و ماشین آفرود',
        cautions: [
          'بدون اطلاع لیدر از گروه جدا نشوید',
          'وظایف و مسئولیت های خود را حتما انجام دهید',
          'پول نقد کمتر همراه داشته باشید',
          'به حیوانات مطلقا نزدیک نشوید',
        ],
        maxBonuses: '20',
        stars: '1',
        date: '1402/11/30',
        images: [
          'https://images.kojaro.com/2018/5/97871f38-5f40-4289-93c9-defbe2aaba03-840x560.jpg',
          'https://images.kojaro.com/2018/5/4842aeb5-c1e4-4081-81c3-7e4c5156b4ae-840x560.jpg',
        ],
        days: '2',
        leader: 'پیام محمدی',
        services: ['ترنسفر،بیمه،لیدر کارت دار حرفه ای،چای آتیشی'],
        options: ['وای فای رایگان'],
        gadgets: [
          'کوله پشتی',
          'کفش کوهنوری',
          'فلاسک',
          'کیسه خواب',
          'ظروف شخصی',
        ],
      },
      {
        name: 'خالد نبی',
        groupsCode: '2312312',
        status: Stats.ACTIVE,
        time: '6 صبح',
        departure: 'میدان آزادی',
        price: '9500000',
        description:
          'این برنامه به صورت آفرود در محله زیبای خالد نبی برگزار می شود',
        type: 'آفرود',
        capacity: '45 نفر',
        access: 'اتوبوس توریستی و ماشین آفرود',
        cautions: [
          'بدون اطلاع لیدر از گروه جدا نشوید',
          'وظایف و مسئولیت های خود را حتما انجام دهید',
          'پول نقد کمتر همراه داشته باشید',
          'به حیوانات مطلقا نزدیک نشوید',
        ],
        maxBonuses: '30',
        stars: '3',
        date: '1402/11/20',
        images: [
          'https://images.kojaro.com/2021/4/93643a35-874b-408c-ae49-ea85bd5b421e.jpg',
          'https://images.kojaro.com/2021/4/7df2ec51-6bda-438d-8770-5affa55c4e7f.jpg',
        ],
        days: '5',
        leader: 'امیر محمدی',
        services: ['ترنسفر،بیمه،لیدر کارت دار حرفه ای،چای آتیشی'],
        options: ['وای فای رایگان'],
        gadgets: [
          'کوله پشتی',
          'کفش کوهنوری',
          'فلاسک',
          'کیسه خواب',
          'ظروف شخصی',
        ],
      },
      {
        name: 'جنگل فندقلو',
        groupsCode: '2312312',
        status: Stats.ACTIVE,
        time: '8 صبح',
        departure: 'میدان آزادی',
        price: '11000000',
        description: 'این برنامه به صورت آفرود در جنگل زیبای برگزار می شود',
        type: 'آفرود',
        capacity: '20 نفر',
        access: 'اتوبوس توریستی و ماشین آفرود',
        cautions: [
          'بدون اطلاع لیدر از گروه جدا نشوید',
          'وظایف و مسئولیت های خود را حتما انجام دهید',
          'پول نقد کمتر همراه داشته باشید',
          'به حیوانات مطلقا نزدیک نشوید',
        ],
        maxBonuses: '20',
        stars: '1',
        date: '1402/11/01',
        images: [
          'https://images.kojaro.com/2020/7/cb225144-ae8b-427d-aa21-03026cb4131a-840x560.jpg',
          'https://images.kojaro.com/2020/7/0a4a4c24-d614-4b5b-8017-27f81e76ad27-840x560.jpg',
        ],
        days: '7',
        leader: 'پیام امیری',
        services: ['ترنسفر،بیمه،لیدر کارت دار حرفه ای،چای آتیشی'],
        options: ['وای فای رایگان'],
        gadgets: [
          'کوله پشتی',
          'کفش کوهنوری',
          'فلاسک',
          'کیسه خواب',
          'ظروف شخصی',
        ],
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
