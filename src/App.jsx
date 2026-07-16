import { useState } from 'react';
import './App.css';
import Kartei from './components/Kartei.jsx';
import SteuerpositionUeben from './components/SteuerpositionUeben.jsx';
import UtilisationsBegleiter from './components/UtilisationsBegleiter.jsx';
import QualitaetsCheck from './components/QualitaetsCheck.jsx';
import MeinFokus from './components/MeinFokus.jsx';
import Methodenbox from './components/Methodenbox.jsx';
import Modelle from './components/Modelle.jsx';
import Ressourcen from './components/Ressourcen.jsx';
import FokusKompass from './components/FokusKompass.jsx';
import Videothek from './components/Videothek.jsx';
import MUSTER_DATA from './data/muster.json';
import METHODEN_DATA from './data/methodenbox.json';
import { BILDER_KATEGORIEN, VIDEOS } from './data/ressourcen.js';
import { searchGlobal } from './searchIndex.js';
import heroImage from './assets/logo_mental.png';

const TAB_ICONS = {
  kartei: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="4" x2="8" y2="9"/></svg>,
  pruefung: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  methodenbox: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7h-3a2 2 0 0 1-2-2V2"/><path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7z"/></svg>,
  innergame: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  fokus: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>,
  ressourcen: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  fokuskompass: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  steuerposition: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1"/><circle cx="12" cy="12" r="2.3"/></svg>,
  begleiter: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="0.8" fill="currentColor"/><circle cx="12" cy="10" r="0.8" fill="currentColor"/><circle cx="15" cy="10" r="0.8" fill="currentColor"/></svg>,
  modelle: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  videothek: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="10 8 16 12 10 16 10 8"/><circle cx="12" cy="12" r="9"/></svg>
};

