//Crediti By Giuse

// Questi import non sono utilizzati nel codice fornito, ma li ho mantenuti per coerenza
// con il tuo setup, nel caso siano utili in altre parti del bot.
import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';
import fetch from 'node-fetch'; // Aggiunto fetch per l'immagine

let handler = async (m, { conn, usedPrefix }) => { // Variabili rinominate per chiarezza
    // Oggetto per la quotazione del messaggio con un'immagine e vCard
    let quotedMessage = {
        key: {
            participants: "0@s.whatsapp.net",
            fromMe: false,
            id: 'Halo' // Un ID generico
        },
        message: {
            locationMessage: {
                name: "𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧",
                jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(), // Immagine thumbnail
                vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };
    
    // Nome del bot per il footer, predefinito se non trovato
    let botName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」";
    
    // Messaggio del menu admin formattato con il tuo stile
    let adminMenuText = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 👑 *MENU ADMIN* 👑
┊ ──────────────────────
┊ ➤ ${usedPrefix}𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐢 / 𝐩 👑
┊ ➤ ${usedPrefix}𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐝𝐢 / 𝐫 ❌
┊ ➤ ${usedPrefix}𝐰𝐚𝐫𝐧 / 𝐮𝐧𝐰𝐚𝐫𝐧 ⚠️
┊ ➤ ${usedPrefix}𝐦𝐮𝐭𝐚 / 𝐬𝐦𝐮𝐭𝐚 📵
┊ ➤ ${usedPrefix}𝐡𝐢𝐝𝐞𝐭𝐚𝐠 👥
┊ ➤ ${usedPrefix}𝐭𝐚𝐠𝐚𝐥𝐥 💤
┊ ➤ ${usedPrefix}𝐚𝐩𝐞𝐫𝐭𝐨 / 𝐜𝐡𝐢𝐮𝐬𝐨 ✅
┊ ➤ ${usedPrefix}𝐬𝐞𝐭𝐰𝐞𝐥𝐜𝐨𝐦𝐞 👋🏻
┊ ➤ ${usedPrefix}𝐬𝐞𝐭𝐛𝐲𝐞 😭
┊ ➤ ${usedPrefix}𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢 💤
┊ ➤ ${usedPrefix}𝐥𝐢𝐬𝐭𝐚𝐧𝐮𝐦 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 🔍
┊ ➤ ${usedPrefix}𝐩𝐮𝐥𝐢𝐳𝐢𝐚 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 🎉
┊ ➤ ${usedPrefix}𝐬𝐢𝐦 ✨
┊ ➤ ${usedPrefix}𝐚𝐝𝐦𝐢𝐧𝐬 👑
┊ ➤ ${usedPrefix}𝐟𝐫𝐞𝐞𝐳𝐞 @❄️
┊ ➤ ${usedPrefix}𝐩𝐢𝐜 @ 📷
┊ ──────────────────────
┊ > ${botName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
    
    // Invia il messaggio del menu
    conn.sendMessage(m.chat, {
        text: adminMenuText.trim(), // Rimuove spazi extra all'inizio/fine
        contextInfo: {
            mentionedJid: conn.parseMention(global.wm || ''), // Assicurati che global.wm sia definito o usa una stringa vuota
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363418973546282@newsletter", // Questo JID è per le newsletter di WhatsApp
                serverMessageId: '',
                newsletterName: botName // Nome della newsletter
            }
        }
    }, {
        quoted: quotedMessage // Messaggio quotato con thumbnail e vCard
    });
};

handler.help = ["menuadm", "admin"];
handler.tags = ["menu", "admin"]; // Ho aggiunto 'admin' ai tags
handler.command = /^(menuadm|admin)$/i; // Supporta entrambi i comandi

export default handler;

// Funzione clockString (non utilizzata direttamente in questo handler, ma la mantengo per coerenza)
function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    console.log({ ms: ms, h: h, m: m, s: s }); // Questo console.log potrebbe essere rimosso in produzione
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
