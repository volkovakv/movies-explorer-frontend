import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__header">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Ксюша</h3>
          <p className="about-me__description">Менеджер проектов, 28 лет</p>
          <p className="about-me__bio">Я родилась в Перми, но уже 13 лет живу в Москве. Закончила факультет инженерного бизнеса и менеджмента в МГТУ им. Н.Э.Баумана и работаю в Росатоме. Увлекаюсь собаками, путешествиями, сноубордом и авто. Недавно начала изучать веб-разработку, очень надеюсь, что получится и дальше развиваться в этом направлении. </p>
          <ul className="about-me__links">
            <li><a className="about-me__link" href="https://vk.com/ksesh">VK</a></li>
            <li><a className="about-me__link" href="https://github.com/volkovakv">Github</a></li>
          </ul>
        </div>

        <img className="about-me__avatar" src={avatar} alt="К сожалению, изображение не доступно" />
      </div>
    </section>
  );
};

export default AboutMe; 