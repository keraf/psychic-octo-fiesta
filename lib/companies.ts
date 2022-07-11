import prisma from './prisma';

interface GetCompanies {
  take: number;
  skip: number;
  search: string;
  speciality: string;
  location: string;
}

export const getCompanies = async ({
  take = 9,
  skip = 0,
  search = '',
  speciality = '',
  location = '',
}: Partial<GetCompanies>) => {
  return await prisma.company.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      location: true,
      specialities: {
        include: {
          speciality: true,
        },
      },
    },
    skip,
    take,
    where: {
      name: {
        contains: search,
      },
      specialities: speciality !== '' ? {
        some: {
          specialityId: {
            equals: speciality,
          }
        },
      } : undefined,
      locationId: location !== '' ? {
        equals: location,
      } : undefined,
    },
  });
};

interface GetCompanyCount {
  search: string;
  speciality: string;
  location: string;
}

export const getCompanyCount = async ({
  search = '',
  speciality = '',
  location = '',
}: Partial<GetCompanyCount>) => {
  return await prisma.company.count({
    where: {
      name: {
        contains: search,
      },
      specialities: speciality !== '' ? {
        some: {
          specialityId: {
            equals: speciality,
          }
        },
      } : undefined,
      locationId: location !== '' ? {
        equals: location,
      } : undefined,
    }
  });
};
