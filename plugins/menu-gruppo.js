// Crediti by Giuse

// Questi import non sono direttamente usati nell'handler, ma sono stati mantenuti
// per coerenza con il tuo setup, nel caso siano utili in altre parti del bot.
import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';
import fetch from 'node-fetch'; // Necessario per fetchare le immagini

let handler = async (m, { conn, usedPrefix }) => {
    // Prepara la thumbnail per il messaggio quotato
    let thumbnail = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();

    // Oggetto per la quotazione del messaggio con un'immagine e vCard
    const quotedMessage = { // Renamed from msgMenu
        key: {
            participants: "0@s.whatsapp.net",
            fromMe: false,
            id: 'GroupMenu' // ID specifico per questo messaggio
        },
        message: {
            locationMessage: {
                name: "𝐌𝐞𝐧𝐮 𝐆𝐫𝐮𝐩𝐩𝐨",
                jpegThumbnail: thumbnail,
                vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
END:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };

    // Prepara il nome del bot per il footer della newsletter
    const botNewsletterName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」";

    // Costruisci il testo del menu di gruppo con lo stile "cornice"
    let menuText = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 👥 *MENU GRUPPO* 👥
┊ ──────────────────────
┊ 💋 *Interazione*
┊ • \`${usedPrefix}abbraccia @\`
┊ • \`${usedPrefix}mordi @\`
┊ • \`${usedPrefix}lecca @\`
┊ • \`${usedPrefix}crush @\`
┊ • \`${usedPrefix}amore @\`
┊ ──────────────────────
┊ 🧠 *Testo & Utility*
┊ • \`${usedPrefix}rileggi (messaggio)\`
┊ • \`${usedPrefix}meteo (città)\`
┊ • \`${usedPrefix}styletext\`
┊ • \`${usedPrefix}calc 1+1\`
┊ ──────────────────────
┊ 📸 *Immagini*
┊ • \`${usedPrefix}hd (foto)\`
┊ • \`${usedPrefix}leggi (foto)\`
┊ • \`${usedPrefix}rimuovisfondo (foto)\`
┊ • \`${usedPrefix}rivela (foto)\`
┊ ──────────────────────
┊ 🔧 *Extra*
┊ • \`${usedPrefix}qr (testo)\`
┊ • \`${usedPrefix}dado\`
┊ • \`${usedPrefix}ttp (testo)\`
┊ • \`${usedPrefix}tris\`
┊ • \`${usedPrefix}topgays\`
┊ • \`${usedPrefix}topnazi\`
┊ ──────────────────────
┊ 🎭 *Sticker e Media*
┊ • \`${usedPrefix}s / sticker\`
┊ • \`${usedPrefix}tovideo\`
┊ • \`${usedPrefix}togif\`
┊ ──────────────────────
┊ ⚙️ *Impostazioni*
┊ • \`${usedPrefix}setig\`
┊ • \`${usedPrefix}eliminaig\`
┊ • \`${usedPrefix}id\`
┊ ──────────────────────
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

    // Invia il messaggio
    conn.sendMessage(m.chat, {
        text: menuText.trim(),
        contextInfo: {
            // Nota: conn.parseMention(menu) qui tenterà di menzionare JID presenti nel testo del menu,
            // il che di solito non è l'intento per questo tipo di menu.
            // Ho modificato per usare global.wm o botNewsletterName come nelle altre,
            // ma se la tua logica richiede di parsare il menu, fammelo sapere.
            mentionedJid: conn.parseMention(global.wm || botNewsletterName),
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363418973546282@newsletter",
                serverMessageId: '',
                newsletterName: botNewsletterName
            }
        }
    }, { quoted: quotedMessage });
};

handler.help = ["menugruppo"];
handler.tags = ['menu', 'group']; // Aggiunto 'group' ai tags
handler.command = /^(menugruppo|gruppo)$/i;

export default handler;

// La funzione clockString non è usata in questo handler, ma la mantengo per coerenza.
function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
