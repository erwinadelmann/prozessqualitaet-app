import { useState, useMemo, useEffect, useRef } from 'react';
import DATA from '../data/schema-therapie.json';
import ScrollTopButton from './ScrollTopButton.jsx';

// Sachliche Referenz zu den 18 frühen maladaptiven Schemata nach Jeffrey Young, siehe
// schema-therapie.json für Quelle und Hinweis. Bewusst ohne hypnosystemische
// Ursprungsintention/Schutzfunktion-Reframe-Ebene, das wäre ein eigener, späterer Schritt.
// UI-Muster wie Methodenbox: flaches Karten-Raster, per Domäne filterbar, Klick öffnet das
// bekannte Fullscreen-Detailfenster mit Blättern und Zurück-nach-oben.

const DOMAENEN_CLASS = {
  'Abgetrenntheit & Ablehnung': 'st-domain-1',
  'Beeinträchtigte Autonomie & Leistung': 'st-domain-2',
  'Beeinträchtigte Grenzen': 'st-domain-3',
  'Fremdausrichtung': 'st-domain-4',
  'Übermäßige Wachsamkeit & Gehemmtheit': 'st-domain-5'
};

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [item.name, item.domaene, item.beschreibung].join(' ').toLowerCase().includes(q);
}

const MM = DATA.modusmodell;
const G = id => MM.gruppen.find(g => g.id === id);
const UE = DATA.uebersicht;

