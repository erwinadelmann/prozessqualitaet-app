import { useState } from 'react';
import './App.css';
import Kartei from './components/Kartei.jsx';
import QualitaetsCheck from './components/QualitaetsCheck.jsx';
import MeinFokus from './components/MeinFokus.jsx';
import Methodenbox from './components/Methodenbox.jsx';
import InnerGame from './components/InnerGame.jsx';
import MUSTER_DATA from './data/muster.json';
import METHODEN_DATA from './data/methodenbox.json';
import heroImage from './assets/logo_mental.png';

const TAB_ICONS = {
  kartei: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="4" x2="8" y2="9"/></svg>,
  pruefung: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  methodenbox: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7h-3a2 2 0 0 1-2-2V2"/><path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7z"/></svg>,
  innergame: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  fokus: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>
};

function App(){
  const [tab, setTab] = useState('kartei');

  return (
    <>
      <header>
        <img src={heroImage} alt="" className="header-hero" />
        <h1>Prozessqualität</h1>
        <p className="sub">Vorbereitung während der Sitzung · Selbstsupervision danach · Mein Fokus</p>
        <div className="drawer-label">Persönliches Nachschlage- und Prüfwerkzeug für den hypnosystemischen Utilisations-Prozess. Ausschließlich zum eigenen Gebrauch.</div>

        <div className="tab-bar">
          <button className={'tab-btn' + (tab === 'kartei' ? ' active' : '')} onClick={() => setTab('kartei')}>{TAB_ICONS.kartei}Kartei <span className="tab-count">{MUSTER_DATA.muster.length}</span></button>
          <button className={'tab-btn' + (tab === 'pruefung' ? ' active' : '')} onClick={() => setTab('pruefung')}>{TAB_ICONS.pruefung}Qualitäts-Check</button>
          <button className={'tab-btn' + (tab === 'methodenbox' ? ' active' : '')} onClick={() => setTab('methodenbox')}>{TAB_ICONS.methodenbox}Methodenbox <span className="tab-count">{METHODEN_DATA.elemente.length}</span></button>
          <button className={'tab-btn' + (tab === 'innergame' ? ' active' : '')} onClick={() => setTab('innergame')}>{TAB_ICONS.innergame}Inner Game</button>
          <button className={'tab-btn' + (tab === 'fokus' ? ' active' : '')} onClick={() => setTab('fokus')}>{TAB_ICONS.fokus}Mein Fokus</button>
        </div>
      </header>

      {tab === 'kartei' && <Kartei />}
      {tab === 'pruefung' && <QualitaetsCheck />}
      {tab === 'methodenbox' && <Methodenbox />}
      {tab === 'innergame' && <InnerGame />}
      {tab === 'fokus' && <MeinFokus />}

      <footer>Utilisations-Kanon · Steuerposition-Methodik · für den eigenen Gebrauch</footer>
    </>
  );
}

export default App;
