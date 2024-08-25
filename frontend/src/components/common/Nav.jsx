import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Nav = ({path, title}) => {
    return (
      <span className="flex text-sm font-normal items-center gap-2 text-[#777]">
        <NavLink to={'/'} className={"font-semibold"}>
          <FaHome/>
        </NavLink>{" "}
        /{" "}
        <NavLink end to={path} className={"font-semibold"}>
          {title}
        </NavLink>
      </span>
    );
}


export default Nav;