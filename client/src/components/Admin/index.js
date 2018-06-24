import React from "react";

function User(props) {
  let user = props.user.login;
  return (
    <div className="user_container">
      <div className="avatar">
        <img alt="avatar" src="/images/avatar.png" />
      </div>
      <div className="nfo">
        <div>
          <span>Name:</span> {user.name}
        </div>
        <div>
          <span>email:</span>
          {user.email}
        </div>
        <div>
          <span>last name:</span>
          {user.lastname}
        </div>
      </div>
    </div>
  );
}

export default User;
