/* /frontend/src/pages/RoomPage.jsx */
import { colors, shadows, fonts } from "../theme";

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Tag } from "antd";
import MainLayout from "../layout/MainLayout";

const { Title, Text } = Typography;

function getInitials(name) {
  return name.trim().split(" ").map((w) => w[0]?.toUpperCase()).slice(0, 2).join("");
}

function PlayerCard({ name, ready = false }) {
  const initials = getInitials(name);
  return (
    <div
      style={{
        background: ready ? "#e8f1fb" : "#f5f5f5",
        border: ready ? "2px solid #74abdf" : "2px dashed #ccc",
        borderRadius: 16,
        padding: "24px 20px",
        width: 180,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: ready ? "#74abdf" : "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
          fontSize: 22,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "FWC26, sans-serif",
        }}
      >
        {initials || "?"}
      </div>
      <Text
        style={{
          fontSize: 16,
          display: "block",
          marginBottom: 8,
          color: ready ? colors.primary : "#aaa",
          fontFamily: "FWC26, sans-serif",
        }}
      >
        {name}
      </Text>
      <Tag
        style={{
          background: ready ? colors.primary : "transparent",
          border: ready ? "none" : "1px solid #ccc",
          color: ready ? "#fff" : "#aaa",
          fontFamily: "FWC26, sans-serif",
        }}
      >
        {ready ? "✓ Listo" : "Esperando..."}
      </Tag>
    </div>
  );
}

export default function RoomPage() {
  const { code } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const name = state?.name || "Jugador";

  const handlePlay = () => {
    navigate(`/game/${code}`, { state: { name } });
  };

  return (
    <MainLayout>
      <div style={{ textAlign: "center" }}>
        <Text
          style={{
            display: "block",
            fontFamily: "FWC26, sans-serif",
            color: colors.primary,
            fontSize: 14,
            letterSpacing: 6,
            marginBottom: 4,
          }}
        >
          SALA
        </Text>
        <Title
          style={{
            fontFamily: "FWC26, sans-serif",
            fontSize: 56,
            color: colors.primary,
            textShadow: "2px 2px 0 #74abdf",
            margin: "0 0 40px",
            letterSpacing: 4,
          }}
        >
          {code}
        </Title>

        <div style={{ display: "flex", gap: 32, justifyContent: "center", alignItems: "center", marginBottom: 48 }}>
          <PlayerCard name={name} ready={true} />
          <Title level={3} style={{ margin: 0, color: "#ccc", fontFamily: "FWC26, sans-serif" }}>
            VS
          </Title>
          <PlayerCard name="Esperando..." ready={false} />
        </div>

        <Button
          size="large"
          onClick={handlePlay}
          style={{
            fontFamily: "FWC26, sans-serif",
            fontSize: 22,
            height: 60,
            paddingInline: 56,
            background: colors.secondary,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            boxShadow: shadows.secondary,
            letterSpacing: 2,
          }}
        >
          ⚽ ¡A JUGAR!
        </Button>
      </div>
    </MainLayout>
  );
}