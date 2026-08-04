// ══════════════════════════════════════════════════════════
// CONFIGURACIÓN DEL ORIGEN REMOTO (repo PÚBLICO de GitHub)
// ──────────────────────────────────────────────────────────
// ▶ PASO ÚNICO DE INSTALACIÓN:
//   Rellena "owner" con tu usuario de GitHub y "repo" con el
//   nombre del repositorio donde subirás esta extensión.
//   (Estos datos NO son secretos — pueden ir a la vista.)
//   El token del admin NO se pone aquí; se pega dentro de la
//   extensión y se guarda solo en la PC del administrador.
// ══════════════════════════════════════════════════════════
const REMOTE_CONFIG = {
  owner:  'danielramos202010-byte',
  repo:   'speeches-mifibra',
  branch: 'main',
  path:   'speeches.json'
};

function rawSpeechesUrl() {
  const { owner, repo, branch, path } = REMOTE_CONFIG;
  // El parámetro ?t= ayuda a mitigar la caché del navegador (no de GitHub).
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

function apiContentsUrl() {
  const { owner, repo, path } = REMOTE_CONFIG;
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
}

function remoteConfigListo() {
  return REMOTE_CONFIG.owner && REMOTE_CONFIG.owner !== 'TU_USUARIO_GITHUB';
}
