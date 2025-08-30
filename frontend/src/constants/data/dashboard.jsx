import { AiFillHome } from "react-icons/ai";
import { FaHotel, FaMoneyBill, FaRegUser } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
export const AdminSidebarData = [
  {
    id: 1,
    tab: {
      title: "Dashboard",
      path: "",
      icon: <AiFillHome width={"18px"} />,
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <LuBedDouble fontSize={"18px"} />,
      title: "Reservations",
      path: "/reservation",
    },
    list: [],
  },

  {
    id: 61,
    tab: {
      icon: <FaHotel fontSize={"17px"} />,
      title: "Rooms",
      path: "/rooms",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <FaMoneyBill fontSize={"17px"} />,
      title: "Transactions",
      path: "/orders",
    },
    list: [],
  },

  {
    id: 4,
    tab: {
      icon: <FaRegUser fontSize={"17px"} />,
      title: "Clients",
      path: "/customers",
    },
    list: [],
  },
];
