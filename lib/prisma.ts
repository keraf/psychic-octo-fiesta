import { PrismaClient } from '@prisma/client';
import type {
  Company,
  Location,
  Speciality,
} from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

// Types
type FullCompany = 
  Company & 
  { location: Location } & 
  { specialities: Speciality[] };

export type {
  FullCompany,
  Company,
  Location,
  Speciality,
};
