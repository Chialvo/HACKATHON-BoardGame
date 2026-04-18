/* /frontend/src/layout/MainLayout.jsx */

import { Layout } from "antd";

const { Content } = Layout;
import useBackgroundMusic from "../hooks/useBackgroundMusic";
// en MainLayout.jsx

// botón flotante

export default function MainLayout({ children }) {
  const { toggle } = useBackgroundMusic("/sounds/fondo.mp3", { volume: 0.3 });

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "transparent",
      }}
    >
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        {children}
        <button
  onClick={toggle}
  style={{
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 100,
    background: "#74abdf",
    border: "none",
    borderRadius: "50%",
    width: 44,
    height: 44,
    cursor: "pointer",
    fontSize: 20,
  }}
>
  🎵
</button>
      </Content>
    </Layout>
  );
}