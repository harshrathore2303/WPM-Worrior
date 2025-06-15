import { useState, useEffect, useRef } from "react";
// import "./Speed.css";
import {
  easySentences,
  hardSentences,
  mediumSentences,
} from "../assets/sentences";
import { motion } from "motion/react";

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
  const [difficulty, setDifficulty] = useState("Easy");
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
    console.log(difficulty);
    if (difficulty === "Easy") {
      return easySentences[Math.floor(Math.random() * easySentences.length)];
    } else if (difficulty === "Medium") {
      return mediumSentences[
        Math.floor(Math.random() * mediumSentences.length)
      ];
    } else if (difficulty === "Hard") {
      return hardSentences[Math.floor(Math.random() * hardSentences.length)];
    } else {
      const letters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=123456789".split(
          ""
        );

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
    }
  };

  useEffect(() => {
    setText(getRandomText());
  }, [difficulty]);

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
    <div className="outer-container min-h-screen bg-base-300 py-10 px-4">
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-base-content">
        {/* Test Your Typing Speed! */}
        {Array.from("Test Your Typing Speed!!").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`inline-block ${char === " " ? "w-[0.5ch]" : ""}`}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-6 md:py-10 rounded-2xl bg-base-200 space-y-6"
      >
        <div className="bg-base-100 rounded-md p-4 md:p-6 text-lg sm:text-xl md:text-2xl leading-relaxed font-mono text-base-content tracking-wide overflow-x-auto">
          {text.split("").map((char, i) => {
            let className = "";
            if (i < input.length) {
              className = input[i] === char ? "text-success" : "text-error";
            } else if (i === input.length) {
              className = "border-b-2 border-base-content";
            } else {
              className = "text-base-content opacity-50";
            }

            const motionClass =
              input.length === i
                ? {
                    initial: { scale: 1.2 },
                    animate: { scale: 1 },
                    transition: { duration: 0.1 },
                  }
                : {};

            return (
              <motion.span
                key={i}
                className={`${className} px-[1px]`}
                {...motionClass}
              >
                {char}
              </motion.span>
            );
          })}
        </div>

        <textarea
          className="textarea textarea-bordered w-full text-base textarea-xl sm:text-lg p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg resize-none bg-base-100 text-base-content md:h-36"
          ref={textRef}
          name="type"
          id="type"
          value={input}
          onChange={handleInput}
          onPaste={(e) => e.preventDefault()}
          onKeyDown={handleKeyDown}
          onSelect={handleSelect}
          onContextMenu={(e) => e.preventDefault()}
          disabled={time === 0}
          placeholder="Start typing the sentence above..."
        ></textarea>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-base-content">
          <div className="stat bg-base-100 p-4 rounded-box shadow border border-base-300">
            <div className="stat-title">Time Left</div>
            <div className="stat-value text-primary">{time}s</div>
          </div>
          <div className="stat bg-base-100 p-4 rounded-box shadow border border-base-300">
            <div className="stat-title">WPM</div>
            <div className="stat-value text-secondary">{wpm}</div>
          </div>
          <div className="stat bg-base-100 p-4 rounded-box shadow border border-base-300">
            <div className="stat-title">Best WPM</div>
            <div className="stat-value text-success">{bestWpm}</div>
          </div>
          <div className="stat bg-base-100 p-4 rounded-box shadow border border-base-300">
            <div className="stat-title">Accuracy</div>
            <div className="stat-value text-warning">{accuracy}%</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
          <motion.select
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="select select-bordered w-full sm:w-auto max-w-xs"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Extremely Hard</option>
          </motion.select>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="btn btn-primary px-6 py-2 text-lg w-full sm:w-auto max-w-xs"
          >
            Restart
          </motion.button>
        </div>
      </motion.main>
    </div>
  );
}
