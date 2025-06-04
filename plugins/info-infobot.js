import { cpus, totalmem, freemem, platform } from 'os';
import speed from 'performance-now';
import { sizeFormatter } from 'human-readable';
import ws from 'ws'; // WebSocket for connection state
import fetch from 'node-fetch'; // For fetching thumbnail image

// Funzione per formattare la dimensione dei file
const format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
});

const handler = async (m, { conn, usedPrefix }) => {
    // --- Statistiche del Bot ---
    // Conta gli utenti unici connessi (sub-bot)
    const uniqueUsers = new Map();
    global.conns.forEach(c => {
        // Controlla se la connessione ha un utente e lo stato del socket non è chiuso
        if (c.user && c.ws?.socket?.readyState !== ws.CLOSED) {
            uniqueUsers.set(c.user.jid, c);
        }
    });

    const totalActiveConnections = uniqueUsers.size; // Numero di connessioni attive al bot
    const totalRegisteredUsers = Object.keys(global.db.data.users).length; // Utenti registrati nel database
    const totalBotsConnected = Object.keys(global.db.data.settings).length; // Numero totale di bot (se gestisci più istanze)
    const totalCommandsExecuted = Object.values(global.db.data.stats).reduce((t, s) => t + s.total, 0); // Comandi totali eseguiti
    const totalChats = Object.keys(global.db.data.chats).length; // Chat totali nel database
    const totalPlugins = Object.values(global.plugins).filter(v => v.help && v.tags).length; // Plugin totali caricati

    // --- Statistiche di Sistema ---
    // Informazioni sulla CPU
    const cpusInfo = cpus().map(cpu => {
        cpu.total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
        return cpu;
    });

    // Calcola la media delle statistiche della CPU
    const cpu = cpusInfo.reduce((acc, cpuPart, _, { length }) => {
        acc.total += cpuPart.total;
        acc.speed += cpuPart.speed / length;
        acc.times.user += cpuPart.times.user;
        acc.times.nice += cpuPart.times.nice;
        acc.times.sys += cpuPart.times.sys;
        acc.times.idle += cpuPart.times.idle;
        acc.times.irq += cpuPart.times.irq;
        return acc;
    }, {
        speed: 0,
        total: 0,
        times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }
    });

    // Calcola l'uptime del processo
    let processUptime;
    if (process.send) {
        process.send('uptime');
        processUptime = await new Promise(resolve => {
            process.once('message', resolve);
            setTimeout(() => resolve(0), 1000); // Timeout per evitare blocchi
        }) * 1000;
    } else {
        processUptime = process.uptime() * 1000; // Fallback se non c'è process.send
    }

    let uptimeString = clockString(processUptime); // Formatta l'uptime
    let timestamp = speed(); // Tempo iniziale per la latenza
    let latency = speed() - timestamp; // Calcola la latenza

    // Prepara il nome del bot per il footer
    const botNewsletterName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」";

    // Costruisci il messaggio informativo con la tua UI
    const infoMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🤖 *INFO BOT & SISTEMA* 🤖
┊ ──────────────────────
┊ 📊 *Statistiche Bot:*
┊ 🧩 *Prefisso:* \`${usedPrefix}\`
┊ 📦 *Plugin Caricati:* ${totalPlugins}
┊ 🤝 *Sub-Bot Attivi:* ${totalActiveConnections}
┊ 👤 *Utenti Registrati:* ${formatNumber(totalRegisteredUsers)}
┊ 💬 *Chat Totali:* ${formatNumber(totalChats)}
┊ 📈 *Comandi Eseguiti:* ${formatNumber(totalCommandsExecuted)}
┊ ──────────────────────
┊ 💻 *Statistiche Sistema:*
┊ 🌐 *Piattaforma:* ${platform()}
┊ ⏱️ *Uptime:* ${uptimeString}
┊ 🧠 *Latenza:* ${latency.toFixed(2)} ms
┊ 🚀 *CPU:* ${cpu.speed.toFixed(2)} GHz (${cpusInfo.length} core${cpusInfo.length > 1 ? 's' : ''})
┊ 📊 *RAM Utilizzata:* ${format(totalmem() - freemem())} / ${format(totalmem())}
┊ 🌿 *RAM Libera:* ${format(freemem())}
┊ ──────────────────────
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

    // URL dell'immagine per la thumbnail (usata anche nell'externalAdReply)
    const imgURL = 'https://i.postimg.cc/hGTf4J7Z/IMG-20250405-WA0152.jpg';
    const thumbBuffer = await fetch(imgURL).then(res => res.buffer());

    // Oggetto locationFake per il messaggio quotato
    const locationFake = {
        key: {
            participants: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'info-bot-message', // ID univoco per il messaggio
        },
        message: {
            locationMessage: {
                name: "🌕 |几千ㄖ 乃ㄖㄒ 💫",
                jpegThumbnail: thumbBuffer,
            },
        },
        participant: '0@s.whatsapp.net',
    };

    // Invia il messaggio con le informazioni e l'externalAdReply
    await conn.sendMessage(m.chat, {
        text: infoMessage,
        contextInfo: {
            externalAdReply: {
                title: "🤖 🄶🄸🅄🅂🄴 • 🄼🄳",
                body: "Sistema & statistiche live",
                thumbnail: thumbBuffer,
                sourceUrl: "https://github.com/Giuse1106/giusemd", // Link opzionale
                mediaType: 1, // Tipo di media (1 = immagine)
                renderLargerThumbnail: false,
            },
            // Aggiungi forwardingScore e isForwarded per coerenza con gli altri menu
            forwardingScore: 1,
            isForwarded: true,
            // Aggiungi forwardedNewsletterMessageInfo se desideri simulare una newsletter
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363418973546282@newsletter", // JID di una newsletter di esempio
                serverMessageId: '',
                newsletterName: botNewsletterName
            }
        }
    }, { quoted: locationFake }); // Quota il messaggio con l'oggetto locationFake
};

// Funzione per formattare i numeri con le virgole
function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Funzione per formattare il tempo in giorni, ore, minuti, secondi
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [d + 'G', h + 'H', m + 'M', s + 'S'].join(' ');
}

handler.help = ['info']; // Comando per l'help
handler.tags = ['main']; // Tag del comando
handler.command = ['infobot', 'ping', 'status']; // Comandi per attivare l'handler

export default handler;
