"use client";

import { useEffect, useMemo, useState } from "react";

type Question = {
  id: number;
  topic: string;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1, topic: "Electrostatics",
    text: "Two point charges exert a force F on each other. If the distance between them is doubled, the new force is:",
    options: ["2F", "F/2", "F/4", "4F"],
    answer: 2,
    explanation: "By Coulomb’s law, F is proportional to 1/r². Doubling r makes the force F/4."
  },
  {
    id: 2, topic: "Current Electricity",
    text: "A 6 Ω resistor is connected across a 12 V ideal battery. The current is:",
    options: ["0.5 A", "2 A", "6 A", "72 A"],
    answer: 1,
    explanation: "Using Ohm’s law, I = V/R = 12/6 = 2 A."
  },
  {
    id: 3, topic: "Kinematics",
    text: "A body starts from rest and accelerates uniformly at 2 m/s² for 5 s. Its final speed is:",
    options: ["2.5 m/s", "5 m/s", "10 m/s", "20 m/s"],
    answer: 2,
    explanation: "Use v = u + at. Here u = 0, a = 2 m/s² and t = 5 s, so v = 10 m/s."
  },
  {
    id: 4, topic: "Waves",
    text: "In Young’s double-slit experiment, fringe width is β = λD/d. If D is doubled, β becomes:",
    options: ["β/2", "β", "2β", "4β"],
    answer: 2,
    explanation: "Fringe width is directly proportional to screen distance D, so doubling D doubles β."
  },
  {
    id: 5, topic: "Capacitance",
    text: "For a capacitor of capacitance C, the displacement current magnitude is related to changing voltage by:",
    options: ["C V", "C dV/dt", "V/C", "C dt/dV"],
    answer: 1,
    explanation: "Iₙ = ε₀ dΦE/dt. For an ideal capacitor, its magnitude equals the conduction current: I = C dV/dt."
  }
];

