import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import data from './data.json' assert { type: "json" };

for await (const { name, specialities, city, logo } of data) {
  const companyExists = (await prisma.company.count({ where: { name }})) > 0;
  if (companyExists) {
    continue;
  }

  await prisma.company.create({
    data: {
      name,
      logo,
      location: {
        connectOrCreate: {
          where: { city },
          create: {
            city,
            country: 'CH',
          },
        },
      },
      specialities: {
        create: specialities.map(speciality => (
          {
            speciality: {
              connectOrCreate: {
                where: { name: speciality },
                create: { name: speciality },
              },
            },
          }
        )),
      }
    },
  });
}
