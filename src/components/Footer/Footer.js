import '../Footer/Footer.css';

function Footer() {
    return (
        <footer className="footer">
        <h3 className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__container">
            <p className="footer__copyright">&copy; 2022</p>
            <nav>
            <ul className="footer__links">
                <li className="footer__links-item">
                <a className="footer__link" href="https://practicum.yandex.ru/web/" target="blank">Яндекс.Практикум</a>
                </li>
                <li className="footer__links-item">
                <a className="footer__link" href="https://github.com/volkovakv" target="blank">Github</a>
                </li>
                <li className="footer__links-item">
                <a className="footer__link" href="https://vk.com/ksesh" target="blank">VK</a>
                </li>
            </ul>
            </nav>
        </div>
        </footer>
    );
  }
  
  export default Footer;