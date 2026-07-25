import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import {
  Globe,
  ChevronDown,
  Palette,
} from "lucide-react";

function Navbar() {
  const {
    language,
    changeLanguage,
    theme,
    changeTheme,
    t,
  } = useLanguage();

  const languages = [
    {
      name: "English",
      label: "English",
    },
    {
      name: "Kannada",
      label: "ಕನ್ನಡ",
    },
    {
      name: "Hindi",
      label: "हिन्दी",
    },
    {
      name: "Tamil",
      label: "தமிழ்",
    },
    {
      name: "Telugu",
      label: "తెలుగు",
    },
  ];

  const themes = [
    {
      name: "Dark",
      label: "Dark",
    },
    {
      name: "Light",
      label: "Light",
    },
  ];

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl z-50">

      <div className="flex items-center justify-between px-10 py-5">

        {/* ============================= */}
        {/* LOGO */}
        {/* ============================= */}

        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer"
        >
          <h1 className="text-3xl font-extrabold text-green-400">
            🌱 BhumiMitra
          </h1>
        </Link>


        {/* ============================= */}
        {/* NAVIGATION LINKS */}
        {/* ============================= */}

        <ul className="flex items-center gap-14 text-lg font-medium">

          {[
            {
              name: t.home,
              link: "#home",
            },
            {
              name: t.services,
              link: "#services",
            },
            {
              name: t.features,
              link: "#features",
            },
            {
              name: t.about,
              link: "#about",
            },
          ].map((item) => (

            <li
              key={item.name}
              className="relative group"
            >

              <a
                href={item.link}
                className="cursor-pointer transition-colors duration-300 group-hover:text-green-400"
              >
                {item.name}
              </a>

              <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>

            </li>

          ))}

        </ul>


        {/* ============================= */}
        {/* RIGHT SIDE */}
        {/* ============================= */}

        <div className="flex items-center gap-5">


          {/* ============================= */}
          {/* LANGUAGE DROPDOWN */}
          {/* ============================= */}

          <Menu
            as="div"
            className="relative"
          >

            <MenuButton className="flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-white/10 transition duration-300">

              <Globe size={20} />

              <span>
                {language}
              </span>

              <ChevronDown size={16} />

            </MenuButton>


            <MenuItems className="absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border border-white/20 bg-slate-900 shadow-xl focus:outline-none">

              {languages.map((lang) => (

                <MenuItem key={lang.name}>

                  <button
                    type="button"
                    onClick={() =>
                      changeLanguage(
                        lang.name as
                          | "English"
                          | "Kannada"
                          | "Hindi"
                          | "Tamil"
                          | "Telugu"
                      )
                    }
                    className="w-full px-4 py-3 text-left text-white transition-colors duration-200 data-focus:bg-green-500"
                  >
                    {lang.label}
                  </button>

                </MenuItem>

              ))}

            </MenuItems>

          </Menu>


          {/* ============================= */}
          {/* THEME DROPDOWN */}
          {/* ============================= */}

          <Menu
            as="div"
            className="relative"
          >

            <MenuButton className="flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-white/10 transition duration-300">

              <Palette size={20} />

              <span>
                {theme}
              </span>

              <ChevronDown size={16} />

            </MenuButton>


            <MenuItems className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-white/20 bg-slate-900 shadow-xl focus:outline-none">

              {themes.map((themeOption) => (

                <MenuItem key={themeOption.name}>

                  <button
                    type="button"
                    onClick={() =>
                      changeTheme(
                        themeOption.name as
                          | "Dark"
                          | "Light"
                      )
                    }
                    className="w-full px-4 py-3 text-left text-white transition-colors duration-200 data-focus:bg-green-500"
                  >
                    {themeOption.label}
                  </button>

                </MenuItem>

              ))}

            </MenuItems>

          </Menu>


          {/* ============================= */}
          {/* LOGIN BUTTON */}
          {/* ============================= */}

          <Link to="/login">

            <button
              type="button"
              className="rounded-xl border border-green-500 px-8 py-4 font-semibold transition-all duration-300 hover:bg-green-500 hover:text-white"
            >
              {t.login}
            </button>

          </Link>


          {/* ============================= */}
          {/* REGISTER BUTTON */}
          {/* ============================= */}

          <Link to="/register">

            <button
              type="button"
              className="rounded-xl bg-linear-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              {t.register} →
            </button>

          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;