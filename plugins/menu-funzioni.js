// Crediti By Giusee

// Gli import qui sotto non sono direttamente usati nell'handler, ma sono stati mantenuti
// per coerenza con il tuo setup, nel caso siano utili in altre parti del bot.
import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';
import fetch from 'node-fetch'; // Necessario per fetchare le immagini

let handler = async (m, { conn, usedPrefix }) => {
    // Estrai lo stato di TUTTE le funzionalità dalla configurazione della chat
    const {
        antiToxic,
        antilinkhard,
        antiPrivate,
        antitraba,
        antiArab,
        antiviewonce,
        isBanned,
        welcome,
        detect,
        sWelcome,
        sBye,
        sPromote,
        sDemote,
        antiLink,
        antilinkbase,
        antitiktok,
        sologruppo,
        soloprivato,
        antiCall,
        modohorny,
        gpt,
        antiinsta,
        antielimina,
        antitelegram,
        antiSpam,
        antiPorno,
        jadibot,
        autosticker,
        modoadmin,
        audios
    } = global.db.data.chats[m.chat];

    // Determina il JID del mittente per la foto profilo
    let senderJid = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender);
    const profilePicture = (await conn.profilePictureUrl(senderJid, "image").catch(() => null)) || "./src/avatar_contact.png";
    
    // Prepara la thumbnail per il messaggio quotato
    const thumbnail = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(); 

    // Oggetto fakeMessage per la quotazione
    const fakeMessage = {
        key: {
            participants: "0@s.whatsapp.net",
            fromMe: false,
            id: "FeaturesMenu", 
        },
        message: {
            locationMessage: {
                name: "🔍 *Menù delle Funzionalità* 🤖",
                jpegThumbnail: thumbnail, 
            },
        },
        participant: "0@s.whatsapp.net",
    };

    // Prepara il nome del bot per il footer della newsletter
    const botNewsletterName = ' ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」 ';

    // Costruisci il testo del menu con lo stile "cornice" e le emoji appropriate
    let menuText = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚙️ *STATO DELLE FUNZIONALITÀ* ⚙️
┊ ──────────────────────
┊ ${detect ? '✅' : '❌'} *detect* 🔍
┊ ${gpt ? '✅' : '❌'} *gpt* 🤖
┊ ${welcome ? '✅' : '❌'} *welcome* 👋🏻
┊ ${sologruppo ? '✅' : '❌'} *sologruppo* 👥
┊ ${soloprivato ? '✅' : '❌'} *soloprivato* 👤
┊ ${modoadmin ? '✅' : '❌'} *modoadmin* 👑
┊ ${antiCall ? '✅' : '❌'} *antiCall* 📵
┊ ${antiLink ? '✅' : '❌'} *antiLink* 🔗
┊ ${antiinsta ? '✅' : '❌'} *antiinsta* 📸
┊ ${antielimina ? '✅' : '❌'} *antielimina* ✏️
┊ ${antilinkhard ? '✅' : '❌'} *antilinkhard* ⛓️
┊ ${antiPrivate ? '✅' : '❌'} *antiPrivate* 🔒
┊ ${antitraba ? '✅' : '❌'} *antitraba* 🚧
┊ ${antiviewonce ? '✅' : '❌'} *antiviewonce* 👁️‍🗨️
┊ ${antitiktok ? '✅' : '❌'} *antitiktok* 🎶
┊ ${antitelegram ? '✅' : '❌'} *antitelegram* ✈️
┊ ${antiSpam ? '✅' : '❌'} *antiSpam* ✉️
┊ ${antiPorno ? '✅' : '❌'} *antiPorno* 🍑
┊ ${jadibot ? '✅' : '❌'} *jadibot* 🤖
┊ ${autosticker ? '✅' : '❌'} *autosticker* 🖼️
┊ ${audios ? '✅' : '❌'} *audios* 🔊
┊ ──────────────────────
┊ ℹ️ *Info sulle funzioni:*
┊  ${'✅'} » Funzione attivata
┊  ${'❌'} » Funzione disattivata
┊ ──────────────────────
┊ 🛠️ *Uso del comando:*
┊  ${'✅'} » \`${usedPrefix}attiva [funzione]\`
┊  ${'❌'} » \`${usedPrefix}disabilita [funzione]\`
┊ ──────────────────────
┊ ⚙️ *Info sullo stato del bot:*
┊  🔍 » \`${usedPrefix}infostato\`
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

    // Invia il messaggio
    conn.sendMessage(m.chat, {
        text: menuText.trim(),
        contextInfo: {
            mentionedJid: conn.parseMention(global.wm || botNewsletterName),
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363418973546282@newsletter",
                serverMessageId: '',
                newsletterName: botNewsletterName
            }
        }
    }, { quoted: fakeMessage });
};

handler.help = ["funzioni"];
handler.tags = ["main", "info"]; 
handler.command = /^(funzioni)$/i;

export default handler;

// La funzione clockString non è usata in questo handler, ma la mantengo per coerenza.
function clockString(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor(ms / 60000) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
}
