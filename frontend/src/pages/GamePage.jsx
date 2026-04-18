/* /frontend/src/pages/GamePage.jsx */
import { colors, shadows, fonts } from "../theme";

import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, Input, Typography, Tag } from "antd";
import MainLayout from "../layout/MainLayout";
import Randomizer from "../components/Randomizer";

const { Title, Text } = Typography;

const CATEGORIES = [
  "País", "Ciudad", "Animal", "Fruta/Verdura",
  "Jugador de fútbol", "Selección", "Nombre", "Marca",
];

const ROUNDS_TOTAL = 3;

const fwc = { fontFamily: "FWC26, sans-serif" };

function useTimer(seconds, onEnd) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef(null);

  const start = () => {
    setTimeLeft(seconds);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(intervalRef.current); onEnd(); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const stop = () => clearInterval(intervalRef.current);
  useEffect(() => () => clearInterval(intervalRef.current), []);

  return { timeLeft, start, stop };
}

export default function GamePage() {
  const { code } = useParams();
  const { state } = useLocation();
  const name = state?.name || "Jugador";

  const [phase, setPhase] = useState("spinning"); // spinning | playing | results
  const [letter, setLetter] = useState("?");
  const [round, setRound] = useState(1);
  const [answers, setAnswers] = useState({});

  const timerRef = useRef(null);

  const handleTimeUp = () => handleStop();

  const { timeLeft, start: timerStart, stop: timerStop } = useTimer(60, handleTimeUp);

  useEffect(() => { timerRef.current = { start: timerStart, stop: timerStop }; }, [timerStart, timerStop]);

  // El Randomizer llama onPlay con la letra elegida
  const handlePlay = (chosenLetter) => {
    setLetter(chosenLetter);
    setPhase("playing");
    timerRef.current.start();
  };

  const handleStop = () => {
    timerRef.current?.stop();
    setPhase("results");
  };

  const handleNext = () => {
    setRound((r) => r + 1);
    setAnswers({});
    setPhase("spinning");
  };

  const timerColor = timeLeft > 30 ? colors.primary : timeLeft > 10 ? "#ecab1c" : "#e74c3c";

  return (
    <MainLayout>
      <div style={{ textAlign: "center", width: "100%", maxWidth: 700 }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <Text style={{ ...fwc, color: colors.secondary, fontSize: 16, letterSpacing: 3 }}>
            SALA {code}
          </Text>
          <Tag style={{ ...fwc, background: colors.secondary, border: "none", color: "#fff", fontSize: 16, padding: "3px 16px" }}>
            Ronda {round}/{ROUNDS_TOTAL}
          </Tag>
        </div>

        {/* FASE: GIRANDO — muestra el Randomizer */}
        {phase === "spinning" && (
          <div style={{ padding: "40px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <Text style={{ ...fwc, color: colors.primary, fontSize: 20, letterSpacing: 4 }}>
              SORTEANDO LETRA...
            </Text>
            <Randomizer onPlay={handlePlay} />
          </div>
        )}

        {/* FASE: JUGANDO */}
        {phase === "playing" && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 32 }}>
              <div style={{ fontSize: 100, ...fwc, color: colors.primary, lineHeight: 1 }}>
                {letter}
              </div>
              <div style={{ fontSize: 52, ...fwc, color: timerColor, minWidth: 70, textAlign: "left", transition: "color 0.5s" }}>
                {timeLeft}s
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    padding: "10px 14px",
                    border: "1px solid #d0e4f5",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <Text style={{ ...fwc, color: colors.primary, fontSize: 15, letterSpacing: 1 }}>
                    {cat}
                  </Text>
                  <Input
                    placeholder={`Con ${letter}...`}
                    value={answers[cat] || ""}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [cat]: e.target.value }))}
                    style={{
                      border: "none",
                      borderBottom: "1.5px solid #d0e4f5",
                      borderRadius: 0,
                      padding: "2px 0",
                      ...fwc,
                      fontSize: 17,
                      color: colors.primary,
                      background: "transparent",
                    }}
                  />
                </div>
              ))}
            </div>

            <Button
              size="large"
              onClick={handleStop}
              style={{
                ...fwc,
                fontSize: 22,
                height: 56,
                paddingInline: 52,
                boxShadow: "#681414",
                background: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                letterSpacing: 2,
              }}
            >
              ¡SILBATAZO!
            </Button>
          </>
        )}

        {/* FASE: RESULTADOS */}
        {phase === "results" && (
          <>
            <Title style={{ ...fwc, color: colors.primary, fontSize: 52, marginBottom: 24 }}>
              Letra: {letter}
            </Title>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 32 }}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    padding: "10px 14px",
                    border: answers[cat] ? "1.5px solid #74abdf" : "1.5px solid #f0c0c0",
                    textAlign: "left",
                  }}
                >
                  <Text style={{ ...fwc, color: colors.primary, fontSize: 13, letterSpacing: 1, display: "block" }}>
                    {cat}
                  </Text>
                  <Text style={{ ...fwc, fontSize: 18, color: answers[cat] ? colors.primary : "#ccc" }}>
                    {answers[cat] || "— sin respuesta —"}
                  </Text>
                </div>
              ))}
            </div>

            {round < ROUNDS_TOTAL ? (
              <Button
                size="large"
                onClick={handleNext}
                style={{
                  ...fwc,
                  fontSize: 20,
                  height: 56,
                  paddingInline: 52,
                  background: colors.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  boxShadow: "0 4px 0 #0d3d6e",
                  letterSpacing: 2,
                }}
              >
                Siguiente ronda →
              </Button>
            ) : (
              <>
                <Title style={{ ...fwc, color: colors.primary, fontSize: 40 }}>
                  🏆 ¡Fin del juego!
                </Title>
                <Button
                  size="large"
                  onClick={() => window.location.href = "/"}
                  style={{
                    ...fwc,
                    fontSize: 20,
                    height: 56,
                    paddingInline: 52,
                    background: colors.secondary,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    boxShadow: "0 4px 0 #3a6fa0",
                  }}
                >
                  Volver al menú
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}