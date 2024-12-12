import { useWellbeingArticles } from '../hooks/useWellbingArticles';

export default function WellbeingArticles() {
  const { data: articles, isLoading, isError, error } = useWellbeingArticles();

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <aside className="wellbeing-sidebar">
      <div>
        <h2>Wellbeing Articles</h2>
        <ul>
          {articles?.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.headline}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="attribution">
        <a href="https://www.nhs.uk" target="_blank" rel="noopener noreferrer"><img src="https://assets.nhs.uk/nhsuk-cms/images/nhs-attribution.width-510.png" alt="Content supplied by the NHS website" /></a>
      </div>
    </aside>
  );
};

