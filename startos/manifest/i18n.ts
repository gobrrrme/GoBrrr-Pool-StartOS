export const short = {
  en_US: 'Bitcoin Solo Mining, Done Right!',
  es_ES: '¡Minería Bitcoin en solitario, bien hecha!',
  de_DE: 'Bitcoin-Solo-Mining, richtig gemacht!',
  pl_PL: 'Solowe kopanie Bitcoina, jak należy!',
  fr_FR: 'Minage solo de Bitcoin, bien fait !',
}

export const long = {
  en_US:
    'GoBrrr Pool is a self-hosted Bitcoin solo mining pool built on ckpool-solo. Point any miner at it using your own Bitcoin address as the stratum username — if you find a block, the full reward is paid directly to your address. Includes a web dashboard with pool, miner, and worker statistics.',
  es_ES:
    'GoBrrr Pool es un pool de minería Bitcoin en solitario autoalojado, basado en ckpool-solo. Conecta cualquier minero usando tu propia dirección de Bitcoin como nombre de usuario de stratum: si encuentras un bloque, la recompensa completa se paga directamente a tu dirección. Incluye un panel web con estadísticas del pool, mineros y workers.',
  de_DE:
    'GoBrrr Pool ist ein selbst gehosteter Bitcoin-Solo-Mining-Pool auf Basis von ckpool-solo. Verbinde beliebige Miner mit deiner eigenen Bitcoin-Adresse als Stratum-Benutzername — findest du einen Block, geht die volle Belohnung direkt an deine Adresse. Inklusive Web-Dashboard mit Pool-, Miner- und Worker-Statistiken.',
  pl_PL:
    'GoBrrr Pool to samodzielnie hostowany pool do solowego kopania Bitcoina, oparty na ckpool-solo. Podłącz dowolną koparkę, używając własnego adresu Bitcoin jako nazwy użytkownika stratum — jeśli znajdziesz blok, pełna nagroda trafia bezpośrednio na Twój adres. Zawiera panel WWW ze statystykami poola, koparek i workerów.',
  fr_FR:
    "GoBrrr Pool est un pool de minage solo de Bitcoin auto-hébergé, basé sur ckpool-solo. Connectez n'importe quel mineur en utilisant votre propre adresse Bitcoin comme nom d'utilisateur stratum — si vous trouvez un bloc, la récompense complète est versée directement à votre adresse. Comprend un tableau de bord web avec les statistiques du pool, des mineurs et des workers.",
}

export const bitcoindDescription = {
  en_US:
    'Required. GoBrrr Pool fetches block templates and submits found blocks through your Bitcoin node. The node must be unpruned and have ZMQ block notifications enabled.',
  es_ES:
    'Obligatorio. GoBrrr Pool obtiene plantillas de bloques y envía los bloques encontrados a través de tu nodo Bitcoin. El nodo no debe estar podado y debe tener habilitadas las notificaciones de bloques ZMQ.',
  de_DE:
    'Erforderlich. GoBrrr Pool bezieht Block-Templates und reicht gefundene Blöcke über deinen Bitcoin-Node ein. Der Node darf nicht gepruned sein und braucht aktivierte ZMQ-Block-Benachrichtigungen.',
  pl_PL:
    'Wymagane. GoBrrr Pool pobiera szablony bloków i przesyła znalezione bloki przez Twój węzeł Bitcoin. Węzeł nie może być przycięty (pruned) i musi mieć włączone powiadomienia ZMQ o blokach.',
  fr_FR:
    'Obligatoire. GoBrrr Pool récupère les modèles de blocs et soumet les blocs trouvés via votre nœud Bitcoin. Le nœud ne doit pas être élagué et doit avoir les notifications de blocs ZMQ activées.',
}

export const mempoolDescription = {
  en_US:
    'Optional. When installed, the dashboard fetches price, fee, and block data from your local Mempool instance instead of the public mempool.space API.',
  es_ES:
    'Opcional. Si está instalado, el panel obtiene datos de precio, comisiones y bloques de tu instancia local de Mempool en lugar de la API pública de mempool.space.',
  de_DE:
    'Optional. Wenn installiert, bezieht das Dashboard Preis-, Gebühren- und Blockdaten von deiner lokalen Mempool-Instanz statt von der öffentlichen mempool.space-API.',
  pl_PL:
    'Opcjonalne. Po zainstalowaniu panel pobiera dane o cenie, opłatach i blokach z lokalnej instancji Mempool zamiast z publicznego API mempool.space.',
  fr_FR:
    "Optionnel. Une fois installé, le tableau de bord récupère les données de prix, de frais et de blocs depuis votre instance locale de Mempool au lieu de l'API publique mempool.space.",
}
