// ══════════════════════════════════════════════════════════
// PANEL DE ADMINISTRADOR
// Permite agregar / editar / quitar speeches y publicarlos al
// speeches.json del repo público de GitHub (GitHub Contents API).
// El token del admin se guarda solo en esta PC (chrome.storage).
// ══════════════════════════════════════════════════════════
const ADMIN_KEY = 'mifibra_admin';
let adminSpeeches = [];

function getAdmin(callback) {
  const storage = getStorage();
  if (storage) {
    storage.get([ADMIN_KEY], (r) => callback(r[ADMIN_KEY] || {}));
  } else {
    try {
      const raw = window.localStorage.getItem(ADMIN_KEY);
      callback(raw ? JSON.parse(raw) : {});
    } catch (e) { callback({}); }
  }
}

function setAdmin(obj) {
  const storage = getStorage();
  if (storage) {
    storage.set({ [ADMIN_KEY]: obj });
  } else {
    try { window.localStorage.setItem(ADMIN_KEY, JSON.stringify(obj)); } catch (e) { /* noop */ }
  }
}

function adminStatus(msg) {
  const el = document.getElementById('adminStatus');
  if (el) el.textContent = msg || '';
}

// Nuevo id entero, sin pisar los ids 6/7 reservados a la oferta dinámica.
function siguienteId() {
  const ids = adminSpeeches
    .map(s => Math.floor(Number(s.id)))
    .filter(n => !isNaN(n));
  return Math.max(7, ...ids) + 1;
}

function renderAdminList() {
  const cont = document.getElementById('adminList');
  if (!adminSpeeches.length) {
    cont.innerHTML = '<div class="no-results">Sin speeches. Usa “➕ Agregar”.</div>';
    return;
  }
  cont.innerHTML = adminSpeeches.map((s, i) => `
    <div class="admin-item">
      <div class="admin-item-head">
        <span class="admin-item-id">#${escapeHtml(String(s.id))}</span>
        <button class="admin-del" data-i="${i}" title="Quitar speech">🗑</button>
      </div>
      <input class="admin-f admin-cat" data-i="${i}" data-k="categoria" placeholder="Categoría" value="${escapeHtml(s.categoria || '')}">
      <input class="admin-f admin-tit" data-i="${i}" data-k="titulo" placeholder="Título" value="${escapeHtml(s.titulo || '')}">
      <textarea class="admin-f admin-txt" data-i="${i}" data-k="texto" rows="3" placeholder="Texto del speech... (usa {{AGENTE}} para el nombre del asesor)">${escapeHtml(s.texto || '')}</textarea>
    </div>
  `).join('');
}

function abrirAdmin() {
  // Copia de trabajo a partir de lo que se ve hoy.
  adminSpeeches = JSON.parse(JSON.stringify(speechesVigentes()));

  const info = document.getElementById('adminInfo');
  if (remoteConfigListo()) {
    info.textContent = `Repo: ${REMOTE_CONFIG.owner}/${REMOTE_CONFIG.repo} (${REMOTE_CONFIG.branch})`;
  } else {
    info.textContent = '⚠️ Falta configurar owner/repo en config.js';
  }

  getAdmin((a) => {
    if (a.token) document.getElementById('adminToken').value = a.token;
  });

  adminStatus('');
  renderAdminList();
  document.getElementById('adminOverlay').style.display = 'flex';
}

function cerrarAdmin() {
  document.getElementById('adminOverlay').style.display = 'none';
}

// Guarda localmente (solo en esta PC) sin publicar — útil para probar.
function guardarLocalAdmin() {
  guardarCacheSpeeches(adminSpeeches);
  aplicarSpeeches(JSON.parse(JSON.stringify(adminSpeeches)));
  mostrarToast('💾 Guardado solo en esta PC', 'ok');
}

function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

async function publicarAdmin() {
  const token = (document.getElementById('adminToken').value || '').trim();
  if (!remoteConfigListo()) {
    mostrarToast('⚠️ Configura owner/repo en config.js', 'error');
    return;
  }
  if (!token) {
    mostrarToast('⚠️ Pega tu token de GitHub', 'error');
    return;
  }

  const btn = document.getElementById('adminPublish');
  btn.disabled = true;
  adminStatus('Publicando…');

  const headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/vnd.github+json'
  };

  try {
    // 1) Obtener el sha actual del archivo (si ya existe).
    let sha = null;
    const get = await fetch(apiContentsUrl() + '?ref=' + encodeURIComponent(REMOTE_CONFIG.branch), { headers });
    if (get.status === 200) {
      sha = (await get.json()).sha;
    } else if (get.status === 401) {
      throw new Error('Token inválido o sin permisos (401)');
    } else if (get.status !== 404) {
      throw new Error('No se pudo leer el archivo (HTTP ' + get.status + ')');
    }

    // 2) Subir (crear o actualizar) el archivo.
    const contenido = JSON.stringify({ speeches: adminSpeeches }, null, 2);
    const body = {
      message: 'Actualizar speeches — ' + new Date().toISOString(),
      content: utf8ToBase64(contenido),
      branch: REMOTE_CONFIG.branch
    };
    if (sha) body.sha = sha;

    const put = await fetch(apiContentsUrl(), {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!put.ok) {
      let detalle = '';
      try { detalle = (await put.json()).message || ''; } catch (e) { /* noop */ }
      if (put.status === 404) throw new Error('Repo no encontrado o token sin acceso (404)');
      if (put.status === 409) throw new Error('Conflicto: alguien más publicó. Reabre e intenta de nuevo (409)');
      throw new Error(`Error al publicar (HTTP ${put.status}) ${detalle}`.trim());
    }

    // 3) Reflejar el cambio localmente y recordar el token.
    guardarCacheSpeeches(adminSpeeches);
    aplicarSpeeches(JSON.parse(JSON.stringify(adminSpeeches)));
    setAdmin({ token });

    adminStatus('Publicado ✔');
    mostrarToast('✅ Publicado. Los agentes lo verán en ~5 min', 'ok');
  } catch (err) {
    adminStatus('Error');
    mostrarToast('⚠️ ' + err.message, 'error');
  } finally {
    btn.disabled = false;
  }
}

function initAdminListeners() {
  const entry = document.getElementById('adminEntryBtn');
  if (entry) entry.addEventListener('click', abrirAdmin);

  document.getElementById('adminCancel').addEventListener('click', cerrarAdmin);
  document.getElementById('adminSaveLocal').addEventListener('click', guardarLocalAdmin);
  document.getElementById('adminPublish').addEventListener('click', publicarAdmin);

  document.getElementById('adminAddBtn').addEventListener('click', () => {
    adminSpeeches.push({ id: siguienteId(), categoria: 'General', titulo: 'Nuevo speech', texto: '' });
    renderAdminList();
    const lista = document.getElementById('adminList');
    lista.scrollTop = lista.scrollHeight;
  });

  const cont = document.getElementById('adminList');
  // Edición en vivo de los campos.
  cont.addEventListener('input', (e) => {
    const t = e.target;
    if (!t.classList.contains('admin-f')) return;
    const i = Number(t.dataset.i);
    const k = t.dataset.k;
    if (adminSpeeches[i]) adminSpeeches[i][k] = t.value;
  });
  // Eliminar speech.
  cont.addEventListener('click', (e) => {
    if (!e.target.classList.contains('admin-del')) return;
    const i = Number(e.target.dataset.i);
    adminSpeeches.splice(i, 1);
    renderAdminList();
  });
}