const LETTERS = ["A", "B", "C", "D"];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function Home() {
  const [screen, setScreen] = useState<"home" | "test" | "result">("home");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    if (screen !== "test" || submitted) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(timer);
          setSubmitted(true);
          setScreen("result");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [screen, submitted]);

  const result = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === undefined) return;
      if (answers[q.id] === q.answer) correct++;
      else wrong++;
    });
    const unanswered = QUESTIONS.length - correct - wrong;
    return { correct, wrong, unanswered, score: correct * 4 - wrong, total: QUESTIONS.length * 4 };
  }, [answers]);

  function startTest() {
    setAnswers({});
    setMarked([]);
    setCurrent(0);
    setSecondsLeft(10 * 60);
    setSubmitted(false);
    setScreen("test");
  }

  function submitTest() {
    if (submitted) return;
    setSubmitted(true);
    setScreen("result");
  }

  const question = QUESTIONS[current];

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setScreen("home"); }}>
          <span className="brand-mark">P</span>
          <span>Physics<span className="brand-light">Path</span></span>
        </a>
        <nav>
          <a href="#features" onClick={(e) => { if (screen !== "home") { e.preventDefault(); setScreen("home"); } }}>Features</a>
          <span className="demo-pill">DEMO VERSION</span>
        </nav>
      </header>

      {screen === "home" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">JEE · NEET · PHYSICS</p>
              <h1>Learn clearly.<br /><span>Practise smartly.</span></h1>
              <p className="hero-description">A simple starting point for your Physics learning platform. Take a timed MCQ test, review your score, and learn from every answer.</p>
              <div className="hero-actions">
                <button className="button primary" onClick={startTest}>Try sample test <span>→</span></button>
                <a className="button secondary" href="#features">Explore features</a>
              </div>
              <div className="hero-note"><span className="green-dot" /> No payment required · Sample test included</div>
            </div>
            <div className="hero-card">
              <div className="card-top"><span className="mini-label">SAMPLE MOCK TEST</span><span className="live-dot">● Live demo</span></div>
              <h3>Physics Practice Test</h3>
              <p className="muted">Mixed concepts · JEE/NEET level</p>
              <div className="stats-row">
                <div><strong>05</strong><span>Questions</span></div>
                <div><strong>10 min</strong><span>Duration</span></div>
                <div><strong>+4 / −1</strong><span>Marking</span></div>
              </div>
              <div className="progress-label"><span>Sample syllabus</span><span>5 topics</span></div>
              <div className="progress-track"><div /></div>
              <div className="topic-list"><span>Electrostatics</span><span>Current electricity</span><span>Kinematics</span><span>Waves</span></div>
            </div>
          </section>
          <section className="feature-section" id="features">
            <div className="section-heading"><p className="eyebrow">BUILT FOR LEARNING</p><h2>Your study space, in one place.</h2><p className="muted">Start small. Add courses, student accounts and saved results as the platform grows.</p></div>
            <div className="feature-grid">
              <article className="feature-card"><div className="feature-icon violet">◉</div><h3>Timed tests</h3><p>Question navigation, countdown timer, answer selection and review flags.</p></article>
              <article className="feature-card"><div className="feature-icon blue">✓</div><h3>Instant scoring</h3><p>Automatic +4/−1 scoring with correct, wrong and unanswered counts.</p></article>
              <article className="feature-card"><div className="feature-icon orange">↗</div><h3>Learn from errors</h3><p>After submitting, review correct answers and explanations for each question.</p></article>
            </div>
          </section>
          <footer>PhysicsPath · Starter project · Built for learning</footer>
        </>
      )}

      {screen === "test" && question && (
        <section className="test-layout">
          <div className="test-header">
            <div><p className="eyebrow">SAMPLE ASSESSMENT</p><h1>Physics Practice Test</h1><p className="muted">Choose one option for each question.</p></div>
            <div className={`timer ${secondsLeft < 60 ? "timer-warning" : ""}`}><span>TIME LEFT</span><strong>{formatTime(secondsLeft)}</strong></div>
          </div>
          <div className="test-columns">
            <div className="question-panel">
              <div className="question-meta"><span>QUESTION {current + 1} OF {QUESTIONS.length}</span><span className="topic-tag">{question.topic}</span></div>
              <h2>{question.text}</h2>
              <div className="options">
                {question.options.map((option, index) => (
                  <button key={option} className={`option ${answers[question.id] === index ? "selected" : ""}`} onClick={() => setAnswers((old) => ({ ...old, [question.id]: index }))}>
                    <span className="option-letter">{LETTERS[index]}</span><span>{option}</span>
                  </button>
                ))}
              </div>
              <div className="question-controls">
                <button className="button secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>← Previous</button>
                <button className={`button ${marked.includes(question.id) ? "review-active" : "secondary"}`} onClick={() => setMarked((old) => old.includes(question.id) ? old.filter((id) => id !== question.id) : [...old, question.id])}>
                  {marked.includes(question.id) ? "★ Marked for review" : "☆ Mark for review"}
                </button>
                <button className="button primary" onClick={() => current < QUESTIONS.length - 1 ? setCurrent((c) => c + 1) : submitTest()}>{current === QUESTIONS.length - 1 ? "Submit test" : "Next →"}</button>
              </div>
            </div>
            <aside className="palette-panel">
              <h3>Question palette</h3><p className="muted small">Select a question to move to it.</p>
              <div className="palette">
                {QUESTIONS.map((q, index) => (
                  <button key={q.id} aria-label={`Go to question ${index + 1}`} className={`palette-number ${current === index ? "active" : ""} ${answers[q.id] !== undefined ? "answered" : ""} ${marked.includes(q.id) ? "marked" : ""}`} onClick={() => setCurrent(index)}>{index + 1}</button>
                ))}
              </div>
              <div className="legend"><span><i className="legend-dot answered-dot" /> Answered</span><span><i className="legend-dot" /> Not answered</span><span><i className="legend-dot marked-dot" /> Review</span></div>
              <div className="palette-summary"><div><span>Answered</span><strong>{Object.keys(answers).length}</strong></div><div><span>For review</span><strong>{marked.length}</strong></div></div>
              <button className="button submit-wide" onClick={submitTest}>Submit test</button>
            </aside>
          </div>
        </section>
      )}

      {screen === "result" && (
        <section className="results-wrap">
          <div className="result-heading"><div className="result-check">✓</div><p className="eyebrow">TEST COMPLETED</p><h1>Your practice summary</h1><p className="muted">This is a demo result stored only in the current browser session.</p></div>
          <div className="score-card"><div><span className="muted">YOUR SCORE</span><div className="score-number">{result.score}<span> / {result.total}</span></div></div><div className="score-percent">{Math.round((result.score / result.total) * 100)}%<span>of total marks</span></div></div>
          <div className="result-stats"><div><span className="stat-icon green">✓</span><strong>{result.correct}</strong><span>Correct</span></div><div><span className="stat-icon red">×</span><strong>{result.wrong}</strong><span>Incorrect</span></div><div><span className="stat-icon gray">–</span><strong>{result.unanswered}</strong><span>Unanswered</span></div></div>
          <div className="review-heading"><h2>Answer review</h2><span className="muted small">Correct answer and explanation</span></div>
          <div className="review-list">
            {QUESTIONS.map((q, index) => {
              const chosen = answers[q.id];
              const isCorrect = chosen === q.answer;
              return <article key={q.id} className="review-card">
                <div className="review-card-top"><span>Q{index + 1} · {q.topic}</span><span className={`answer-status ${chosen === undefined ? "status-empty" : isCorrect ? "status-correct" : "status-wrong"}`}>{chosen === undefined ? "Not answered" : isCorrect ? "Correct" : "Incorrect"}</span></div>
                <h3>{q.text}</h3>
                <p className="answer-line">Your answer: <strong>{chosen === undefined ? "Not answered" : `${LETTERS[chosen]}. ${q.options[chosen]}`}</strong></p>
                <p className="answer-line correct-line">Correct answer: <strong>{LETTERS[q.answer]}. {q.options[q.answer]}</strong></p>
                <p className="explanation">{q.explanation}</p>
              </article>;
            })}
          </div>
          <div className="result-actions"><button className="button primary" onClick={startTest}>Try again</button><button className="button secondary" onClick={() => setScreen("home")}>Back to home</button></div>
        </section>
      )}
    </main>
  );
}
