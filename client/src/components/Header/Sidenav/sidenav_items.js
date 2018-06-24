import React from "react";
import { Link } from "react-router-dom";
//import FontAwesome from "react-fontawesome";
const SidenavItems = () => {
  const items = [
    {
      type: "navItem",
      icon: "home",
      text: "Home",
      link: "/",
      restricted: false
    },
    {
      type: "navItem",
      icon: "flie-text-o",
      text: "My Profile",
      link: "/user",
      restricted: false
    },
    {
      type: "navItem",
      icon: "flie-text-o",
      text: "Add Admins",
      link: "/user/register",
      restricted: false
    },
    {
      type: "navItem",
      icon: "fa-sigin-in",
      text: "Login",
      link: "/login",
      restricted: false
    },
    {
      type: "navItem",
      icon: "file-text-o",
      text: "Add reviews",
      link: "/user/add",
      restricted: false
    },
    {
      type: "navItem",
      icon: "fa-sigin-out",
      text: "Logot",
      link: "/user/logout",
      restricted: false
    }
  ];

  const showitems = () => {
    return items.map((item, i) => {
      return (
        <div key={i} className={item.type}>
          <Link to={item.link}>{item.text}</Link>
        </div>
      );
    });
  };

  return <div>{showitems()}</div>;
};

export default SidenavItems;
