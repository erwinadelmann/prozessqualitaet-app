import { useState } from 'react';
import './App.css';
import Kartei from './components/Kartei.jsx';
import QualitaetsCheck from './components/QualitaetsCheck.jsx';
import MeinFokus from './components/MeinFokus.jsx';

function App(){
  const [tab, setTab] = useState('kartei');

  return (
    <>
      <header>
        <h1>Prozessqualität</h1>
        <p className="sub">Vorbereitung während der Sitzung · Selbstsupervision danach · Mein Fokus</p>
        <div className="drawer-label">Persönliches Nachschlage- und Prüfwerkzeug für den hypnosystemischen Utilisations-Prozess. Ausschließlich zum eigenen Gebrauch.</div>

        <div className="tab-bar">
          <button className={'tab-btn' + (tab === 'kartei' ? ' active' : '')} onClick={() => setTab('kartei')}>Kartei</button>
          <button className={'tab-btn' + (tab === 'pruefung' ? ' active' : '')} onClick={() => setTab('pruefung')}>Qualitäts-Check</button>
          <button className={'tab-btn' + (tab === 'fokus' ? ' active' : '')} onClick={() => setTab('fokus')}>Mein Fokus</button>
        </div>
      </header>

      {tab === 'kartei' && <Kartei />}
      {tab === 'pruefung' && <QualitaetsCheck />}
      {tab === 'fokus' && <MeinFokus />}

      <footer>Utilisations-Kanon · Steuerposition-Methodik · für den eigenen Gebrauch</footer>
    </>
  );
}

export default App;
