// ══════════════════════════════════════════════════════════
// SPEECHES — Estructura comercial oficial (ESTRUCTURA_CHAT.xlsx)
// El orden de las categorías sigue el flujo de una llamada:
// Saludo → Sondeo → Cobertura → Oferta → Cierre → Datos →
// Contrato → Postventa → Despedida → Recordatorios → Objeciones.
// Usa el token {{AGENTE}} donde va el nombre del asesor.
// Los ids 6 y 7 (Abordamiento / Más económico) se generan
// dinámicamente según la zona configurada — ver generarSpeechesOferta().
// ══════════════════════════════════════════════════════════
const SPEECHES_BASE = [
  // ── SALUDO ──────────────────────────────────────────────
  {
    id: 1,
    categoria: "Saludo",
    titulo: "SALUDO",
    texto: `Hola 👋 soy {{AGENTE}} de MiFibra
Vi que estás buscando internet y justo tenemos promos activas hoy 🔥
📶 Fibra 100% estable
🚀 Instalación rápida
Tengo promociones disponibles según tu zona para darte la mejor promoción, ¿me compartes tu dirección o ubicación para instalación y DNI? `
  },

  // ── SONDEO ──────────────────────────────────────────────
  {
    id: 2,
    categoria: "Sondeo",
    titulo: "SONDEO PORTA",
    texto: `Para poder brindarle la mejor oferta disponible, ¿cuenta con algún otro servicio de internet para el hogar en su domicilio? Esta información nos ayudará a revisar promociones exclusivas que podrían aplicar para usted. 😊`
  },
  {
    id: 4,
    categoria: "Sondeo",
    titulo: "SONDEO NECESIDAD/USO",
    texto: `Para recomendarte el plan ideal, ¿cómo usas principalmente tu internet? 🤔
📺 Streaming | 💼 Trabajo/estudios | 🎮 Juegos | 📱 Redes sociales`
  },

  // ── COBERTURA ───────────────────────────────────────────
  {
    id: 3,
    categoria: "Cobertura",
    titulo: "REVALIDACIÓN COBERTURA PREVIA AL CHAT",
    texto: `¿Nos confirma si sería para esta misma ubicación, por favor?`
  },
  {
    id: 5,
    categoria: "Cobertura",
    titulo: "CONFIRMACIÓN DE COBERTURA",
    texto: `Gracias por su pronta respuesta, le confirmamos que ¡Sí tenemos cobertura en la dirección indicada!  😄`
  },
  {
    id: 18,
    categoria: "Cobertura",
    titulo: "SIN COBERTURA",
    texto: `¡Gracias por tu paciencia! 😊 Revisamos la cobertura y, por el momento, aún no contamos con disponibilidad de fibra óptica en tu zona. 📍

Estamos ampliando nuestra red para llegar a más hogares y esperamos poder atenderte muy pronto con la mejor experiencia de internet. 🚀✨ ¡Será un gusto contactarte cuando estemos disponibles en tu zona!`
  },

  // ── OFERTA (ids 6 "ABORDAMIENTO" y 7 "MÁS ECONOMICO" dinámicos por zona) ──

  // ── CIERRE ──────────────────────────────────────────────
  {
    id: 8,
    categoria: "Cierre",
    titulo: "CIERRE CON PROGRAMACIÓN",
    texto: `La instalación la programamos en un plazo de 48 horas.
Por tiempo limitado, bonificamos su instalación al 100%, no tendrá que pagar nada, ¡quedaría totalmente GRATIS!
`
  },

  // ── DATOS ───────────────────────────────────────────────
  {
    id: 9,
    categoria: "Datos",
    titulo: "SOLICITUD DATOS — Persona Natural (DNI)",
    texto: `A continuación te detallo los datos necesarios para programar tu instalación a la brevedad posible.

📍 FOTO DE LA FACHADA DE LA CASA.
📍 FOTO DEL DNI AL DERECHO Y REVES.
📍 CORREO:
📍 NÚMERO( de contacto):
📍DIRECCIÓN EXACTA (Escrita):
📍ÚLTIMA  FACTURA EMITIDA DEL OPERADOR ACTUAL`
  },
  {
    id: 10,
    categoria: "Datos",
    titulo: "SOLICITUD DATOS — Persona Jurídica (RUC)",
    texto: `Perfecto solo necesito estos datos para proceder con la contratación:

-RUC:
-Razón Social
-Nombre del Representante Legal
-Foto de DNI del Representante legal, por ambas caras(VIGENTE)
-correo electrónico
-foto de la fachada de su domicilio
-dirección exacta del domicilio
-referencia para llegar a su domicilio
-numero de celular para llamarle y realizar el contrato de voz
`
  },

  // ── CONTRATO ────────────────────────────────────────────
  {
    id: 11,
    categoria: "Contrato",
    titulo: "SOLICITUD LLAMADA",
    texto: `¿Estaría disponible menos de 4 minutos para la grabación?, es realmente rápido y corto.
`
  },
  {
    id: 12,
    categoria: "Contrato",
    titulo: "TERMINO DE REGISTRO",
    texto: `📝 ¡Listo! , hemos culminado con el proceso de contratación`
  },

  // ── POSTVENTA ───────────────────────────────────────────
  {
    id: 13,
    categoria: "Postventa",
    titulo: "ATENCIÓN AL CLIENTE POST INSTALACIÓN",
    texto: `Para atención al cliente una vez instalado el servicio se puede comunicar al 0800 74 007 , le pedimos estar atento a su número de contacto para la coordinación de su instalación.`
  },
  {
    id: 14,
    categoria: "Postventa",
    titulo: "MEDIOS DE PAGO — Servicio mensual",
    texto: `Le comento los lugares de pago. 💰
📎Agentes autorizados o banca móvil BBVA, BCP.
📎Yape - Ingresando a Yapear servicios, busca MIFIBRA( Todo junto) y luego su número de  DNI.`
  },
  {
    id: 15,
    categoria: "Postventa",
    titulo: "MEDIOS DE PAGO — Instalación",
    texto: `Medios de Pago de Instalación:

📍 Cuenta Corriente BBVA
Cala Servicios Integrales EIRL: 0011-0119-01000618-02

📍 Código de Cuenta Interbancaria (CCI)
Cala Servicios Integrales EIRL: 011-119-000100061802-53

📍 Yape
Cala Servicios Integrales EIRL: 977841857`
  },
  {
    id: 16,
    categoria: "Postventa",
    titulo: "DESPEDIDA VENTA",
    texto: `¡Le damos la bienvenida a la familia de MiFibra!✨`
  },

  // ── DESPEDIDA ───────────────────────────────────────────
  {
    id: 17,
    categoria: "Despedida",
    titulo: "DESPEDIDA ABANDONO",
    texto: `¡Te esperamos! 😊
Aún estás a tiempo de aprovechar nuestras promociones en fibra óptica. 🚀

📲 Escríbenos cuando gustes y con gusto retomaremos tu atención. Gracias por comunicarte con MiFibra 🌟 `
  },
  {
    id: 19,
    categoria: "Despedida",
    titulo: "DESPEDIDA - NO VENTA",
    texto: `¡Gracias por comunicarte con MiFibra!✨`
  },

  // ── SATURADO ────────────────────────────────────────────
  {
    id: 19.5,
    categoria: "Saturado",
    titulo: "ZONA SATURADA",
    texto: `¡Gracias por tu amable espera!  Revisamos la cobertura en la zona de instalación y te comento que por ahora, hemos alcanzado la capacidad máxima de instalaciones en el área.📍.

Seguimos expandiendo nuestra red de fibra óptica para llegar a más lugares del Perú y esperamos poder atenderte muy pronto con la mejor experiencia de internet.
Gracias por comunicarte con Mifibra.🚀✨`
  },

  // ── RECORDATORIOS (cada uno es una ficha independiente,
  //    así al elegir una categoría se pueden ver y copiar
  //    de una en una, no todas juntas) ─────────────────────
  { id: 20, categoria: "Recordatorios", titulo: "Recordatorio 1", texto: "¿Sigues en línea? 😊 Así puedo ayudarte a encontrar el mejor servicio de internet de MiFibra del Perú" },
  { id: 21, categoria: "Recordatorios", titulo: "Recordatorio 2", texto: "¿Te encuentras disponible? 😄 Quiero brindarte la mejor opción de internet según lo que necesitas." },
  { id: 22, categoria: "Recordatorios", titulo: "Recordatorio 3", texto: "¿Sigues conectado? 👀 Tengo una propuesta de internet que podría interesarte bastante." },
  { id: 23, categoria: "Recordatorios", titulo: "Recordatorio 4", texto: "¿Aún estás por aquí? ✨ Así puedo ayudarte con el plan de internet ideal para ti." },
  { id: 24, categoria: "Recordatorios", titulo: "Recordatorio 5", texto: "¿Me ayudas con unos minutitos más? 😊 Quiero ofrecerte la mejor alternativa de internet." },
  { id: 25, categoria: "Recordatorios", titulo: "Recordatorio 6", texto: "¿Seguimos en contacto? 😄 Estoy revisando qué plan te conviene más." },
  { id: 26, categoria: "Recordatorios", titulo: "Recordatorio 7", texto: "¿Continúas en línea? 🚀 Tengo opciones de internet con buena velocidad y estabilidad para ti." },
  { id: 27, categoria: "Recordatorios", titulo: "Recordatorio 8", texto: "¿Te puedo seguir ayudando? 💻 Quiero recomendarte el mejor plan disponible." },
  { id: 28, categoria: "Recordatorios", titulo: "Recordatorio 9", texto: "¿Aún sigues conectado(a)? 📶 Así puedo terminar de cotizarte la mejor opción." },
  { id: 29, categoria: "Recordatorios", titulo: "Recordatorio 10", texto: "¿Seguimos? 😄 Estoy validando promociones que podrían beneficiarte bastante." },
  { id: 30, categoria: "Recordatorios", titulo: "Recordatorio 11", texto: "¿Te encuentras disponible en este momento? ✨ Quiero brindarte una atención rápida y personalizada." },
  { id: 31, categoria: "Recordatorios", titulo: "Recordatorio 12", texto: "¿Sigues por aquí? 😁 No quiero que se te pase esta promoción disponible." },
  { id: 32, categoria: "Recordatorios", titulo: "Recordatorio 13", texto: "¿Puedo continuar ayudándote? 📡 Tengo información importante sobre los beneficios del servicio." },
  { id: 33, categoria: "Recordatorios", titulo: "Recordatorio 14", texto: "¿Aún interesado(a)? 😊 Estoy aquí para ayudarte a elegir el internet ideal para tu hogar." },
  { id: 34, categoria: "Recordatorios", titulo: "Recordatorio 15", texto: "¿Seguimos con la información? 💙 Así te explico los beneficios y cobertura disponibles." },

  // ── OBJECIONES ──────────────────────────────────────────
  {
    id: 35,
    categoria: "Objeciones",
    titulo: "REBATE — Calidad y estabilidad",
    texto: `Comprendo totalmente 😊. Recuerde que no solo elige el precio, sino un servicio de calidad que realmente cumple con la velocidad indicada. ¡Tenemos el mejor internet a nivel país no solo en velocidad si no en estabilidad!`
  },
  {
    id: 36,
    categoria: "Objeciones",
    titulo: "REBATE — Premios Ookla",
    texto: `¡Te entiendo! 😊 Invertir un poco más le garantiza un servicio respaldado por los premios Ookla, estos premios son internacionales y somos reconocidos por ofrecer una conexión rápida y estable. ¡La diferencia se nota desde el primer día!`
  }
];

