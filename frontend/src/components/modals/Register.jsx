import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import {
  onLoginModal,
  offRegisterModal,
} from "../../features/modals/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../home/loader";
import { RegisterFormInputData } from "@/constants/data/formdata";
import { RegisterUser } from "@/features/auth/authReducer";

const ModalVariants = {
  initial: {
    opacity: 0,
    y: "100vh",
  },
  enter: {
    opacity: 1,
    y: "0",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 1,
    y: "100vh",

    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};
const RegisterModal = () => {
  const dispatch = useDispatch();
  const handleClearAlert = () => {
    dispatch(offRegisterModal());
  };

  const { registerisSuccess, registerisLoading } = useSelector(
    (store) => store.auth
  );
  const { registermodal } = useSelector((store) => store.modal);
  const [formvalue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    role: "SELLER",
  });
  const noEntry =
    formvalue.email === "" ||
    formvalue.password === "" ||
    formvalue.name === "";
  const handleFormChange = (e) => {
    setFormValue({
      ...formvalue,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoginModal = () => {
    dispatch(offRegisterModal());
    dispatch(onLoginModal());
  };

  const handleFormSubmision = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formvalue));
  };

  useEffect(() => {
    if (registerisSuccess) {
      dispatch(offRegisterModal());
      dispatch(onLoginModal());
    }
  }, [registerisSuccess]);
  return (
    <RegisterModalStyles
      className="w-full h-screen"
      as={motion.div}
      initial={{ opacity: 0 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 1.7,
        },
      }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        variants={ModalVariants}
        initial="initial"
        animate={registermodal ? "enter" : "exit"}
        exit="exit"
        className="guestModalCard p-4 justify-center items-center"
      >
        <div className="w-full sticky top-0 left-0 p-2 md:pt-8 px-4 md:px-8 flex  items-center justify-between">
          <h3 className="text-3xl font-semibold family2">
            ZyncLuxury
            <span className="block text-sm lg:text-base font-normal max-w-[250px] pt-1 regular">
              Register to your account and check out your bookings
            </span>
          </h3>
          <div className="cross" onClick={handleClearAlert}>
            <RxCross2 />
          </div>
        </div>
        <div className="w-full pb-4 flex">
          <form
            onSubmit={handleFormSubmision}
            className="w-[90%] mx-auto md:max-h-[480px] md:overflow-auto md:px-4 pb-4 grid md:grid-cols-1 gap-8"
          >
            <div className="w-full grid sm:grid-cols-1 gap-4">
              {RegisterFormInputData?.map((input, index) => {
                return (
                  <label
                    key={index}
                    htmlFor={input.label}
                    className="text-sm font-booking_font flex flex-col gap-2 text-dark"
                  >
                    <span className="text-dark">{input.label}</span>
                    <input
                      className="w-full rounded-md text-dark
                           font-normal text-sm"
                      required={true}
                      name={input?.name}
                      id={input.label}
                      value={formvalue[input.name]}
                      type={input.type}
                      placeholder={input.label}
                      onChange={handleFormChange}
                    ></input>
                  </label>
                );
              })}
            </div>
            <div className="w-full mt-6 flex items-center justify-center flex-col gap-3">
              <button
                data-test="registermodal_button"
                type="submit"
                disabled={registerisLoading || noEntry}
                className="p-4 px-8 hover:opacity-[.5] text-[#fff] flex items-center justify-center w-full cursor-pointer 
                   bg-[#000] rounded-[40px] regular"
              >
                {registerisLoading ? (
                  <div className="w-full flex justify-center items-center gap-4">
                    <Loader type="dots" /> Registration in progress
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
              <div className="w-full flex items-center justify-start gap-2">
                <span className="text-sm font-normal text-dark">
                  Already a Member?{" "}
                  <span
                    onClick={handleLoginModal}
                    style={{ textDecoration: "underline" }}
                    className="family2 font-booking_font_bold cursor-pointer"
                    //  to={"#"}
                  >
                    Sign In
                  </span>
                </span>
              </div>
            </div>
            {/* <div className="option text-dark">or</div>
              <div
                // onClick={() => signIn("google")}
                className="p-4 px-8 items-center flex justify-center gap-4 w-full cursor-pointer btn text-[#fff] rounded-[40px] font-booking_font_bold family2 border border-[rgba(0,0,0,.9)]"
              >
                <FcGoogle fontSize={"24px"} />
                <AnimateText children={"Continue with Google"} />
              </div> */}
            {/* <div className="p-4 px-8 items-center flex justify-center gap-4 w-full cursor-pointer btn text-[#000] rounded-[10px] font-booking_font family2 border border-[rgba(0,0,0,.9)]">
                <FaGithub fontSize={"28px"} />
                Continue with Github
              </div>{" "} */}
          </form>
        </div>
      </motion.div>
    </RegisterModalStyles>
  );
};
const RegisterModalStyles = styled(motion.div)`
  /* width: 100vw;
  height: 100vh; */
  position: fixed;
  left: 0;
  display: flex;
  z-index: 4900;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  .option {
    width: 100%;
    position: relative;
    text-align: center;
    padding: 0 1.4rem;
    font-size: 15px;
    &::after {
      width: 45%;
      height: 0.2px;
      content: "";
      background-color: rgba(0, 0, 0, 0.1);
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      width: 45%;
      height: 0.4px;
      content: "";
      background-color: rgba(0, 0, 0, 0.1);
      right: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .guestModalCard {
    max-width: 500px;
    min-width: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    height: 620px;
    gap: 2rem;
    border-radius: 20px;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 780px) {
      max-width: 100%;
      min-width: 100%;
      height: 100vh;
      border-radius: 0px;
    }
    .cross {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #d9d8d8;
      }
      svg {
        font-size: 20px;
      }
    }
    .deleteCardBottom {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 2rem;
      gap: 1rem;
      button {
        padding: 1.2rem 2rem;
        border: none;
        font-size: 1.3rem;
        font-weight: 400;
        background: var(--grey-2);
        color: #fff;
        outline: none;
        border-radius: 40px;
        cursor: pointer;
        text-transform: none;
        &:hover {
          background: var(--grey-1);
          color: var(--text-color);
        }
        &.deleteBtn {
          background: var(--blue-1);
          &:hover {
            opacity: 0.8;
            color: #fff;
          }
        }
      }
    }
  }
`;

export default RegisterModal;
