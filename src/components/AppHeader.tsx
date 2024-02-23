import { useTranslation } from "react-i18next";
import { BostaAr, BostaEN } from "@/assets/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormEvent, memo } from "react";
import { Search } from "lucide-react";

const links = [
  { label: "HOME", link: "#" },
  { label: "PRICES", link: "#" },
  { label: "CONTACT", link: "#" },
];

const AppHeader = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigate(`/${i18n.language}/${e.target.id.value}`);
  };
  return (
    <header className="container h-16 flex justify-between py-5 border-b-2">
      <Link to={"/"}>{i18n.language === "ar" ? <BostaAr /> : <BostaEN />}</Link>
      <nav>
        <ul className="hidden md:flex gap-1 md:gap-10 items-center h-full font-bold">
          {links.map(({ label, link }) => (
            <Link key={label} to={link}>
              <li>{t(label)}</li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="flex items-center">
        <span className="border-e-2 p-2 font-bold relative group hover:border-x hover:border-t">
          <span>{t("TRACK_SHIPMENT")}</span>
          <div className="hidden group-hover:flex flex-col gap-2 absolute top-100 end-0 px-8 py-6 rounded-s-xl rounded-ee-xl border bg-white">
            <h2 className="text-sm">{t("FOLLOW_SHIPMENT")}</h2>
            <form
              onSubmit={handleSearch}
              className="relative rounded-xl overflow-hidden"
            >
              <button
                type="submit"
                className="opacity-100 rounded-s-xl px-2 h-full absolute flex items-center bg-red-600"
              >
                <Search color="white" />
              </button>
              <input
                className="border ps-12 p-2 rounded-xl"
                type="text"
                name="id"
                placeholder={t("FOLLOW_NUMBER")!}
              />
            </form>
          </div>
        </span>
        <span className="p-2 font-bold">{t("SIGN_IN")}</span>
        <LanguageSelect />
      </div>
    </header>
  );
};

const LanguageSelect = memo(() => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locationWithoutLang = location.pathname.split(`/${i18n.language}`)[1];
    navigate(
      `/${e.target.value}${locationWithoutLang || ""}${location.search || ""}`
    );
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      className="flex h-9 min-w-20 items-center justify-between rounded-md bg-transparent text-red-500 text-lg font-bold shadow-sm ring-offset-background appearance-none text-center placeholder:text-muted-foreground focus:outline-none"
      value={i18n.language}
      onChange={handleChange}
    >
      {Object.keys(i18n.services.resourceStore.data).map((lang) => (
        <option
          className="text-red-500 px-2 py-1.5  font-semibold"
          key={lang}
          value={lang}
        >
          {t(lang)}
        </option>
      ))}
    </select>
  );
});

export default AppHeader;
