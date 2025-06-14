import { useState, useEffect, useRef } from "react";
import "./Speed.css";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "React makes building interactive UIs painless.",
  "Accuracy is more important than speed.",
  "Measure twice, cut once.",
];

const TEST_DURATION = 60;
export default function Speed() {
  const [text, setText] = useState("");
  const [time, setTime] = useState(TEST_DURATION);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState();
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [bestWpm, setBestWpm] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const textRef = useRef();

  const handleInput = (e) => {
    const value = e.target.value;

    if (input.length === 0 && !startTime) {
      setStartTime(Date.now());
    }

    const newTypedChars = value.length - input.length;
    const updatedTotalTypedChars =
      totalTypedChars + (newTypedChars > 0 ? newTypedChars : 0);

    setInput(value);

    let correctChars = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) {
        correctChars++;
      }
    }

    const accuracyValue =
      value.length === 0
        ? 100
        : Math.round((correctChars / value.length) * 100);

    setAccuracy(accuracyValue);

    const now = Date.now();
    const elapsedMinutes = (now - startTime) / 60000;
    const charsCount = updatedTotalTypedChars;

    const calculatedWpm =
      elapsedMinutes > 0 ? Math.round(charsCount / 5 / elapsedMinutes) : 0;
    setWpm(calculatedWpm);

    if (newTypedChars > 0) {
      setTotalTypedChars(charsCount);
    }

    if (value.length === text.length) {
      setInput("");
      setText(getRandomText());
    }
  };
  const reset = () => {
    setInput("");
    setStartTime(undefined);
    setWpm(0);
    setAccuracy(0);
    setTime(TEST_DURATION);
    setText(getRandomText());
    textRef.current?.focus();
    setTotalTypedChars(0);
  };

  const handleKeyDown = (e) => {
    const forbiddenKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "Home",
      "End",
      "Backspace",
    ];

    if (
      (e.ctrlKey || e.metaKey) &&
      ["x", "v", "c", "a"].includes(e.key.toLowerCase())
    ) {
      e.preventDefault();
    }

    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSelect = (e) => {
    const textarea = e.target;
    textarea.selectionStart = textarea.value.length;
    textarea.selectionEnd = textarea.value.length;
  };

  // algo for random text
  const getRandomText = () => {
    const letters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const totalWords = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
    let str = "";

    for (let i = 0; i < totalWords; i++) {
      const wordLength = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
      let word = "";

      for (let j = 0; j < wordLength; j++) {
        const idx = Math.floor(Math.random() * letters.length);
        word += letters[idx];
      }

      str += word + " ";
    }

    return str.trim();
  };

  useEffect(() => {
    setText(getRandomText());
  }, []);

  useEffect(() => {
    if (!startTime) {
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (time === 0 && startTime) {
      const prevBest = localStorage.getItem("bestWpm");
      const best = prevBest ? parseInt(prevBest) : 0;

      if (wpm > best) {
        localStorage.setItem("bestWpm", wpm);
        setBestWpm(wpm);
      }
    }
  }, [wpm, time]);

  useEffect(() => {
    const prevBest = localStorage.getItem("bestWpm");
    if (prevBest) {
      setBestWpm(parseInt(prevBest));
    }
  }, []);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.selectionStart = input.length;
      textRef.current.selectionEnd = input.length;
    }
  }, [input]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  return (
    <div className="outer-container">
      <h1 className="heading">Test Your Typing Speed!!</h1>
      <main className="inner-container">
        <p className="sentence">
          {text.split("").map((char, i) => {
            let className = "";
            if (i < input.length) {
              className = input[i] === char ? "correct" : "incorrect";
            } else if (i === input.length) {
              className = "current";
            } else {
              className = "pending";
            }

            return (
              <span key={i} className={className}>
                {char}
              </span>
            );
          })}
        </p>
        <textarea
          ref={textRef}
          name="type"
          id="type"
          className="text"
          value={input}
          onChange={(e) => {
            handleInput(e);
          }}
          onPaste={(e) => e.preventDefault()}
          onKeyDown={handleKeyDown}
          onSelect={handleSelect}
          onContextMenu={(e) => e.preventDefault()}
          disabled={time === 0}
          placeholder="Start writing above sentence...."
        ></textarea>
        <p className="timer">Time Left: {time}s</p>
        <p className="wpm">WPM: {wpm}</p>
        <p className="best-wpm">Best WPM: {bestWpm}</p>
        <p className="accuracy">Accuracy: {accuracy}%</p>
        <button onClick={reset}>Restart</button>
      </main>
    </div>
  );
}
