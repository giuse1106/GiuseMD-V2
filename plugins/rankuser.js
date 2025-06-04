// Crediti By Giuse
import { format } from 'human-readable';
const formatNumber = (n) => format(n, { separator: ',', unit: '' });

let handler = async (m, { conn, usedPrefix, command, text }) => {
    // Prepara il nome del bot per il footer
    const botNewsletterName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」";

    // Determina l'utente di cui mostrare il rank
    let targetJid;
    if (m.mentionedJid[0]) { // Se viene menzionato qualcuno
        targetJid = m.mentionedJid[0];
    } else if (m.quoted) { // Se viene quotato un messaggio
        targetJid = m.quoted.sender;
    } else { // Altrimenti, l'utente che ha invocato il comando
        targetJid = m.sender;
    }

    const targetUser = global.db.data.users[targetJid];

    if (!targetUser || !targetUser.messages) {
        let notFoundMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *UTENTE NON TROVATO O SENZA DATI* ⚠️
┊ ──────────────────────
┊ Non ho trovato dati sui messaggi per questo utente.
┊ Assicurati che l'utente abbia inviato almeno un messaggio
┊ da quando il bot ha iniziato a contare.
┊ ──────────────────────
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
        return conn.reply(m.chat, notFoundMessage, m, { mentions: [targetJid] });
    }

    // Ottieni tutti gli utenti con contatori di messaggi
    const allUsersWithMessages = Object.entries(global.db.data.users)
        .filter(([, user]) => user.messages)
        .map(([jid, user]) => ({
            jid,
            name: user.name || jid.split('@')[0],
            messages: user.messages
        }));

    // Ordina gli utenti per numero di messaggi in ordine decrescente
    allUsersWithMessages.sort((a, b) => b.messages - a.messages);

    // Trova la posizione dell'utente target
    const userRank = allUsersWithMessages.findIndex(user => user.jid === targetJid) + 1;

    let rankMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 👤 *RANK UTENTE* 👤
┊ ──────────────────────
┊ *Nome Utente:* @${targetUser.name || targetJid.split('@')[0]}
┊ *Posizione:* ${userRank} di ${allUsersWithMessages.length}
┊ *Messaggi Inviati:* ${formatNumber(targetUser.messages)}
┊ ──────────────────────
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

    await conn.reply(m.chat, rankMessage, m, { mentions: [targetJid] });
};

handler.help = ['rankuser', 'rankuser @<utente>', 'rankuser <rispondi al messaggio>'];
handler.tags = ['stats'];
handler.command = ['rankuser'];
handler.fail = null;

export default handler;
