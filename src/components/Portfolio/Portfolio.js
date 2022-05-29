import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/volkovakv/russian-travel">Статичный сайт</a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/volkovakv/russian-travel">Адаптивный сайт</a>
        </li>
        <li className="portfolio__project">
          <a className="portfolio__link" href="https://github.com/volkovakv/react-mesto-api-full">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;