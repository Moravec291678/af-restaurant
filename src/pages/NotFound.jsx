import { useLanguage } from "../context/useLanguage";

function NotFound() {
  const { isEnglish } = useLanguage();
  return (
    <section className="page-shell" aria-labelledby="not-found-title">
      <div className="container">
        <h1 id="not-found-title">{isEnglish ? "Page not found" : "Stránka nebyla nalezena"}</h1>
      </div>
    </section>
  );
}

export default NotFound;
