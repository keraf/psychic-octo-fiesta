/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { FullCompany } from '../lib/prisma';

interface Props {
  company: FullCompany;
  setSpecialityId: Dispatch<SetStateAction<string>>;
}

const noLogo = 'https://placekitten.com/700/450';

const CompanyCard: React.FC<Props> = ({
  company,
  setSpecialityId,
}) => {
  const onSpecialityClicked = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.getAttribute('data-id') ?? '';
    setSpecialityId(id);
  }, [setSpecialityId]);

  const specialities = useMemo(() => 
    company.specialities
      .map<React.ReactNode>(({ speciality }: any) => (
        <a key={speciality.id} data-id={speciality.id} onClick={onSpecialityClicked}>
          {speciality.name}
        </a>
      ))
      .reduce((prev, curr) => [prev, ', ', curr])
  , [company.specialities, onSpecialityClicked]);

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          {company.logo ? (
            <img
              src={`/company/${company.logo}`}
              alt={`Logo of ${company.name}`}
              width="700"
              height="450"
            />
          ) : (
            <img
              src={noLogo}
              alt="An adorable kitten"
              width="700"
              height="450"
            />
          )}
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{company.name}</p>
            <p className="subtitle is-6">{company.location.city} ({company.location.country})</p>
          </div>
        </div>
        <div className="content">
          Specialities: {specialities}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
