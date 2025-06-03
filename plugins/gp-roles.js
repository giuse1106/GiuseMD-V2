import fetch from 'node-fetch'; 

// Importa getRole. Assicurati che il percorso sia corretto.
import { getRole } from './info-msg.js'; 

let handler = async (m, { conn }) => {
    try {
        let totalUsers = 0;
        const rolesCount = {
            '👑 OWNER': 0,
            '❄️ FROST STAN': 0,
            '🤖 BOT': 0,
            '👤 UTENTE': 0,
        };

        const botJid = conn.user.jid;
        const emptyGroupAdmins = []; // Non utilizzato per il conteggio globale qui

        // Itera su tutti gli utenti nel database
        for (const userId in global.db.data.users) {
            totalUsers++;
            const userData = global.db.data.users[userId];
            
            let finalRole;

            // PRIORITÀ 1: Ruoli impostati manualmente nel database
            if (userData.role) {
                finalRole = userData.role;
            } 
            // PRIORITÀ 2: OWNER
            else if (global.owner.some(o => o[0] === userId.split('@')[0])) {
                finalRole = '👑 OWNER';
            }
            // PRIORITÀ 3: FROST STAN
            else if (userData.name && (userData.name.includes('#FROST') || userData.name.includes('#frost'))) {
                finalRole = '❄️ FROST STAN';
            }
            // PRIORITÀ 4: BOT
            else if (userId === botJid) {
                finalRole = '🤖 BOT';
            }
            // PRIORITÀ FINALE: UTENTE
            else {
                finalRole = '👤 UTENTE';
            }

            // Incrementa il contatore del ruolo
            if (rolesCount[finalRole] !== undefined) {
                rolesCount[finalRole]++;
            } else {
                console.warn(`Ruolo sconosciuto rilevato per ${userId}: ${finalRole}. Assegnato a UTENTE.`);
                rolesCount['👤 UTENTE']++; 
            }
        }

        let replyMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 📊 *Statistiche Ruoli Utenti*
┊ ──────────────────────
`;
        for (const role in rolesCount) {
            replyMessage += `┊ ${role}: *${rolesCount[role]}* persone
`;
        }
        replyMessage += `┊ ──────────────────────
┊ 👥 *Totale Utenti Registrati:* *${totalUsers}*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

        let groupPicUrl;
        let imageBuffer;

        // Tenta di ottenere l'immagine del gruppo solo se il comando è stato invocato in un gruppo
        if (m.isGroup) {
            groupPicUrl = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png');
        } else {
            // Se non è un gruppo, usa un'immagine di default o un placeholder
            groupPicUrl = 'https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png'; 
        }
        imageBuffer = await fetch(groupPicUrl).then(res => res.buffer());


        await conn.sendMessage(m.chat, {
            text: replyMessage,
            contextInfo: {
                externalAdReply: {
                    title: `📊 Statistiche Ruoli`, // Titolo dell'embed
                    body: `Totale Utenti: ${totalUsers}`, // Corpo dell'embed
                    mediaType: 1, // 1 per immagine, 2 per video
                    renderLargerThumbnail: true, // Mostra la thumbnail più grande
                    thumbnail: imageBuffer, // L'immagine del gruppo
                    sourceUrl: `https://whatsapp.com/channel/0029VaI5z5p0VqQ353rFv70F` // URL fittizio o un link rilevante
                },
                forwardingScore: 1, // Punteggio di inoltro
                isForwarded: true, // Indica che è un messaggio inoltrato (visivamente)
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418973546282@newsletter', // JID della newsletter
                    serverMessageId: '', // ID del messaggio del server (lasciato vuoto)
                    newsletterName: global.config?.bot?.name || '꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」' // Nome della newsletter (o nome del bot)
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error("Errore nel comando ruoli:", error);
        conn.reply(m.chat, `❌ Errore nell'esecuzione del comando! ${error.message || ''}`, m);
    }
};

handler.command = /^(ruoli|roles)$/i; 
export default handler;
