import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.2.3:0',
  releaseNotes: {
    en_US:
      'Backups now include pool and worker statistics (best shares, hashrate history), so they survive a restore. Fixes ZMQ "message size error" log spam with Bitcoin on StartOS. Adds a read-only public API for monitoring apps. The web dashboard now runs on Node.js 24 (Node.js 20 no longer receives security updates).',
    es_ES:
      'Las copias de seguridad ahora incluyen las estadísticas del pool y de los workers (mejores shares, historial de hashrate), por lo que sobreviven a una restauración. Corrige el spam de registro ZMQ "message size error" con Bitcoin en StartOS. Añade una API pública de solo lectura para apps de monitorización. El panel web ahora funciona con Node.js 24 (Node.js 20 ya no recibe actualizaciones de seguridad).',
    de_DE:
      'Backups enthalten jetzt Pool- und Worker-Statistiken (Best Shares, Hashrate-Verlauf), die damit einen Restore überstehen. Behebt den ZMQ-Log-Spam „message size error“ mit Bitcoin auf StartOS. Neue öffentliche Read-only-API für Monitoring-Apps. Das Web-Dashboard läuft jetzt auf Node.js 24 (Node.js 20 erhält keine Sicherheitsupdates mehr).',
    pl_PL:
      'Kopie zapasowe obejmują teraz statystyki poola i workerów (najlepsze share, historia hashrate), dzięki czemu przetrwają przywrócenie. Naprawia spam w logach ZMQ „message size error” z Bitcoinem na StartOS. Dodaje publiczne API tylko do odczytu dla aplikacji monitorujących. Panel WWW działa teraz na Node.js 24 (Node.js 20 nie otrzymuje już aktualizacji bezpieczeństwa).',
    fr_FR:
      "Les sauvegardes incluent désormais les statistiques du pool et des workers (meilleures shares, historique du hashrate), qui survivent ainsi à une restauration. Corrige le spam de logs ZMQ « message size error » avec Bitcoin sur StartOS. Ajoute une API publique en lecture seule pour les applications de surveillance. Le tableau de bord web fonctionne désormais sous Node.js 24 (Node.js 20 ne reçoit plus de mises à jour de sécurité).",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