// ══════════════════════════════════════════════════════════
// ESTADO / CONFIGURACIÓN DEL ASESOR
// ══════════════════════════════════════════════════════════
let config = null; // { nombre, apellido, departamento, distrito }
let categoriaActiva = 'Todos';
let busqueda = '';

// Lista de speeches que se muestra realmente. Si es null, se usan los
// speeches de respaldo (SPEECHES_BASE) que vienen dentro de la extensión.
let speechesRemotos = null;

const STORAGE_KEY = 'mifibra_agent_config';
const SPEECHES_CACHE_KEY = 'mifibra_speeches_cache';

// Los speeches editables (base). El id 6/7 (oferta) se siguen generando
// dinámicamente por zona en generarSpeechesOferta().
function speechesVigentes() {
  return Array.isArray(speechesRemotos) && speechesRemotos.length
    ? speechesRemotos
    : SPEECHES_BASE;
}

function getStorage() {
  return (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local)
    ? chrome.storage.local
    : null;
}

function cargarConfig(callback) {
  const storage = getStorage();
  if (storage) {
    storage.get([STORAGE_KEY], (result) => callback(result[STORAGE_KEY] || null));
  } else {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      callback(raw ? JSON.parse(raw) : null);
    } catch (e) {
      callback(null);
    }
  }
}

