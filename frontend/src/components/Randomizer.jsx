/* /frontend/src/components/Randomizer.jsx */
import { colors, shadows, fonts } from "../theme";

import { useState, useRef } from "react";
import { Button, Typography, Card, Modal } from "antd";
import confetti from "canvas-confetti";

const { Title } = Typography;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Randomizer({ onPlay }) {
    const [letter, setLetter] = useState("?");
    const [spinning, setSpinning] = useState(false);
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef(null);

    const shootConfetti = () => {
        const canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "9999";
        document.body.appendChild(canvas);

        const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
        myConfetti({ particleCount: 200, spread: 100, colors: ["#74abdf", "#ffffff", "#ecab1c"] });

        setTimeout(() => document.body.removeChild(canvas), 3000);
    };

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setOpen(false);

        // ~3-5 segundos: arranca rápido (50ms) y frena hasta 400ms
        // total de pasos ≈ suma de la serie => ~3-4s
        let speed = 50;
        const STEP = 18;
        const MAX_SPEED = 400;

        const run = () => {
            setLetter(letters[Math.floor(Math.random() * letters.length)]);
            speed += STEP;

            if (speed < MAX_SPEED) {
                timeoutRef.current = setTimeout(run, speed);
            } else {
                const final = letters[Math.floor(Math.random() * letters.length)];
                setLetter(final);
                setSpinning(false);
                setOpen(true);
                shootConfetti();
            }
        };

        run();
    };

    return (
        <>
            <Card
                style={{
                    textAlign: "center",
                    width: 320,
                    height: 260,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    border: "2px solid #d0e4f5",
                    borderRadius: 16,
                }}
            >
                <Title
                    style={{
                        fontSize: 140,
                        margin: 0,
                        fontFamily: "FWC26, sans-serif",
                        color: spinning ? colors.primary : "rgba(116,171,219,0.3)",
                        transition: "color 0.1s",
                    }}
                >
                    {letter}
                </Title>

                <Button
                    size="large"
                    onClick={spin}
                    disabled={spinning}
                    style={{
                        fontFamily: "FWC26, sans-serif",
                        fontSize: 18,
                        height: 46,
                        paddingInline: 32,
                        background: spinning ? undefined : colors.primary,
                        color: spinning ? undefined : "#fff",
                        border: "none",
                        boxShadow: spinning ? "none" : shadows.primary,
                    }}
                >
                    {spinning ? "Girando..." : "Girar"}
                </Button>
            </Card>

            <Modal
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                centered
                width={600}
                closable={false}
                styles={{
                    content: {
                        background: "#fff",
                        border: "3px solid #74abdf",
                        borderRadius: 20,
                    },
                    mask: { backdropFilter: "blur(4px)" },
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        minHeight: 380,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 24,
                    }}
                >
                    <Title
                        style={{
                            fontSize: 220,
                            margin: 0,
                            fontFamily: "FWC26, sans-serif",
                            color: colors.primary,
                            textShadow: "4px 4px 0 #74abdf",
                            lineHeight: 1,
                        }}
                    >
                        {letter}
                    </Title>

                    <Button
                        size="large"
                        onClick={() => { setOpen(false); onPlay?.(letter); }}
                        style={{
                            fontFamily: "FWC26, sans-serif",
                            fontSize: 22,
                            height: 58,
                            paddingInline: 56,
                            background: colors.primary,
                            color: "#fff",
                            border: "none",
                            borderRadius: 12,
                            boxShadow: shadows.primary,
                            letterSpacing: 2,
                        }}
                    >
                        ⚽ ¡A jugar!
                    </Button>
                </div>
            </Modal>
        </>
    );
}