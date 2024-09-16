import React, { useState } from 'react'
import { motion } from 'framer-motion'
import UserListSelection from './UserListSelection';
import { DashboardGuestsInputData } from '@/constants/data/formdata';
import { BiChevronDown } from 'react-icons/bi';
const heightVariants = {
  open: {
    height: "auto",
    paddingTop: "30px",
    // transition: { duration: 0.4 },
  },
  closed: {
    height: "0",
    paddingTop: "0px",
    transition: { duration: 0.3 },
  }
}
export default function CreateGuestTab({
  handleUserSelection,
  newguest,
  setNewGuests,
  reservation,
  user
}) {
  // reservation
  // console.log(user)
  const [open, setOpen] = useState(false)
  const handleFormChange = (e) => {
    setNewGuests({
      ...newguest,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(newguest)
  return (
    <div className="p-4 h-[270px] md:h-[350px] overflow-auto  px-4 md:px-8 grid w-full gap-8 lg:grid-cols-custom_5">
      <div className="w-full flex flex-col gap-6 pt-3">
        <h3 className="text-base font-semibold w-full pb-4 border-b family1">
          Client profile
        </h3>
        {reservation ? (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full pt-2 flex flex-col gap-3">
              <div className="w-full flex items-center gap-4">
                <span className="text-base  font-normal">Name:</span>
                <span className="text-base  font-semibold">
                  {newguest?.newguestname
                    ? newguest?.newguestname
                    : reservation?.patchguests?.name}
                </span>
              </div>
              <div className="w-full flex items-center gap-4">
                <span className="text-base  font-normal">Email:</span>
                <span className="text-base  font-semibold">
                  {newguest?.newguestemail
                    ? newguest?.newguestemail
                    : reservation?.patchguests?.email}
                </span>
              </div>
              <div className="w-full flex items-center gap-4">
                <span className="text-base  font-normal">Username:</span>
                <span className="text-base  font-semibold">
                  {newguest?.newguestusername
                    ? newguest?.newguestusername
                    : reservation?.patchguests?.username}
                </span>
              </div>
              <div className="w-full flex items-center gap-4">
                <span className="text-base  font-normal">User Id:</span>
                <span className="text-base  font-semibold">
                  {reservation?.roomid}
                </span>
              </div>

              <div className="w-full flex items-center gap-4">
                <span className="text-base  font-normal">Reservation Id:</span>
                <span className="text-base  font-semibold">
                  {reservation?.id}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-2 w-full">
              <span className="font-semibold text-sm"> Guest:</span>
              <UserListSelection handleUserSelection={handleUserSelection} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="font-semibold text-sm">Register New Guest</span>
              <span className="block text-xs text-gray">
                {" "}
                To confirm registration of your new guest, please ensure that
                Guest is deselected or set to Null Guest.
              </span>

              <div className="flex bg-[#fffff] rounded-sm flex-col p-[10px] border w-full">
                <span
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer
           font-normal text-[#333] text-sm flex items-center justify-between"
                >
                  <span>New Guest Details</span>
                  <span>
                    <BiChevronDown fontSize={"17px"} />
                  </span>
                </span>

                <motion.div
                  variants={heightVariants}
                  initial="initial"
                  animate={open ? "open" : "closed"}
                  className="w-full overflow-hidden flex flex-col gap-3"
                >
                  <form
                    // onSubmit={handleFormSubmision}
                    className="flex flex-col gap-4"
                  >
                    <div className="w-full">
                      <label
                        // key={index}
                        htmlFor={DashboardGuestsInputData[0].label}
                        className="text-xs font-booking_font rounded-[10px] flex flex-col gap-2 text-dark"
                      >
                        <span className="text-dark ">
                          {DashboardGuestsInputData[0].text}
                        </span>
                        <input
                          className="w-full inputs rounded-2xl text-dark
                           font-normal text-sm"
                          required={true}
                          name={DashboardGuestsInputData[0]?.name}
                          id={DashboardGuestsInputData[0].label}
                          value={newguest[DashboardGuestsInputData[0].name]}
                          type={DashboardGuestsInputData[0].type}
                          placeholder={DashboardGuestsInputData[0].label}
                          onChange={handleFormChange}
                        ></input>
                      </label>
                    </div>
                    <div className="w-full">
                      <label
                        // key={index}
                        htmlFor={DashboardGuestsInputData[1].label}
                        className="text-xs font-booking_font rounded-[10px] flex flex-col gap-2 text-dark"
                      >
                        <span className="text-dark ">
                          {DashboardGuestsInputData[1].text}
                        </span>
                        <input
                          className="w-full inputs rounded-2xl text-dark
                           font-normal text-sm"
                          required={true}
                          name={DashboardGuestsInputData[1]?.name}
                          id={DashboardGuestsInputData[1].label}
                          value={newguest[DashboardGuestsInputData[1].name]}
                          type={DashboardGuestsInputData[1].type}
                          placeholder={DashboardGuestsInputData[1].label}
                          onChange={handleFormChange}
                        ></input>
                      </label>
                    </div>
                    <div className="w-full grid md:grid-cols-2 gap-8">
                      {DashboardGuestsInputData?.slice(2, 10)?.map(
                        (input, index) => {
                          return (
                            <label
                              key={index}
                              htmlFor={input.label}
                              className="text-xs font-booking_font rounded-[10px] flex flex-col gap-2 text-dark"
                            >
                              <span className="text-dark ">{input.text}</span>
                              <input
                                className="w-full inputs rounded-2xl text-dark
                           font-normal text-sm"
                                required={true}
                                name={input?.name}
                                id={input.label}
                                value={newguest[input.name]}
                                type={input.type}
                                placeholder={input.label}
                                onChange={handleFormChange}
                              ></input>
                            </label>
                          );
                        }
                      )}
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-[250px]"></div>
    </div>
  );
}
