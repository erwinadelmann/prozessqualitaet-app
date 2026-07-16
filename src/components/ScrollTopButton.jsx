import { useEffect, useState } from 'react';

// Kleiner, wiederverwendeter „Nach oben"-Button für die bildschirmfüllenden
// Detailansichten (Kartei, Methodenbox, Reframing). Erscheint erst, sobald im
// scrollbaren Modal-Container tatsächlich nach unten gescrollt wurde, damit er bei
// kurzen Inhalten nicht unnötig im Weg ist. containerRef muss auf das Element mit
// overflow-y:auto zeigen (aktuell immer .card-modal selbst).
export default function ScrollTopButton({ containerRef }){
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if(!el) return;
    function onScroll(){ setSichtbar(el.scrollTop > 400); }
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [containerRef]);

  if(!sichtbar) return null;

  return (
    <button
      className="card-modal-top-btn"
      onClick={() => containerRef.current && containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Nach oben"
      title="Nach oben"
    >
      ↑
    </button>
  );
}
