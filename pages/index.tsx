import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';

import prisma from '../lib/prisma';
import type { Speciality, Location, FullCompany } from '../lib/prisma';
import { getCompanies, getCompanyCount } from '../lib/companies';

import CompanyCard from '../components/CompanyCard';
import FilterControls from '../components/FilterControls';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 3;

type CompanyData = {
  companies: FullCompany[];
  total: number;
}

interface Props {
  locations: Location[];
  specialities: Speciality[];
  initialData: CompanyData,
}

const Home: NextPage<Props> = ({
  locations,
  specialities,
  initialData,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [specialityId, setSpecialityId] = useState<string>('');
  const [locationId, setLocationId] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [data, setData] = useState<CompanyData>(initialData);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }

    const payload = {
      search: searchValue,
      speciality: specialityId,
      location: locationId,
      skip: PAGE_SIZE * (page - 1),
      take: PAGE_SIZE,
    };

    fetch('/api/companies', {
      body: JSON.stringify(payload),
      method: 'POST',
    })
      .then(resp => resp.json())
      .then(resp => {
        setData(resp);
      })
      .catch(err => console.log(err));
  }, [page, searchValue, specialityId, locationId]);

  // Reset page when search, speciality or location is changed
  useEffect(() => {
    setPage(1);
  }, [searchValue, specialityId, locationId]);

  const pages = useMemo(() => Math.ceil(data.total / PAGE_SIZE), [data.total]);

  return (
    <div className="container my-4">
      <FilterControls
        specialities={specialities}
        locations={locations}
        searchValue={searchValue}
        specialityId={specialityId}
        locationId={locationId}
        setSearchValue={setSearchValue}
        setSpecialityId={setSpecialityId}
        setLocationId={setLocationId}
      />
      {data.companies.length > 0 ? (
        <div className="columns is-multiline">
          {data.companies.map(company => (
            <div key={company.id} className="column is-one-third">
              <CompanyCard
                company={company}
                setSpecialityId={setSpecialityId}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No companies found...</p>
      )}
      <Pagination
        page={page}
        total={pages}
        setPage={setPage}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  // Get all categories that should be shown on the filters
  const specialities = await prisma.speciality.findMany({
    where: { filter: true },
  });

  // Get all locations
  const locations = await prisma.location.findMany();

  // Get initial companies and total count
  const companies = await getCompanies({
    take: PAGE_SIZE,
  });
  const total = await getCompanyCount({});

  return {
    props: {
      specialities,
      locations,
      initialData: {
        companies,
        total,
      },
    },
  };
};

export default Home;
