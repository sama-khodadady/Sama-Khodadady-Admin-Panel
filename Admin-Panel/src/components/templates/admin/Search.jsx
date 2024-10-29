import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { removeCookie } from "utils/cookie";
import { useAuth } from "context/AuthContext";

import styles from "./Search.module.css";

function Search({ search, setSearch }) {
  const [isHover, setIsHovered] = useState(false);
  const { username } = useAuth();
  const navigate = useNavigate();

  //logout from user dashboard handler
  const logoutHandler = () => {
    removeCookie("token", "");
    navigate("/signup");
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchBox}>
        <img src="/search.svg" alt="search" />
        <input
          type="text"
          placeholder="جستجو  کالا"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
      </div>
      <div
        className={styles.profile}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src="profile.svg" alt="profile" className={styles.profileImg} />
        <div>
          <h3>{username}</h3>
          <h6>مدیر</h6>
        </div>
        {isHover && (
          <div className={styles.section}>
            <ul>
              <img src="/logout.svg" alt="logout" className={styles.logout} />
              <li onClick={logoutHandler}>خروج از حساب کاربری</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
