//Crediti By Giuse

import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';
import fetch from 'node-fetch'; // Necessario per fetchare le immagini

let handler = async (m, { conn, usedPrefix }) => {
    // Prepara l'oggetto per il messaggio quotato con thumbnail e vCard
    let quotedMessage = { // Rinominato da _0x414c2d
        key: {
            participants: "0@s.whatsapp.net",
            fromMe: false,
            id: 'AdminMenu' // ID specifico per questo messaggio
        },
        message: {
            locationMessage: {
                name: "𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧",
                jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
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
    
    // Prepara il nome del bot per il footer della newsletter
    // Usa global.db.data.nomedelbot se disponibile, altrimenti il default
    const botNewsletterName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」"; // Rinominato da _0xf5c7c0

    // Costruisci il testo del menu admin con la tua UI
    let adminMenuText = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 👑 *MENU ADMIN* 👑
┊ ──────────────────────
┊ ⚙️ *Gestione Membri:*
┊ • \`${usedPrefix}𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐢\` / \`${usedPrefix}𝐩\`
┊ • \`${usedPrefix}𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐝𝐢\` / \`${usedPrefix}𝐫\`
┊ • \`${usedPrefix}𝐰𝐚𝐫𝐧\` / \`${usedPrefix}𝐮𝐧𝐰𝐚𝐫𝐧\`
┊ • \`${usedPrefix}𝐦𝐮𝐭𝐚\` / \`${usedPrefix}𝐬𝐦𝐮𝐭𝐚\`
┊ • \`${usedPrefix}𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢\`
┊ • \`${usedPrefix}𝐫𝐢𝐦𝐨𝐳𝐢𝐨𝐧𝐞𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢\`
┊ • \`${usedPrefix}𝐟𝐫𝐞𝐞𝐳𝐞 @\`
┊ ──────────────────────
┊ 💬 *Messaggi & Interazione:*
┊ • \`${usedPrefix}𝐡𝐢𝐝𝐞𝐭𝐚𝐠\`
┊ • \`${usedPrefix}𝐭𝐚𝐠𝐚𝐥𝐥\`
┊ • \`${usedPrefix}𝐬𝐢𝐦\`
┊ • \`${usedPrefix}𝐬𝐭𝐮𝐩𝐫𝐚\`
┊ • \`${usedPrefix}𝐩𝐢𝐜 @\`
┊ ──────────────────────
┊ 🔧 *Impostazioni Gruppo:*
┊ • \`${usedPrefix}𝐚𝐩𝐞𝐫𝐭𝐨\` / \`${usedPrefix}𝐜𝐡𝐢𝐮𝐬𝐨\`
┊ • \`${usedPrefix}𝐬𝐞𝐭𝐰𝐞𝐥𝐜𝐨𝐦𝐞\`
┊ • \`${usedPrefix}𝐬𝐞𝐭𝐛𝐲𝐞\`
┊ • \`${usedPrefix}𝐚𝐝𝐦𝐢𝐧𝐬\`
┊ ──────────────────────
┊ 📊 *Statistiche & Utility:*
┊ • \`${usedPrefix}𝐥𝐢𝐬𝐭𝐚𝐧𝐮𝐦\` + \`𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨\`
┊ • \`${usedPrefix}𝐩𝐮𝐥𝐢𝐳𝐢𝐚\` + \`𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨\`
┊ • \`${usedPrefix}𝐢𝐬𝐩𝐞𝐳𝐢𝐨𝐧𝐚\` (link)
┊ • \`${usedPrefix}𝐭𝐨𝐩\` (10,50,100)
┊ • \`${usedPrefix}𝐭𝐨𝐩𝐬𝐞𝐱𝐲\`
┊ • \`${usedPrefix}𝐭𝐨𝐩𝐭𝐫𝐨𝐢𝐞\`
┊ ──────────────────────
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`.trim();

    // Invia il messaggio del menu con la UI migliorata
    conn.sendMessage(m.chat, { // Rinominato _0x4b9a49 a conn, _0x4955de a m
        text: adminMenuText,
        contextInfo: {
            mentionedJid: conn.parseMention(global.wm || botNewsletterName), // Utilizza global.wm o il nome del bot
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363341274693350@newsletter", // Mantienilo così se è il JID specifico della tua newsletter
                serverMessageId: '',
                newsletterName: botNewsletterName // Utilizza il nome del bot per la newsletter
            }
        }
    }, {
        quoted: quotedMessage // Quota il messaggio con l'oggetto preparato
    });
};

handler.help = ["menuadm"]; // Ho specificato il comando esatto per l'help
handler.tags = ["menu", "admin"]; // Aggiunto tag 'admin'
handler.command = /^(menuadm|admin)$/i;
handler.group = true; // Presumo che questo menu sia principalmente per i gruppi
handler.admin = true; // Solo gli admin possono usare questo comando
export default handler;

// La funzione clockString non è usata in questo handler, quindi la si può rimuovere
// se non è utilizzata altrove. L'ho rimossa dal file finale per pulizia.
/*
function clockString(ms) { // Variabili rinominate per chiarezza
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    console.log({ ms, h, m, s });
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
*/
