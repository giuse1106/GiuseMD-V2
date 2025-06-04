//Crediti by Giuse

// Questi import non sono direttamente usati nell'handler, ma sono stati mantenuti
// per coerenza con il tuo setup, nel caso siano utili in altre parti del bot.
import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';
import fetch from 'node-fetch'; // Necessario per fetchare le immagini

let handler = async (m, { conn, usedPrefix }) => { // Variabili rinominate per chiarezza
    // Prepara la thumbnail per il messaggio quotato
    let thumbnail = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();

    // Oggetto per la quotazione del messaggio con un'immagine e vCard
    let quotedMessage = { // Renamed from _0x2d215f
        key: {
            participants: "0@s.whatsapp.net",
            fromMe: false,
            id: 'OwnerMenu' // ID specifico per questo messaggio
        },
        message: {
            locationMessage: {
                name: "𝐌𝐞𝐧𝐮 𝐎𝐰𝐧𝐞𝐫",
                jpegThumbnail: thumbnail,
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
    let botNewsletterName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」"; // Renamed from _0x575cba
    
    // Costruisci il testo del menu owner con lo stile "cornice"
    let menuText = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 👑 *PANNELLO DI CONTROLLO OWNER* 👑
┊ ──────────────────────
┊ ⚙️ *Comandi disponibili:*
┊ • \`${usedPrefix}𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐧𝐨𝐦𝐞\`
┊ • \`${usedPrefix}𝐫𝐞𝐬𝐞𝐭𝐭𝐚𝐧𝐨𝐦𝐞\`
┊ • \`${usedPrefix}𝐠𝐞𝐬𝐭𝐢𝐬𝐜𝐢 @\`
┊ • \`${usedPrefix}𝐬𝐞𝐭𝐠𝐫𝐮𝐩𝐩𝐢\`
┊ • \`${usedPrefix}𝐚𝐠𝐠𝐢𝐮𝐧𝐠𝐢𝐠𝐫𝐮𝐩𝐩𝐢 @\`
┊ • \`${usedPrefix}𝐫𝐞𝐬𝐞𝐭𝐠𝐫𝐮𝐩𝐩𝐢 @\`
┊ • \`${usedPrefix}𝐬𝐞𝐭𝐩𝐩 (immagine)\`
┊ • \`${usedPrefix}𝐛𝐚𝐧𝐮𝐬𝐞𝐫 @\`
┊ • \`${usedPrefix}𝐮𝐧𝐛𝐚𝐧𝐮𝐬𝐞𝐫 @\`
┊ • \`${usedPrefix}𝐛𝐥𝐨𝐜𝐤𝐮𝐬𝐞𝐫 @\`
┊ • \`${usedPrefix}𝐮𝐧𝐛𝐥𝐨𝐜𝐤𝐮𝐬𝐞𝐫 @\`
┊ • \`${usedPrefix}𝐩𝐮𝐥𝐢𝐳𝐢𝐚 (+)\`
┊ • \`${usedPrefix}𝐨𝐮𝐭\`
┊ • \`${usedPrefix}𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 (?)\`
┊ • \`${usedPrefix}𝐫𝐞𝐬𝐞𝐭𝐭𝐚𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨\`
┊ • \`${usedPrefix}𝐠𝐨𝐝𝐦𝐨𝐝𝐞 {autoadmin}\`
┊ • \`${usedPrefix}𝐚𝐳𝐳𝐞𝐫𝐚 @\`
┊ • \`${usedPrefix}𝐚𝐠𝐠𝐢𝐮𝐧𝐠𝐢 (num. messaggi) @\`
┊ • \`${usedPrefix}𝐫𝐢𝐦𝐮𝐨𝐯𝐢 (num. messaggi) @\`
┊ • \`${usedPrefix}𝐟𝐥𝐨𝐨𝐝\`
┊ • \`${usedPrefix}𝐧𝐮𝐤𝐞\`
┊ • \`${usedPrefix}𝐚𝐝𝐝𝐨𝐰𝐧𝐞𝐫 @\`
┊ • \`${usedPrefix}𝐝𝐞𝐥𝐨𝐰𝐧𝐞𝐫 @\`
┊ ──────────────────────
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`; // Renamed from _0x3f08c2

    // Invia il messaggio
    await conn.sendMessage(m.chat, { // Renamed _0x1ece27 to m, _0x4d8805 to conn
        text: menuText.trim(),
        contextInfo: {
            // Ho modificato per usare global.wm o botNewsletterName come nelle altre,
            // presumendo che 'wm' sia per menzionare il bot.
            mentionedJid: conn.parseMention(global.wm || botNewsletterName), 
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363418973546282@newsletter",
                serverMessageId: '',
                newsletterName: botNewsletterName
            }
        }
    }, {
        quoted: quotedMessage
    });
};

handler.help = ["owner", "menuowner", "pannello"]; // Ho aggiunto tutte le varianti di comando a help
handler.tags = ['owner', 'menu']; // Ho aggiunto 'owner' ai tags
handler.command = /^(owner|menuowner|pannello)$/i;

export default handler;

// La funzione clockString non è usata in questo handler, ma la mantengo per coerenza.
function clockString(ms) { // Variabili rinominate per chiarezza
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