function App(){
  const [tab, setTab] = useState('kartei');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [jump, setJump] = useState(null);

  function goToResult(result){
    setTab(result.tab);
    setJump({
      tab: result.tab,
      openId: result.openId || null,
      openNr: result.openNr || null,
      openView: result.openView || null,
      openThemaId: result.openThemaId || null,
      nonce: Date.now()
    });
    setSearchQuery('');
    setSearchFocused(false);
  }

  const searchResults = searchGlobal(searchQuery);
  const jumpForTab = jump && jump.tab === tab ? jump : null;
  const tabKey = jumpForTab ? tab + '-jump-' + jumpForTab.nonce : tab;

  return (
    <>
      <header>
        <img src={heroImage} alt="Zur Startseite" className="header-hero" onClick={() => setTab('kartei')} />
        <h1 className="header-title-link" onClick={() => setTab('kartei')} role="button" tabIndex={0} onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setTab('kartei'); } }}>Prozessqualität</h1>
        <p className="sub">Vorbereitung während der Sitzung · Selbstsupervision danach · Mein Fokus</p>
        <div className="drawer-label">Persönliches Nachschlage- und Prüfwerkzeug für den hypnosystemischen Utilisations-Prozess. Ausschließlich zum eigenen Gebrauch.</div>

        <div className="global-search-wrap">
          <div className="search-box global-search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Alles durchsuchen, Muster, Methode, Reframing, Phase …"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              onKeyDown={e => { if(e.key === 'Escape'){ setSearchQuery(''); setSearchFocused(false); } }}
            />
            {searchQuery && <span className="count">{searchResults.length}</span>}
          </div>
          {searchFocused && searchQuery && (
            <div className="global-search-results">
              {searchResults.length === 0 ? (
                <div className="global-search-empty">Keine Treffer. Anderen Begriff versuchen.</div>
              ) : (
                searchResults.map(r => (
                  <button key={r.key} className="global-search-result" onMouseDown={() => goToResult(r)}>
                    <span className="global-search-result-titel">{r.titel}</span>
                    <span className="global-search-result-kontext">{r.kontext}</span>
                    <span className="global-search-result-snippet">{r.snippet}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="tab-bar">
          <button className={'tab-btn tab-btn-terracotta' + (tab === 'begleiter' ? ' active' : '')} onClick={() => setTab('begleiter')}>{TAB_ICONS.begleiter}Utilisations-Begleiter</button>
          <button className={'tab-btn tab-btn-prominent' + (tab === 'steuerposition' ? ' active' : '')} onClick={() => setTab('steuerposition')}>{TAB_ICONS.steuerposition}Steuerposition üben</button>
          <button className={'tab-btn' + (tab === 'kartei' ? ' active' : '')} onClick={() => setTab('kartei')}>{TAB_ICONS.kartei}Kartei <span className="tab-count">{MUSTER_DATA.muster.length}</span></button>
          <button className={'tab-btn' + (tab === 'methodenbox' ? ' active' : '')} onClick={() => setTab('methodenbox')}>{TAB_ICONS.methodenbox}Methodenbox <span className="tab-count">{METHODEN_DATA.elemente.length}</span></button>
          <div className="tab-bar-break" aria-hidden="true"></div>
          <button className={'tab-btn' + (tab === 'modelle' ? ' active' : '')} onClick={() => setTab('modelle')}>{TAB_ICONS.modelle}EMDR, ACT &amp; Inner Game</button>
          <button className={'tab-btn' + (tab === 'pruefung' ? ' active' : '')} onClick={() => setTab('pruefung')}>{TAB_ICONS.pruefung}Qualitäts-Check</button>
          <button className={'tab-btn' + (tab === 'ressourcen' ? ' active' : '')} onClick={() => setTab('ressourcen')}>{TAB_ICONS.ressourcen}Ressourcen <span className="tab-count">{BILDER_KATEGORIEN.reduce((a, k) => a + k.bilder.length, 0) + VIDEOS.length}</span></button>
          <button className={'tab-btn' + (tab === 'videothek' ? ' active' : '')} onClick={() => setTab('videothek')}>{TAB_ICONS.videothek}Videothek</button>
          <button className={'tab-btn' + (tab === 'fokus' ? ' active' : '')} onClick={() => setTab('fokus')}>{TAB_ICONS.fokus}Mein Fokus</button>
          <button className={'tab-btn' + (tab === 'fokuskompass' ? ' active' : '')} onClick={() => setTab('fokuskompass')}>{TAB_ICONS.fokuskompass}Fokus-Kompass</button>
        </div>
      </header>

      {tab === 'begleiter' && <UtilisationsBegleiter />}
      {tab === 'steuerposition' && <SteuerpositionUeben />}
      {tab === 'kartei' && (
        <Kartei
          key={tabKey}
          initialOpenId={jumpForTab ? jumpForTab.openId : undefined}
          initialAnsicht={jumpForTab ? jumpForTab.openView : undefined}
        />
      )}
      {tab === 'pruefung' && <QualitaetsCheck />}
      {tab === 'methodenbox' && <Methodenbox key={tabKey} initialOpenId={jumpForTab ? jumpForTab.openId : undefined} />}
      {tab === 'modelle' && (
        <Modelle
          key={tabKey}
          initialThemaId={jumpForTab ? jumpForTab.openThemaId : undefined}
          initialOpenId={jumpForTab ? jumpForTab.openId : undefined}
          initialOpenNr={jumpForTab ? jumpForTab.openNr : undefined}
        />
      )}
      {tab === 'ressourcen' && <Ressourcen />}
      {tab === 'videothek' && (
        <Videothek key={tabKey} initialSammlungId={jumpForTab ? jumpForTab.openId : undefined} />
      )}
      {tab === 'fokus' && <MeinFokus />}
      {tab === 'fokuskompass' && <FokusKompass />}

      <footer>Utilisations-Kanon · Steuerposition-Methodik · für den eigenen Gebrauch</footer>
    </>
  );
}

export default App;