// Einfache, robuste Strich-Icons für die Prozessleiste, bewusst ohne komplexe
// Bezier-Pfade (Lupe, Glühbirne mit Herz, Baum, Ziel, zwei Zahnräder via
// strokeDasharray). 24x24-Raster, weiß, passend zum dunklen Hero-Hintergrund.
function StepIcon({ type }){
  const stroke = { stroke: '#fff', strokeWidth: 1.7, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch(type){
    case 'lupe':
      return (
        <g {...stroke}>
          <circle cx="10" cy="10" r="6.4" />
          <ellipse cx="10" cy="10" rx="3.1" ry="1.7" />
          <circle cx="10" cy="10" r="0.9" fill="#fff" stroke="none" />
          <line x1="14.7" y1="14.7" x2="20.4" y2="20.4" />
        </g>
      );
    case 'gluehbirne':
      return (
        <g>
          <g {...stroke}>
            <circle cx="12" cy="9.5" r="5.4" />
            <path d="M9.6,17.3 h4.8" />
            <path d="M10.1,19.6 h3.8" />
            <line x1="12" y1="1.8" x2="12" y2="3.4" />
            <line x1="4.4" y1="9.5" x2="6" y2="9.5" />
            <line x1="18" y1="9.5" x2="19.6" y2="9.5" />
            <line x1="6.3" y1="3.7" x2="7.5" y2="4.9" />
            <line x1="17.7" y1="3.7" x2="16.5" y2="4.9" />
          </g>
          <text x="12" y="12" textAnchor="middle" fontSize="6.5" fill="#fff">♥</text>
        </g>
      );
    case 'baum':
      return (
        <g {...stroke}>
          <circle cx="12" cy="7.6" r="4.6" />
          <circle cx="8.2" cy="10.3" r="3.3" />
          <circle cx="15.8" cy="10.3" r="3.3" />
          <line x1="12" y1="13.6" x2="12" y2="21" />
        </g>
      );
    case 'ziel':
      return (
        <g {...stroke}>
          <circle cx="12" cy="12" r="7.6" />
          <circle cx="12" cy="12" r="4.2" />
          <polyline points="8.4,12.4 11,15.4 16.2,9" />
        </g>
      );
    case 'zahnraeder':
      return (
        <g fill="none" strokeLinecap="round" stroke="#fff">
          <circle cx="8.6" cy="9" r="4.6" strokeWidth="2.2" strokeDasharray="2 1.7" />
          <circle cx="8.6" cy="9" r="1.6" strokeWidth="1.4" />
          <circle cx="16.2" cy="16" r="3.6" strokeWidth="2" strokeDasharray="1.7 1.4" />
          <circle cx="16.2" cy="16" r="1.2" strokeWidth="1.2" />
        </g>
      );
    default:
      return null;
  }
}

const PL_FARBEN = ['var(--secondary)', 'var(--sage)', 'var(--accent)', 'var(--muted)', 'var(--terracotta)'];

// Attraktive Pfeilleiste für die Header-Leiste: fünf eigenständige Pfeil-Segmente
// (kein Bild, native SVG, bleibt bei jeder Bildschirmgröße gestochen scharf),
// Marken-Farbverlauf von Secondary bis Terracotta, halbtransparent wie die
// übrigen Pillen im Modus-Modell darüber, damit es sich in den dunklen Hero einfügt.
function ProzessLeiste(){
  const schritte = DATA.prozessleiste.schritte;
  const segW = 168, gap = 20, tip = 22, h = 46, y = 90;
  const startX = 20;
  const viewW = startX * 2 + schritte.length * segW + (schritte.length - 1) * gap + tip;

  return (
    <div style={{ margin: '1.5rem auto 0', maxWidth: '1080px', width: '100%' }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--secondary)', textAlign: 'center', margin: '0 0 0.6rem' }}>
        {DATA.prozessleiste.hinweis}
      </p>
      <svg viewBox={`0 0 ${viewW} 148`} role="img" aria-label={'Fünf Schritte: ' + schritte.map(s => s.name).join(', ')} style={{ width: '100%', height: 'auto' }}>
        <title>Prozessleiste, fünf Schritte</title>
        {schritte.map((s, i) => {
          const x = startX + i * (segW + gap);
          const cx = x + segW / 2;
          const farbe = PL_FARBEN[i % PL_FARBEN.length];
          const points = [
            [x, y], [x + segW, y], [x + segW + tip, y + h / 2],
            [x + segW, y + h], [x, y + h]
          ].map(p => p.join(',')).join(' ');
          const zweizeilig = s.name.length > 14 && s.name.includes(' ');
          const teile = zweizeilig ? s.name.split(' ') : [s.name];
          return (
            <g key={s.id}>
              <title>{s.name}: {s.beschreibung}</title>
              <g transform={`translate(${cx - 12}, 8)`}>
                <StepIcon type={s.icon} />
              </g>
              <polygon points={points} fill={farbe} opacity="0.4" stroke={farbe} strokeWidth="1.5" />
              {zweizeilig ? (
                <>
                  <text x={cx} y={y + h / 2 - 2} textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="12.5" fill="#fff">{teile[0]}</text>
                  <text x={cx} y={y + h / 2 + 13} textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="12.5" fill="#fff">{teile.slice(1).join(' ')}</text>
                </>
              ) : (
                <text x={cx} y={y + h / 2 + 5} textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="13" fill="#fff">{s.name}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Kreisdiagramm des Schema-Modus-Modells: belastete Kindmodi und der gesunde Kindmodus
// deutlich getrennt (unterschiedliche Farbe, eigene Beschriftung), Bewältigungsmodi und
// Elternmodi als weitere Cluster, alle um den gesunden Erwachsenenmodus in der Mitte, mit
// eigenen Eigenschaften darunter. Text durchgehend hell für Lesbarkeit auf dem dunklen
// Hero-Hintergrund. Klick auf einen Modus hebt ihn samt zugehörigem Pfeil hervor und zeigt
// die Kurzbeschreibung darunter, alle anderen Elemente treten zurück, so werden einzelne
// Konstellationen sofort sichtbar.
function ModusModellGrafik(){
  const [aktiv, setAktiv] = useState(null);

  function waehle(modus, gruppeId){
    setAktiv(prev => (prev && prev.id === modus.id) ? null : { ...modus, gruppeId });
  }

  function pillProps(modus, gruppeId){
    const istAktiv = aktiv && aktiv.id === modus.id;
    const gedimmt = aktiv && !istAktiv;
    return {
      role: 'button',
      tabIndex: 0,
      onClick: () => waehle(modus, gruppeId),
      onKeyDown: e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); waehle(modus, gruppeId); } },
      style: {
        cursor: 'pointer',
        opacity: gedimmt ? 0.3 : 1,
        transform: istAktiv ? 'scale(1.06)' : 'scale(1)',
        transformBox: 'fill-box',
        transformOrigin: 'center',
        transition: 'opacity 0.25s ease, transform 0.25s ease'
      }
    };
  }

  function arrowProps(gruppeId, farbe){
    const istAktiv = aktiv && aktiv.gruppeId === gruppeId;
    const gedimmt = aktiv && !istAktiv;
    return {
      className: 'st-arrow',
      stroke: farbe,
      strokeWidth: istAktiv ? 4 : 2.5,
      opacity: gedimmt ? 0.2 : 1,
      style: { transition: 'opacity 0.25s ease, stroke-width 0.25s ease' }
    };
  }

  const belastet = G('kindmodi_belastet').modi;
  const gesundKind = G('kindmodus_gesund').modi[0];
  const bewaeltigung = G('bewaeltigungsmodi').modi;
  const eltern = G('elternmodi').modi;
  const erwachsenerGruppe = G('gesunder_erwachsener');
  const erwachsener = erwachsenerGruppe.modi[0];
  const eigenschaften = erwachsenerGruppe.eigenschaften;

  const belastetPos = [45, 175, 305];
  const bewaeltigungPos = [414, 448, 482];
  const elternPos = [414, 448];
  const eigenschaftenLinks = [eigenschaften[0], eigenschaften[1]];
  const eigenschaftenRechts = [eigenschaften[2], eigenschaften[3]];
  const eigenschaftenY = [266, 326];

  return (
    <>
      <svg viewBox="0 0 760 540" role="img" aria-label="Schema-Modus-Modell: belastete Kindmodi, gesunder Kindmodus, Bewältigungsmodi und Elternmodi um den gesunden Erwachsenenmodus, mit dessen Eigenschaften seitlich auf gleicher Höhe. Klickbar für Details.">
        <title>Schema-Modus-Modell, interaktiv</title>
        <defs>
          <marker id="stArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--muted-text)" />
          </marker>
        </defs>

        <line {...arrowProps('kindmodi_belastet', 'var(--terracotta)')} x1="220" y1="82" x2="345" y2="248" markerEnd="url(#stArrow)" />
        <line {...arrowProps('kindmodus_gesund', 'var(--sage)')} x1="560" y1="82" x2="418" y2="248" markerEnd="url(#stArrow)" />
        <line {...arrowProps('bewaeltigungsmodi', 'var(--muted)')} x1="230" y1="405" x2="332" y2="352" markerEnd="url(#stArrow)" />
        <line {...arrowProps('elternmodi', 'var(--accent)')} x1="570" y1="405" x2="430" y2="352" markerEnd="url(#stArrow)" />
        {eigenschaftenY.map((y, i) => (
          <line key={'el-' + i} {...arrowProps('gesunder_erwachsener', 'var(--primary)')} x1="316" y1="300" x2="300" y2={y + 18} />
        ))}
        {eigenschaftenY.map((y, i) => (
          <line key={'er-' + i} {...arrowProps('gesunder_erwachsener', eigenschaftenRechts[i].id === 'turbo' ? 'var(--secondary)' : 'var(--primary)')} x1="444" y1="300" x2="460" y2={y + 18} />
        ))}

        <g className="st-center-enter">
          <circle className="st-pulse-ring" cx="380" cy="300" r="60" />
          <circle className="st-pulse-ring st-delay-1" cx="380" cy="300" r="60" />
          <circle className="st-pulse-ring st-delay-2" cx="380" cy="300" r="60" />
          <circle
            {...pillProps(erwachsener, 'gesunder_erwachsener')}
            cx="380" cy="300" r="64" fill="var(--primary)"
            stroke={aktiv && aktiv.id === erwachsener.id ? '#fff' : 'none'} strokeWidth="3"
          />
          <text x="380" y="295" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="15" fill="#fff" style={{ pointerEvents: 'none' }}>Gesunder</text>
          <text x="380" y="314" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="15" fill="#fff" style={{ pointerEvents: 'none' }}>Erwachsener</text>
        </g>

        <g className="st-enter" style={{ animationDelay: '0.05s' }}>
          <text x="220" y="24" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--terracotta)">BELASTETE KINDMODI</text>
          {belastet.map((m, i) => (
            <g key={m.id} {...pillProps(m, 'kindmodi_belastet')}>
              <rect x={belastetPos[i]} y="40" width="120" height="34" rx="17" fill="var(--terracotta)" opacity="0.28" stroke="var(--terracotta)" strokeWidth="1.5" />
              <text x={belastetPos[i] + 60} y="62" textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="12.5" fill="#fff">{m.name}</text>
            </g>
          ))}
        </g>

        <g className="st-enter" style={{ animationDelay: '0.1s' }}>
          <text x="560" y="24" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--sage)">GESUNDER KINDMODUS</text>
          <g {...pillProps(gesundKind, 'kindmodus_gesund')}>
            <rect x="460" y="40" width="200" height="34" rx="17" fill="var(--sage)" opacity="0.32" stroke="var(--sage)" strokeWidth="1.5" />
            <text x="560" y="62" textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="12.5" fill="#fff">{gesundKind.name}</text>
          </g>
        </g>

        <g className="st-enter" style={{ animationDelay: '0.16s' }}>
          <text x="175" y="400" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--muted)">BEWÄLTIGUNGSMODI</text>
          {bewaeltigung.map((m, i) => (
            <g key={m.id} {...pillProps(m, 'bewaeltigungsmodi')}>
              <rect x="40" y={bewaeltigungPos[i]} width="270" height="28" rx="14" fill="var(--muted)" opacity="0.32" stroke="var(--muted)" strokeWidth="1.5" />
              <text x="175" y={bewaeltigungPos[i] + 19} textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="12" fill="#fff">{m.name}</text>
            </g>
          ))}
        </g>

        <g className="st-enter" style={{ animationDelay: '0.22s' }}>
          <text x="585" y="400" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--accent)">ELTERNMODI</text>
          {eltern.map((m, i) => (
            <g key={m.id} {...pillProps(m, 'elternmodi')}>
              <rect x="450" y={elternPos[i]} width="270" height="28" rx="14" fill="var(--accent)" opacity="0.34" stroke="var(--accent)" strokeWidth="1.5" />
              <text x="585" y={elternPos[i] + 19} textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="12" fill="#fff">{m.name}</text>
            </g>
          ))}
        </g>

        <g className="st-enter" style={{ animationDelay: '0.3s' }}>
          <text x="380" y="212" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="11.5" letterSpacing="0.04em" fill="var(--secondary)">GESTÄRKT DURCH</text>
          {eigenschaftenLinks.map((e, i) => (
            <g key={e.id} {...pillProps(e, 'gesunder_erwachsener')}>
              <rect x="20" y={eigenschaftenY[i]} width="280" height="36" rx="18" fill="var(--primary)" opacity="0.3" stroke="var(--primary)" strokeWidth="1.5" />
              <text x="160" y={eigenschaftenY[i] + 23} textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="13" fill="#fff">{e.name}</text>
            </g>
          ))}
          {eigenschaftenRechts.map((e, i) => {
            const istTurbo = e.id === 'turbo';
            return (
              <g key={e.id} {...pillProps(e, 'gesunder_erwachsener')}>
                <rect
                  x="460" y={eigenschaftenY[i]} width="280" height="36" rx="18"
                  fill={istTurbo ? 'var(--secondary)' : 'var(--primary)'} opacity={istTurbo ? 0.4 : 0.3}
                  stroke={istTurbo ? 'var(--secondary)' : 'var(--primary)'} strokeWidth={istTurbo ? 2 : 1.5}
                />
                <text x="600" y={eigenschaftenY[i] + 23} textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight={istTurbo ? 700 : 600} fontSize="13" fill="#fff">
                  {istTurbo ? '✦ ' + e.name : e.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div style={{ minHeight: '3.6rem', padding: '0.9rem 1.2rem 0', textAlign: 'center' }}>
        {aktiv ? (
          <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '1.18rem', lineHeight: 1.55, color: '#fff', margin: 0, maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            <strong style={{ fontStyle: 'normal' }}>{aktiv.name}:</strong> {aktiv.beschreibung}
          </p>
        ) : (
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            Auf einen Modus klicken für die Kurzbeschreibung.
          </p>
        )}
      </div>
    </>
  );
}

// Kleine, wiederverwendete Karte für die Übersicht: weißer Hintergrund, dünner
// Rahmen, wie die übrigen Karten der App, hier bewusst inline gestylt statt
// neuer globaler CSS-Klassen, gleiche Konvention wie der Hero oben in dieser Datei.
function UeCard({ titel, text, farbe }){
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid #e3e7e6',
      borderLeft: '4px solid ' + (farbe || 'var(--sage)'), borderRadius: '8px',
      padding: '0.9rem 1.05rem', minHeight: '100%'
    }}>
      <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)', margin: '0 0 0.3rem' }}>{titel}</p>
      {text && <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '0.82rem', lineHeight: 1.5, color: 'var(--muted-text)', margin: 0 }}>{text}</p>}
    </div>
  );
}

function UeGrid({ children, min }){
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${min || 190}px, 1fr))`, gap: '0.8rem' }}>
      {children}
    </div>
  );
}

// Native Nachbildung der hochgeladenen Infografik, unterhalb des interaktiven
// Modus-Modells: Ziel, Grundbedürfnisse, Bewältigungsstile, therapeutische
// Haltung, zentrale Interventionen, hypnosystemische Ergänzungen, Weg der
// Veränderung, Leitgedanken. Bewusst getrennt von der Pfeilleiste im Header
// (andere fünf Schritte, siehe prozessleiste vs. weg_der_veraenderung in
// schema-therapie.json), keine Vermischung der beiden Fünf-Schritte-Modelle.
function SchemaUebersicht(){
  return (
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 1.5rem 0.6rem' }}>

      <div style={{
        background: 'linear-gradient(120deg, #fff 0%, #f2f7f6 100%)', border: '1px solid var(--sage)',
        borderLeft: '5px solid var(--primary)', borderRadius: '10px', padding: '1.2rem 1.4rem', marginBottom: '1.6rem'
      }}>
        <p className="fokus-section-label" style={{ margin: '0 0 0.4rem' }}>Ziel</p>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '1rem', lineHeight: 1.6, margin: 0, color: 'var(--ink)' }}>{UE.ziel}</p>
      </div>

      <p className="fokus-section-label">Grundbedürfnisse</p>
      <div style={{ marginBottom: '1.8rem' }}>
        <UeGrid>
          {UE.grundbeduerfnisse.map(g => <UeCard key={g.id} titel={g.name} text={g.beschreibung} farbe="var(--primary)" />)}
        </UeGrid>
      </div>

      <p className="fokus-section-label">3 Bewältigungsstile</p>
      <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '0.78rem', color: 'var(--muted-text)', margin: '-0.4rem 0 0.7rem' }}>{UE.bewaeltigungsstile_hinweis}</p>
      <div style={{ marginBottom: '1.8rem' }}>
        <UeGrid min={220}>
          {UE.bewaeltigungsstile.map(b => <UeCard key={b.id} titel={b.name} text={b.beschreibung} farbe="var(--muted)" />)}
        </UeGrid>
      </div>

      <p className="fokus-section-label">Therapeutische Haltung</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1.8rem' }}>
        {UE.therapeutische_haltung.map(t => (
          <span key={t.id} style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '0.85rem',
            color: '#fff', background: 'var(--sage)', borderRadius: '999px', padding: '0.4rem 0.95rem'
          }}>{t.name}</span>
        ))}
      </div>

      <p className="fokus-section-label">Zentrale Interventionen</p>
      <div style={{ marginBottom: '1.8rem' }}>
        <UeGrid>
          {UE.zentrale_interventionen.map(z => <UeCard key={z.id} titel={z.name} text={z.beschreibung} farbe="var(--accent)" />)}
        </UeGrid>
      </div>

      <p className="fokus-section-label">Hypnosystemische Ergänzungen</p>
      <div style={{ marginBottom: '1.8rem' }}>
        <UeGrid>
          {UE.hypnosystemische_ergaenzungen.map(h => <UeCard key={h.id} titel={h.name} text={h.beschreibung} farbe="var(--terracotta)" />)}
        </UeGrid>
      </div>

      <p className="fokus-section-label">Der Weg der Veränderung</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '0.5rem', marginBottom: '1.8rem' }}>
        {UE.weg_der_veraenderung.map((w, i) => (
          <div key={w.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              background: 'var(--card-bg)', border: '1px solid #e3e7e6', borderRadius: '8px',
              padding: '0.7rem 0.9rem', minWidth: '150px'
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'var(--primary)',
                color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.78rem', marginRight: '0.5rem'
              }}>{i + 1}</span>
              <strong style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.88rem', color: 'var(--ink)' }}>{w.name}</strong>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '0.78rem', color: 'var(--muted-text)', margin: '0.25rem 0 0 2rem' }}>{w.beschreibung}</p>
            </div>
            {i < UE.weg_der_veraenderung.length - 1 && (
              <span style={{ color: 'var(--sage)', fontSize: '1.3rem', lineHeight: 1 }}>→</span>
            )}
          </div>
        ))}
      </div>

      <p className="fokus-section-label">Leitgedanken</p>
      <ul style={{ listStyle: 'none', margin: '0 0 1.8rem', padding: 0, display: 'grid', gap: '0.5rem' }}>
        {UE.leitgedanken.map((l, i) => (
          <li key={i} style={{
            fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink)',
            paddingLeft: '1.4rem', position: 'relative'
          }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--terracotta)' }}>♥</span>
            {l}
          </li>
        ))}
      </ul>

      <div style={{
        background: 'linear-gradient(135deg, var(--sage) 0%, var(--primary) 130%)', borderRadius: '14px',
        padding: '1.4rem 1.6rem', textAlign: 'center'
      }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.5, color: '#fff', margin: 0 }}>
          {UE.schlusssatz}
        </p>
      </div>
    </div>
  );
}

function SchemaCard({ item, isOpen, onOpen }){
  return (
    <div
      className={'card ' + DOMAENEN_CLASS[item.domaene] + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(item.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(item.id); } }}
    >
      <div className="card-top">
        <div className="muster-name">
          {item.name}
          <span className={'kat-badge ' + DOMAENEN_CLASS[item.domaene]}>{item.domaene}</span>
        </div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span>{item.beschreibung}</span>
      </div>
    </div>
  );
}

function SchemaModal({ item, onClose, onPrev, onNext, positionLabel }){
  const modalRef = useRef(null);

  useEffect(() => {
    const onKey = e => {
      if(e.key === 'Escape') onClose();
      if(e.key === 'ArrowLeft' && onPrev) onPrev();
      if(e.key === 'ArrowRight' && onNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if(!item) return null;

  return (
    <div className="card-modal-backdrop" onClick={onClose}>
      <div
        className="card-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <div className="card-modal-nav">
            <button className="card-modal-nav-btn" onClick={onPrev} aria-label="Voriges Schema">‹</button>
            {positionLabel && <span className="card-modal-position">{positionLabel}</span>}
            <button className="card-modal-nav-btn" onClick={onNext} aria-label="Nächstes Schema">›</button>
          </div>
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>
        <ScrollTopButton containerRef={modalRef} />

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">
              {item.name}
              <span className={'kat-badge ' + DOMAENEN_CLASS[item.domaene]}>{item.domaene}</span>
            </div>
          </div>
          <div className="card-modal-body">
            <div className="details">
              <div className="block">
                <h4>Kurzbeschreibung</h4>
                <p>{item.beschreibung}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SchemaTherapie({ initialOpenId }){
  const [query, setQuery] = useState('');
  const [domaene, setDomaene] = useState(null);
  const [openId, setOpenId] = useState(initialOpenId || null);

  const gefiltert = useMemo(
    () => DATA.schemata.filter(s => matches(s, query) && (!domaene || s.domaene === domaene)),
    [query, domaene]
  );

  const offenesItem = openId ? DATA.schemata.find(s => s.id === openId) : null;
  const navIndex = offenesItem ? gefiltert.findIndex(s => s.id === offenesItem.id) : -1;

  function open(id){ setOpenId(id); }
  function close(){ setOpenId(null); }
  function blaettern(richtung){
    if(gefiltert.length === 0 || navIndex === -1) return;
    const naechster = (navIndex + richtung + gefiltert.length) % gefiltert.length;
    setOpenId(gefiltert[naechster].id);
  }

  return (
    <>
      <div className="fokus-hero" style={{ padding: '1.6rem 1.4rem' }}>
        <p className="eyebrow">{DATA.meta.titel}</p>
        <h2 style={{ fontSize: '1.35rem' }}>{DATA.meta.untertitel}</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.88rem', lineHeight: 1.6, margin: '0.6rem 0 0', maxWidth: '760px', opacity: 0.92 }}>
          {DATA.meta.hinweis}
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.5, textAlign: 'center', margin: '1.3rem auto 0', maxWidth: '820px', color: '#fff' }}>
          Modus-Modell, vereinfacht. Ziel ist ein gestärkter gesunder Erwachsener, der Kindanteile würdigt und Eltern-/Bewältigungsmodi beruhigt statt sie auszuspielen.
        </p>
        <ProzessLeiste />
        <div style={{ maxWidth: '1080px', width: '100%', margin: '1.2rem auto 0' }}>
          <ModusModellGrafik />
        </div>
      </div>

      <SchemaUebersicht />

      <div className="picker-wrap">
        <p className="picker-label">Schema-Therapie · nach Domäne filtern</p>
        <div className="chip-grid">
          <button className={'chip reset' + (!domaene ? ' active' : '')} onClick={() => { setDomaene(null); setOpenId(null); }}>Alle zeigen</button>
          {DATA.meta.domaenen.map(d => (
            <button
              key={d}
              className={'chip kat-chip ' + DOMAENEN_CLASS[d] + (domaene === d ? ' active' : '')}
              onClick={() => { setDomaene(domaene === d ? null : d); setOpenId(null); }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Schema suchen, z. B. Verlassenheit, Perfektionismus …"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="count">{gefiltert.length} / {DATA.schemata.length}</span>
        </div>
      </div>

      <main>
        {gefiltert.length === 0 ? (
          <div className="empty">Keine Treffer. Anderen Begriff versuchen oder Domäne zurücksetzen.</div>
        ) : (
          <div className="grid">
            {gefiltert.map(item => (
              <SchemaCard key={item.id} item={item} isOpen={openId === item.id} onOpen={open} />
            ))}
          </div>
        )}
      </main>

      {offenesItem && (
        <SchemaModal
          key={offenesItem.id}
          item={offenesItem}
          onClose={close}
          onPrev={() => blaettern(-1)}
          onNext={() => blaettern(1)}
          positionLabel={navIndex !== -1 ? `${navIndex + 1} / ${gefiltert.length}` : null}
        />
      )}
    </>
  );
}