function guardarConfig(nuevaConfig, callback) {
  const storage = getStorage();
  if (storage) {
    storage.set({ [STORAGE_KEY]: nuevaConfig }, () => callback && callback());
  } else {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevaConfig));
    } catch (e) { /* noop */ }
    callback && callback();
  }
}

// ══════════════════════════════════════════════════════════
// GENERACIÓN DINÁMICA DE PLANES SEGÚN DEPARTAMENTO / DISTRITO
// ══════════════════════════════════════════════════════════
function obtenerDistritoInfo(departamento, distrito) {
  if (!departamento || !distrito || !DEPARTAMENTOS[departamento]) return null;
  return DEPARTAMENTOS[departamento].find(d => d.distrito === distrito) || null;
}

function buscarProducto(regionData, nombreProducto) {
  if (!regionData) return null;
  return regionData.productos.find(p => p.name === nombreProducto) || null;
}

function fmt(n) {
  return `S/ ${Number(n).toFixed(2)}`;
}

const AVISO_SIN_ZONA = `Selecciona tu departamento y distrito en ⚙️ Ajustes para ver la oferta vigente (cargo fijo y antigüedad de meses) de tu zona.`;

// Producto de TV preferido para el abordamiento: Dúo L1MAX si existe en la
// región, si no la región solo maneja TV Básica (p.ej. Equipamiento Básico y Winback).
function elegirProductoTV(region) {
  return buscarProducto(region, 'DÚO L1MAX') ||
    region.productos.find(p => p.name.startsWith('INTERNET + TV BÁSICA')) || null;
}

