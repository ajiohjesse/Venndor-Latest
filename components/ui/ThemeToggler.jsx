import styles from "../../styles/ui/ThemeToggler.module.css";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("venndor-theme", activeTheme);
  }, [activeTheme]);

  return (
    <button
      type="button"
      title="Switch Theme"
      onClick={() => setActiveTheme(inactiveTheme)}
      className={styles.toggleBtn}
    >
      {activeTheme === "dark" && (
        <span className={styles.sunIcon}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19H12.998V22H10.998zM10.998 2H12.998V5H10.998zM1.998 11H4.998V13H1.998zM18.998 11H21.998V13H18.998z"></path>
            <path
              transform="rotate(-45.017 5.986 18.01)"
              d="M4.487 17.01H7.487V19.01H4.487z"
            ></path>
            <path
              transform="rotate(-45.001 18.008 5.99)"
              d="M16.508 4.99H19.509V6.99H16.508z"
            ></path>
            <path
              transform="rotate(-134.983 5.988 5.99)"
              d="M4.487 4.99H7.487V6.99H4.487z"
            ></path>
            <path
              transform="rotate(134.999 18.008 18.01)"
              d="M17.008 16.51H19.008V19.511000000000003H17.008z"
            ></path>
          </svg>
        </span>
      )}

      {activeTheme === "light" && (
        <span className={styles.moonIcon}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export default ThemeToggler;
