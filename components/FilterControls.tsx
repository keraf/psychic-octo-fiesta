import React, { Dispatch, SetStateAction, useCallback } from 'react';

import type { Speciality, Location } from '../lib/prisma';

interface Props {
  specialities: Speciality[];
  locations: Location[];
  searchValue: string;
  specialityId: string;
  locationId: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSpecialityId: Dispatch<SetStateAction<string>>;
  setLocationId: Dispatch<SetStateAction<string>>;
}

const FilterControls: React.FC<Props> = ({
  specialities,
  locations,
  searchValue,
  specialityId,
  locationId,
  setSearchValue,
  setSpecialityId,
  setLocationId,
}) => {
  const onSearchInput = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  }, [setSearchValue]);

  const onSpecialityChange = useCallback((e: React.KeyboardEvent<HTMLSelectElement>) => {
    setSpecialityId(e.currentTarget.value);
  }, [setSpecialityId]);

  const onLocationChange = useCallback((e: React.KeyboardEvent<HTMLSelectElement>) => {
    setLocationId(e.currentTarget.value);
  }, [setLocationId]);
  
  return (
    <div className="columns">
      <div className="column">
        <div className="field">
          <label className="label">Search</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Company name"
              value={searchValue}
              onInput={onSearchInput}
            />
          </div>
        </div>
      </div>
      <div className="column">
        <div className="field">
          <label className="label">Speciality</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select value={specialityId} onChange={onSpecialityChange}>
                <option value="">All specialities</option>
                {specialities.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="field">
          <label className="label">Location</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select value={locationId} onChange={onLocationChange}>
                <option value="">All locations</option>
                {locations.map(s => (
                  <option key={s.id} value={s.id}>{s.city} ({s.country})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
