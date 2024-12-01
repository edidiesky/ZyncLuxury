import React from 'react';

const FilterInputs = ({ filters, handlefilterChange }) => {
  return (
    <div className="w-full relative flex flex-col gap-6 lg:gap-8">
      <div className="w-full relative flex md:flex-row flex-col items-center justify-between gap-6 lg:gap-8">
        <input
          type="text"
          value={filters.title}
          name="title"
          onChange={handlefilterChange}
          placeholder="Search for the title of the Listing"
          className="w-full md:w-[400px] rounded-md inputs text-dark font-normal text-base"
        />
        <div className="flex-1 relative flex items-center gap-6 lg:gap-8"></div>
      </div>
    </div>
  );
};



export default FilterInputs;