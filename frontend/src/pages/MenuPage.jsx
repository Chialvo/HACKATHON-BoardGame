/* /frontend/src/pages/MenuPage.jsx */
import { colors, shadows, fonts } from "../theme";

import { useState } from "react";
import { Button, Typography, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const { Title, Text } = Typography;

export default function MenuPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const open = (type) => { setMode(type); setStep(0); setName(""); setRoom(""); };
  const close = () => { setMode(null); setStep(0); };
  const next = () => { if (!name.trim()) return; setStep(1); };
  const submit = () => {
    if (!room.trim()) return;
    navigate(`/room/${room.toUpperCase()}`, { state: { name } });
  };

  return (
    <MainLayout>
      <div style={{ textAlign: "center" }}>

        <div style={{ fontSize: 64, marginBottom: 8 }}>🏆</div>

        <Title
          style={{
            fontFamily: "FWC26, sans-serif",
            color: colors.primary,
            textShadow: "3px 3px 0px #74abdf, 6px 6px 0px rgba(0,0,0,0.08)",
            margin: 0,
            fontSize: 72,
            lineHeight: 1,
          }}
        >
          TUTTINETA
        </Title>

        <Text
          style={{
            display: "block",
            fontFamily: "FWC26, sans-serif",
            color: colors.primary,
            fontSize: 18,
            letterSpacing: 6,
            marginBottom: 48,
          }}
        >
          ★ Mundial 2026 ★
        </Text>

        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Button
            type="primary"
            size="large"
            style={{
              fontFamily: "FWC26, sans-serif",
              fontSize: 18,
              height: 52,
              paddingInline: 32,
              background: colors.primary,
              border: "none",
              boxShadow: shadows.primary,
            }}
            onClick={() => open("create")}
          >
            Crear sala
          </Button>
          <Button
            size="large"
            style={{
              fontFamily: "FWC26, sans-serif",
              fontSize: 18,
              height: 52,
              paddingInline: 32,
              background: colors.secondary,
              color: "#fff",
              border: "none",
              boxShadow: shadows.secondary,
            }}
            onClick={() => open("join")}
          >
            Unirse a sala
          </Button>
        </div>

        <Modal
          open={!!mode}
          onCancel={close}
          footer={null}
          centered
          width={400}
          styles={{
            content: {
              background: "#ffffff",
              border: "2px solid #74abdf",
              borderRadius: 16,
            },
            mask: { backdropFilter: "blur(4px)" },
          }}
        >
          <div style={{ width: "100%", overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                width: "200%",
                transform: `translateX(${step === 0 ? "0%" : "-50%"})`,
                transition: "transform 0.35s ease-in-out",
              }}
            >
              {/* STEP 1 */}
              <div style={{ width: "50%", flexShrink: 0, boxSizing: "border-box", padding: "8px 20px 20px" }}>
                <Title level={4} style={{ color: colors.primary, fontFamily: "FWC26, sans-serif" }}>
                  ¿Cómo te llamás?
                </Title>
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onPressEnter={next}
                  size="large"
                  style={{ width: "100%", bordercolor: colors.primary }}
                />
                <Button
                  type="primary"
                  block
                  size="large"
                  style={{
                    marginTop: 15,
                    fontFamily: "FWC26, sans-serif",
                    fontSize: 16,
                    height: 46,
                    background: colors.primary,
                    border: "none",
                  }}
                  onClick={next}
                  disabled={!name.trim()}
                >
                  Continuar →
                </Button>
              </div>

              {/* STEP 2 */}
              <div style={{ width: "50%", flexShrink: 0, boxSizing: "border-box", padding: "8px 20px 20px" }}>
                <Title level={4} style={{ color: colors.primary, fontFamily: "FWC26, sans-serif" }}>
                  {mode === "create" ? "Nombre de sala" : "¿A qué sala entrás?"}
                </Title>
                <Input
                  placeholder="Nombre de sala"
                  value={room}
                  onChange={(e) => setRoom(e.target.value.toUpperCase())}
                  onPressEnter={submit}
                  size="large"
                  style={{
                    width: "100%",
                    bordercolor: colors.primary,
                    letterSpacing: 2,
                    fontFamily: "FWC26, sans-serif",
                    fontSize: 18,
                  }}
                />
                <Button
                  type="primary"
                  block
                  size="large"
                  style={{
                    marginTop: 15,
                    fontFamily: "FWC26, sans-serif",
                    fontSize: 16,
                    height: 46,
                    background: colors.primary,
                    border: "none",
                  }}
                  onClick={submit}
                  disabled={!room.trim()}
                >
                  {mode === "create" ? "¡Crear!" : "¡Entrar!"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
}