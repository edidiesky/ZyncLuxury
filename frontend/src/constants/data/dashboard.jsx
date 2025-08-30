import { AiFillHome } from "react-icons/ai";
import { FaHotel, FaMoneyBill, FaRegUser } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
export const AdminSidebarData = [
  {
    id: 1,
    tab: {
      label: "Dashboard",
      subLabel: "keep Track of your properties regarding Rentals management",
      title: "Dashboard",
      path: "/dashboard",
      icon: <AiFillHome width={"18px"} />,
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <LuBedDouble fontSize={"18px"} />,
      label: "Bookings",
      subLabel: "Overview of your bookings created by your clients",
      title: "Reservations",
      path: "/dashboard/reservation",
    },
    list: [],
  },

  {
    id: 61,
    tab: {
      icon: <FaHotel fontSize={"17px"} />,
      label: "Listings Created",
      subLabel: "Overview of your properties regarding your Listings created",
      title: "Rooms",
      path: "/dashboard/rooms",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <FaMoneyBill fontSize={"17px"} />,
      label: "Transactions List",
      subLabel: "Overview of your payments regarding your Listings created",
      title: "Transactions",
      path: "/dashboard/orders",
    },
    list: [],
  },

  {
    id: 4,
    tab: {
      icon: <FaRegUser fontSize={"17px"} />,
      label: "Customers List",
      subLabel: "Overview of your properties regarding your Listings created",
      title: "Clients",
      path: "/dashboard/customers",
    },
    list: [],
  },
];