function indiceVelocidad(region, textoVelocidad) {
  return region.velocidades.findIndex(v => v && v.includes(textoVelocidad));
}

// Traduce el tope comercial del distrito (p. ej. "MAX PLAN DE 500" o
// "MAXIMO PLAN DE 1500") al índice de velocidad máximo permitido en esa
// región. Devuelve -1 si el distrito no tiene tope configurado.
function indiceTopeMaxPlan(region, distritoInfo) {
  if (!distritoInfo || !distritoInfo.max_plan) return -1;
  const nums = String(distritoInfo.max_plan).match(/\d+/g);
  if (!nums) return -1;
  const tope = parseInt(nums[nums.length - 1], 10);
  return region.velocidades.findIndex(v => parseInt(v, 10) === tope);
}

// Si la velocidad preferida no tiene precio en esa región/producto,
// cae al plan de mayor velocidad que sí tenga precio disponible,
// nunca por encima del tope de zona (idxTope).
function mejorIndiceDisponible(producto, idxPreferido, idxTope) {
  const promos = producto.rows['Precio Promo'] || [];
  let limite = promos.length - 1;
  if (typeof idxTope === 'number' && idxTope >= 0) limite = Math.min(limite, idxTope);
  if (idxPreferido >= 0 && idxPreferido <= limite &&
      promos[idxPreferido] !== null && promos[idxPreferido] !== undefined) {
    return idxPreferido;
  }
  for (let i = limite; i >= 0; i--) {
    if (promos[i] !== null && promos[i] !== undefined) return i;
  }
  return -1;
}

