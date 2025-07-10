import { useTranslation } from "react-i18next";

const langs = {
  en: { nativeName: "English" },
  esp: { nativeName: "Español" },
};

function LangButtons() {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-x-4 ">
      {Object.keys(langs).map((lang) => {
        return (
          <button
            type="submit"
            key={lang}
            onClick={() => i18n.changeLanguage(lang)}
            disabled={i18n.resolvedLanguage === lang}
          >
            {langs[lang].nativeName}
          </button>
        );
      })}
    </div>
  );
}

export default LangButtons;
