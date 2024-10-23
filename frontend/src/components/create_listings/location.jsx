import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { Country } from "country-state-city";
import FooterHosting from "./footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleListingLocation } from "@/features/room/roomSlice";
export default function Location() {
  const dispatch = useDispatch();
  const countryList = Country.getAllCountries();
  // state country and city input
  const [countryinput, setCountryInput] = useState("");
  const [country, setCountry] = useState(null);
  const [newcountrylist, setNewCountryList] = useState([...countryList]);
  const [countrymodal, setCountryModal] = useState(false);
  const { currentUser } = useSelector((store) => store.auth);
  const { listing } = useSelector((store) => store.room);
  const active = false;
  // console.log(active)

  const handleCountryFiltering = useCallback(() => {
    const filteredCountriedList = newcountrylist?.filter((countries) =>
      countries?.name?.toLowerCase()?.includes(countryinput?.toLowerCase())
    );
    setNewCountryList(filteredCountriedList);
  }, [countryinput, country]);

  useEffect(() => {
    // Remove unnecessary dependency variables that cause infinite loops
    if (countryinput || country) {
      handleCountryFiltering();
    }
    if (countryinput === "") {
      setNewCountryList([...countryList]);
    }
  }, [countryinput, country, handleCountryFiltering]);
  // console.log(country);
  useEffect(()=> {
    if(country) {
      dispatch(
        handleListingLocation({
          longitude: country?.longitude,
          latitude: country?.latitude,
          country: country?.name,
        })
      );
    }
  },[country])

  return (
    <>
      <LocationofPlaceContainer>
        <div className="aboutCenter flex flex-col gap-2 justify-center items-start w-[90%] md:w-[780px] max-w-custom mx-auto">
          <h2 className="family2 w-full text-start text-dark">
            Where's your Listing located?
            <span className="text-sm md:text-lg block py-1 regular text-grey">
              Your address is only shared with guests after they’ve made a
              reservation.
            </span>
          </h2>
          <form
            action=""
            className="bg-white hover:shadows relative cursor-pointer h-[70px] w-[90%] rounded-full border text-dark flex items-center gap-2"
          >
            <div
              onClick={() => setCountryModal(!countrymodal)}
              className="h-full w-full flex items-center px-6 gap-4"
            >
              {countryinput ? (
                country?.name
              ) : (
                <span className="flex items-center gap-2">
                  <MdLocationOn fontSize={"24px"} /> Select Listing Location
                </span>
              )}
            </div>
            {countrymodal && (
              <div className="absolute py-4 gap-4 top-[100%] z-[50000000] w-full overflow-hidden border flex flex-col bg-[var(--light-grey)]">
                <input
                  value={countryinput}
                  name="countryinput"
                  onChange={(e) => {
                    // handleCountryData(e);
                    setCountryInput(e.target.value);
                  }}
                  placeholder="Search for your country"
                  className="h-[45px] bg-[#fff] w-[90%] mx-auto text-base"
                />
                <div className="flex max-h-[150px] bg-[var(--light-grey)] overflow-auto w-full  flex-col ">
                  {newcountrylist?.map((data, index) => {
                    return (
                      <span
                        onClick={() => {
                          setCountry(data);
                          setCountryInput(data?.name);
                          setCountryModal(false);
                        }}
                        key={index}
                        className="text-base cursor-pointer font-normal py-3 hover:text-white px-4 hover:bg-[#0073aa]"
                      >
                        {data?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </form>
        </div>
      </LocationofPlaceContainer>
      <FooterHosting
        active={country?.name}
        next={`${currentUser?.id}/floor-plan`}
        prev={`${currentUser?.id}/structure`}
      />
    </>
  );
}

const LocationofPlaceContainer = styled.div`
  width: 100%;
  h2 {
    font-size: 35px;
    line-height: 1.2;
    width: 60%;

    @media (max-width: 780px) {
      font-size: 30px;
    }
    @media (max-width: 780px) {
      width: 90%;
    }
  }
  .locationsearch {
    width: 100%;
    position: relative;

    .searchwrapper {
      width: 60%;
      position: relative;
      height: 60vh;
      @media (max-width: 780px) {
        width: 90%;
      }
      .icon {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .map {
      /* position: absolute;
      width: 100%;
      height: 100%;
      top: 0; */
      /* z-index: 30000; */
      height: 60vh;
    }
    select {
      width: 100%;
      border: none;
      outline: none;
      padding: 1.5rem 6rem;
      margin: 0 auto;
      border-radius: 40px;
      border: 2px solid rgba(0, 0, 0, 0.06);

      box-shadow: 0 7px 20px rgba(0, 0, 0, 0.1);
      &:hover {
        border: 2px solid rgba(0, 0, 0, 1);
      }
      @media (max-width: 780px) {
        /* width: 90%; */
        padding: 1rem 4rem;
      }
    }
  }
`;