function generarAbordamiento(distritoInfo) {
  if (!distritoInfo) return AVISO_SIN_ZONA;
  const region = REGIONES[distritoInfo.region];
  const producto = region ? elegirProductoTV(region) : null;
  if (!region || !producto) {
    return `En ${distritoInfo.distrito} no tenemos un plan Dúo/TV configurado; ofrece el plan "Más económico" (solo internet).`;
  }
  const idxTope = indiceTopeMaxPlan(region, distritoInfo);
  const idx = mejorIndiceDisponible(producto, indiceVelocidad(region, '1500'), idxTope);
  if (idx === -1) return `No encontramos planes Dúo/TV configurados para ${distritoInfo.distrito}.`;

  const vel = region.velocidades[idx];
  const velPromo = region.velocidad_promo ? region.velocidad_promo[idx] : null;
  const promo = producto.rows['Precio Promo'][idx];
  const lista = producto.rows['Precio Lista'][idx];
  const meses = distritoInfo.meses;
  const esLiga1Max = producto.name.includes('L1MAX');

  return `Le detallo nuestros planes exclusivos que son ideales para usted.
📍 Plan de ${vel} + TV MI FIBRA TV${esLiga1Max ? ' - LIGA L1MAX' : ' - BÁSICA'}
${velPromo ? `Pero durante la promoción tendrás ${velPromo} 🚀\n` : ''}Precio promocional${meses ? ' (' + meses + ' meses)' : ''}: ${fmt(promo)}
Precio regular: ${fmt(lista)}
App de TV descargable en Smart TV Android, celulares, tablets, etc.
+80 canales.
Reproducción en 3 dispositivos al mismo tiempo.
¡Con nuestra televisión digital, podrá disfrutar de los mejores eventos deportivos! ⚽️`;
}

function generarMasEconomico(distritoInfo) {
  if (!distritoInfo) return AVISO_SIN_ZONA;
  const region = REGIONES[distritoInfo.region];
  const producto = region ? buscarProducto(region, 'INTERNET') : null;
  if (!region || !producto) return `No encontramos el plan solo internet configurado para ${distritoInfo.distrito}.`;

  const idxTope = indiceTopeMaxPlan(region, distritoInfo);
  const idx = mejorIndiceDisponible(producto, indiceVelocidad(region, '500'), idxTope);
  if (idx === -1) return `No encontramos planes de internet configurados para ${distritoInfo.distrito}.`;

  const vel = region.velocidades[idx];
  const velPromo = region.velocidad_promo ? region.velocidad_promo[idx] : null;
  const promo = producto.rows['Precio Promo'][idx];
  const lista = producto.rows['Precio Lista'][idx];
  const meses = distritoInfo.meses;

  return `⚡ Fibra ${vel}
🚀 ${velPromo ? `Durante la promoción navegas a ${velPromo}, como si tuvieras un plan superior sin pagar más` : 'Excelente velocidad y estabilidad para tu hogar'}
💰 Desde ${fmt(promo)}${meses ? ` durante ${meses} meses` : ''}
Luego pasa a ${fmt(lista)}, manteniendo la misma estabilidad y calidad 👌
Es una promo bien completa porque combina precio + mayor velocidad desde el inicio.`;
}

