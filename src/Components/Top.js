import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleTheme } from '../redux/slices/theme';
import { setLanguage } from '../redux/slices/language';
import { HiSun, HiMoon, HiHome } from 'react-icons/hi';
import styles from '../css/Top.module.css';
import localization from '../text.json';

class Top extends Component {
  render() {
    const { isDarkThemeOn, selectedLanguage, languageOptions, toggleTheme, setLanguage, currentPage } = this.props;
    const isRoot = currentPage === 'root'
    const isProjects = currentPage === 'projects'

    return (
      <header className={styles.header}>
        <section className={styles.topSection}>
          <h1 className={styles.name}> Vitor Breno Chacon e Silva</h1>
          <select value={selectedLanguage} onChange={(e) => setLanguage(e.target.value)} className={styles.select}>
              {languageOptions.map((languageOption, index) => (
                <option key={index} value={languageOption}>{languageOption}</option>
              ))}
          </select>
        </section>
        <nav className={styles.navContainer}>
          { isDarkThemeOn ? <HiSun className={styles.toggleIcon} onClick={toggleTheme}/> : <HiMoon className={styles.toggleIcon} onClick={toggleTheme}/> }
          { !isRoot ? <Link to="/" className={styles.navLink}> <HiHome /> </Link>: <HiHome className={styles.homeIcon} /> }
          { !isProjects ? <Link to="/projects" className={styles.navLink}>{localization[selectedLanguage].Projects}</Link>: <p className={styles.projects}>{localization[selectedLanguage].Projects}</p>}
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  isDarkThemeOn: state.theme.isDarkThemeOn,
  selectedLanguage: state.language.selectedLanguage,
  languageOptions: state.language.languageOptions,
  currentPage: state.pageTracker.currentPage
});

const mapDispatchToProps = {
  toggleTheme,
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Top);
