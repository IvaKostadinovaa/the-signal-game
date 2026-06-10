export default function TitleScreen({ onStart }) {
  return (
    <main className="title-screen">
      <div className="title-screen__copy">
        <p className="eyebrow">NEWSPAPER SIM</p>
        <h1>The Signal</h1>
        <p className="title-screen__blurb">
          You are editor-in-chief at a struggling newsroom. Evaluate sources, balance pressure,
          and decide whether to publish, verify, or kill the story.
        </p>
        <button className="cta-button" type="button" onClick={onStart}>
          Begin Your Shift
        </button>
      </div>
      <div className="title-screen__teasers">
        <article>
          <strong>Breaking</strong>
          <p>Leaked councillor video. Deepfake risk. Hospital evacuation chaos.</p>
        </article>
        <article>
          <strong>Ready</strong>
          <p>Keep trust alive while satisfying attention and avoiding legal trouble.</p>
        </article>
      </div>
    </main>
  );
}