function generarSpeechesOferta() {
  const distritoInfo = config ? obtenerDistritoInfo(config.departamento, config.distrito) : null;
  return [
    { id: 6, categoria: "Oferta", titulo: "ABORDAMIENTO", texto: generarAbordamiento(distritoInfo) },
    { id: 7, categoria: "Oferta", titulo: "MÁS ECONÓMICO", texto: generarMasEconomico(distritoInfo) }
  ];
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function nombreAgenteCompleto() {
  if (!config) return 'el asesor';
  const n = (config.nombre || '').trim();
  const a = (config.apellido || '').trim();
  const full = `${n} ${a}`.trim();
  return full || 'el asesor';
}

function obtenerSpeeches() {
  const [abordamiento, masEconomico] = generarSpeechesOferta();
  const todos = [...speechesVigentes(), abordamiento, masEconomico]
    .sort((a, b) => a.id - b.id)
    .map(s => ({ ...s, texto: s.texto.split('{{AGENTE}}').join(nombreAgenteCompleto()) }));
  return todos;
}

// ══════════════════════════════════════════════════════════
// SINCRONIZACIÓN REMOTA (lectura del speeches.json en GitHub)
// ══════════════════════════════════════════════════════════
function guardarCacheSpeeches(arr) {
  const storage = getStorage();
  const payload = { speeches: arr, ts: Date.now() };
  if (storage) {
    storage.set({ [SPEECHES_CACHE_KEY]: payload });
  } else {
    try { window.localStorage.setItem(SPEECHES_CACHE_KEY, JSON.stringify(payload)); } catch (e) { /* noop */ }
  }
}

function leerCacheSpeeches(callback) {
  const storage = getStorage();
  if (storage) {
    storage.get([SPEECHES_CACHE_KEY], (r) => callback(r[SPEECHES_CACHE_KEY] || null));
  } else {
    try {
      const raw = window.localStorage.getItem(SPEECHES_CACHE_KEY);
      callback(raw ? JSON.parse(raw) : null);
    } catch (e) { callback(null); }
  }
}

// Normaliza cualquier formato aceptado: un array directo, o { speeches: [...] }.
function extraerSpeeches(json) {
  const arr = Array.isArray(json) ? json : (json && json.speeches);
  return Array.isArray(arr) ? arr : null;
}

// Aplica una lista de speeches y refresca la vista si el panel está visible.
function aplicarSpeeches(arr) {
  speechesRemotos = arr;
  const mainVisible = document.getElementById('mainApp').style.display !== 'none';
  if (mainVisible) {
    renderCategorias();
    renderSpeeches();
  }
}

// Intenta traer el speeches.json remoto. Estrategia:
//   1) fetch al raw de GitHub  → si funciona, se usa y se cachea.
//   2) si falla, se usa la última caché local.
//   3) si tampoco hay caché, quedan los de respaldo (SPEECHES_BASE).
function refrescarSpeechesRemotos() {
  if (!remoteConfigListo()) return; // aún no se configuró owner/repo
  fetch(rawSpeechesUrl(), { cache: 'no-store' })
    .then(r => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
    .then(json => {
      const arr = extraerSpeeches(json);
      if (!arr) throw new Error('Formato inválido');
      guardarCacheSpeeches(arr);
      aplicarSpeeches(arr);
    })
    .catch(() => {
      leerCacheSpeeches(cache => {
        if (cache && Array.isArray(cache.speeches)) aplicarSpeeches(cache.speeches);
      });
    });
}

// ══════════════════════════════════════════════════════════
// RENDER — LISTA DE SPEECHES
// ══════════════════════════════════════════════════════════
function renderCategorias() {
  const speeches = obtenerSpeeches();
  const categorias = ['Todos', ...new Set(speeches.map(s => s.categoria))];
  const container = document.getElementById('categories');
  container.innerHTML = categorias.map(cat => `
    <button class="cat-btn ${cat === categoriaActiva ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');
  container.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      categoriaActiva = btn.dataset.cat;
      renderCategorias();
      renderSpeeches();
    });
  });
}

function renderSpeeches() {
  const speeches = obtenerSpeeches();
  const lista = document.getElementById('speechesList');
  const filtrados = speeches.filter(s => {
    const matchCat = categoriaActiva === 'Todos' || s.categoria === categoriaActiva;
    const matchBusq = busqueda === '' ||
      s.titulo.toLowerCase().includes(busqueda) ||
      s.texto.toLowerCase().includes(busqueda);
    return matchCat && matchBusq;
  });

  const contador = document.getElementById('resultCount');
  if (contador) contador.textContent = filtrados.length;

  if (filtrados.length === 0) {
    lista.innerHTML = '<div class="no-results">😕 No se encontraron speeches</div>';
    return;
  }

  lista.innerHTML = filtrados.map(s => `
    <div class="speech-card" data-id="${s.id}">
      <div class="card-category">${s.categoria}</div>
      <div class="card-title">${s.titulo}</div>
      <div class="card-preview">${s.texto.substring(0, 80).replace(/\n/g, ' ')}...</div>
      <span class="card-icon">📋</span>
    </div>
  `).join('');

  lista.querySelectorAll('.speech-card').forEach(card => {
    card.addEventListener('click', () => copiarSpeech(card.dataset.id));
  });
}

let toastTimer = null;
function mostrarToast(mensaje, tipo = 'ok') {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.remove('error');
  if (tipo === 'error') toast.classList.add('error');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// Se compara como texto para soportar ids no enteros (p. ej. la ficha
// "ZONA SATURADA") sin que parseInt los colisione con otra ficha.
function copiarSpeech(id) {
  const speeches = obtenerSpeeches();
  const speech = speeches.find(s => String(s.id) === String(id));
  if (!speech) return;

  navigator.clipboard.writeText(speech.texto).then(() => {
    const card = document.querySelector(`.speech-card[data-id="${id}"]`);
    if (card) {
      card.classList.add('copied');
      setTimeout(() => card.classList.remove('copied'), 1500);
    }
    mostrarToast('✓ ¡Copiado al portapapeles!', 'ok');
  }).catch(() => {
    mostrarToast('⚠️ No se pudo copiar. Cópialo manualmente.', 'error');
  });
}

// ══════════════════════════════════════════════════════════
// RENDER — BARRA DE ASESOR
// ══════════════════════════════════════════════════════════
function renderAgentBar() {
  const bar = document.getElementById('agentBar');
  const info = document.getElementById('agentInfo');
  if (!config) {
    bar.style.display = 'none';
    return;
  }
  bar.style.display = 'flex';
  const distritoInfo = obtenerDistritoInfo(config.departamento, config.distrito);
  const zonaTxt = distritoInfo
    ? `📍 <b>${escapeHtml(distritoInfo.distrito)}</b>, ${escapeHtml(config.departamento)} · Antigüedad promo: ${distritoInfo.meses ?? '-'} meses`
    : '📍 Zona sin configurar';
  info.innerHTML = `👤 <b>${escapeHtml(nombreAgenteCompleto())}</b><br>${zonaTxt}`;
}

// ══════════════════════════════════════════════════════════
// PANEL DE AJUSTES
// ══════════════════════════════════════════════════════════
function poblarDepartamentos() {
  const select = document.getElementById('selectDepto');
  const nombres = Object.keys(DEPARTAMENTOS);
  select.innerHTML = '<option value="">Selecciona un departamento</option>' +
    nombres.map(d => `<option value="${d}">${d}</option>`).join('');
}

function poblarDistritos(departamento) {
  const select = document.getElementById('selectDistrito');
  if (!departamento || !DEPARTAMENTOS[departamento]) {
    select.innerHTML = '<option value="">Selecciona primero el departamento</option>';
    select.disabled = true;
    return;
  }
  const distritos = DEPARTAMENTOS[departamento];
  select.disabled = false;
  select.innerHTML = '<option value="">Selecciona un distrito</option>' +
    distritos.map(d => `<option value="${d.distrito}">${d.distrito}${d.meses ? ' (' + d.meses + ' meses promo)' : ''}</option>`).join('');
}

function actualizarZoneHint() {
  const departamento = document.getElementById('selectDepto').value;
  const distrito = document.getElementById('selectDistrito').value;
  const hint = document.getElementById('zoneHint');
  const info = obtenerDistritoInfo(departamento, distrito);
  if (!info) {
    hint.classList.remove('show');
    return;
  }
  hint.classList.add('show');
  hint.textContent = `✓ Cargo fijo/planes de zona: ${info.region.replace(/_/g, ' ')} · Antigüedad de promoción: ${info.meses ?? '-'} meses${info.zona ? ' · ' + info.zona : ''}`;
}

function validarFormularioAjustes() {
  const nombre = document.getElementById('inputNombre').value.trim();
  const apellido = document.getElementById('inputApellido').value.trim();
  const departamento = document.getElementById('selectDepto').value;
  const distrito = document.getElementById('selectDistrito').value;
  const btn = document.getElementById('saveSettings');
  btn.disabled = !(nombre && apellido && departamento && distrito);
}

function abrirAjustes(esPrimeraVez) {
  document.getElementById('settingsOverlay').style.display = 'flex';
  document.getElementById('mainApp').style.display = 'none';
  document.getElementById('agentBar').style.display = 'none';
  document.getElementById('cancelSettings').style.display = esPrimeraVez ? 'none' : 'block';

  poblarDepartamentos();
  poblarDistritos('');

  if (config) {
    document.getElementById('inputNombre').value = config.nombre || '';
    document.getElementById('inputApellido').value = config.apellido || '';
    document.getElementById('selectDepto').value = config.departamento || '';
    poblarDistritos(config.departamento || '');
    document.getElementById('selectDistrito').value = config.distrito || '';
  } else {
    document.getElementById('inputNombre').value = '';
    document.getElementById('inputApellido').value = '';
  }
  actualizarZoneHint();
  validarFormularioAjustes();
}

function cerrarAjustes() {
  document.getElementById('settingsOverlay').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  renderAgentBar();
  renderCategorias();
  renderSpeeches();
}

function initAjustesListeners() {
  document.getElementById('gearBtn').addEventListener('click', () => abrirAjustes(false));
  document.getElementById('editLink').addEventListener('click', () => abrirAjustes(false));

  document.getElementById('cancelSettings').addEventListener('click', () => {
    cerrarAjustes();
  });

  document.getElementById('selectDepto').addEventListener('change', (e) => {
    poblarDistritos(e.target.value);
    actualizarZoneHint();
    validarFormularioAjustes();
  });
  document.getElementById('selectDistrito').addEventListener('change', () => {
    actualizarZoneHint();
    validarFormularioAjustes();
  });
  document.getElementById('inputNombre').addEventListener('input', validarFormularioAjustes);
  document.getElementById('inputApellido').addEventListener('input', validarFormularioAjustes);

  document.getElementById('saveSettings').addEventListener('click', () => {
    const nuevaConfig = {
      nombre: document.getElementById('inputNombre').value.trim(),
      apellido: document.getElementById('inputApellido').value.trim(),
      departamento: document.getElementById('selectDepto').value,
      distrito: document.getElementById('selectDistrito').value
    };
    config = nuevaConfig;
    guardarConfig(nuevaConfig, () => cerrarAjustes());
  });
}

// ══════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════
// BOTÓN "FIJAR VENTANA"
// Abre la extensión en una ventana flotante independiente que
// no se cierra al hacer clic afuera y se puede minimizar/mover.
// ══════════════════════════════════════════════════════════
function esVentanaFija() {
  try { return new URLSearchParams(location.search).get('win') === '1'; }
  catch (e) { return false; }
}

function initPinButton() {
  const btn = document.getElementById('pinBtn');
  if (!btn) return;

  // Si ya estamos en la ventana flotante, el botón no tiene sentido.
  if (esVentanaFija()) { btn.style.display = 'none'; return; }

  const puede = typeof chrome !== 'undefined' && chrome.windows && chrome.runtime;
  if (!puede) { btn.style.display = 'none'; return; } // fuera de la extensión

  btn.addEventListener('click', () => {
    chrome.windows.create({
      url: chrome.runtime.getURL('popup.html?win=1'),
      type: 'popup',
      width: 440,
      height: 680
    }, () => window.close());
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAjustesListeners();
  if (typeof initAdminListeners === 'function') initAdminListeners();
  initPinButton();

  document.getElementById('searchInput').addEventListener('input', (e) => {
    busqueda = e.target.value.toLowerCase();
    renderSpeeches();
  });

  // 1) Caché local primero (respuesta instantánea, sirve offline).
  leerCacheSpeeches((cache) => {
    if (cache && Array.isArray(cache.speeches)) speechesRemotos = cache.speeches;

    cargarConfig((cfgGuardada) => {
      config = cfgGuardada;
      if (!config) {
        abrirAjustes(true);
      } else {
        cerrarAjustes();
      }
    });

    // 2) En segundo plano, buscar la versión más reciente en GitHub.
    refrescarSpeechesRemotos();
  });
});
