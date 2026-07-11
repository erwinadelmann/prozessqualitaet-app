import DATA from '../data/act-defusion.json';

export default function ACTDefusion(){
  return (
    <main className="up-main">
      <div className="up-hero">
        <p className="eyebrow">{DATA.meta.titel}</p>
        <h2>{DATA.meta.untertitel}</h2>
      </div>

      <p className="up-hinweis">{DATA.meta.hinweis}</p>

      <div className="empty">Inhalte folgen. Sobald der Text da ist, entstehen hier dieselben aufklappbaren Karten wie bei EMDR und dem Utilisationsprozess.</div>
    </main>
  );
}
