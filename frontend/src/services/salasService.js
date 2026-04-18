// src/services/salasService.js

import config from "../config";

const BASE = `${config.API_URL}/salas`;

const salasService = {

  // GET /salas/:code — obtener sala por código
  getSala: async (code) => {
    const res = await fetch(`${BASE}/${code}`);
    if (!res.ok) throw new Error(`Error al obtener sala: ${res.status}`);
    return res.json();
  },

  // POST /salas — crear sala nueva
  // body: { code, playerName }
  createSala: async ({ code, playerName }) => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, playerName }),
    });
    if (!res.ok) throw new Error(`Error al crear sala: ${res.status}`);
    return res.json();
  },

  // PUT /salas/:code/join — unirse a sala existente
  // body: { playerName }
  joinSala: async (code, { playerName }) => {
    const res = await fetch(`${BASE}/${code}/join`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName }),
    });
    if (!res.ok) throw new Error(`Error al unirse a sala: ${res.status}`);
    return res.json();
  },

};

export default salasService;