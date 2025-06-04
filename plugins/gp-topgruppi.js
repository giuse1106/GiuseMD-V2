// Crediti By Giuse
import { format } from 'human-readable'; // Per formattare i numeri grandi
const formatNumber = (n) => format(n, { separator: ',', unit: '' });

let handler = async (m, { conn, usedPrefix, command }) => {
    // Prepara il nome del bot per il footer
    const botNewsletterName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」";

    // Filtra le chat che sono gruppi e hanno un contatore di messaggi
    const groupChats = Object.entries(global.db.data.chats)
        .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.messages)
        .map(([jid, chat]) => ({
            jid,
            name: chat.name || 'Nome Sconosciuto', // Prende il nome del gruppo
            messages: chat.messages
        }));

    // Ordina i gruppi per numero di messaggi in ordine decrescente
    groupChats.sort((a, b) => b.messages - a.messages);

    // Prende la top 10
    const top10Groups = groupChats.slice(0, 10);

    let topGroupsMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🏆 *TOP 10 GRUPPI CON PIÙ MESSAGGI* 🏆
┊ ──────────────────────\n`;

    if (top10Groups.length === 0) {
        topGroupsMessage += `┊ ➡️ Nessun dato disponibile. Assicurati che il bot stia contando i messaggi.\n`;
    } else {
        for (let i = 0; i < top10Groups.length; i++) {
            const group = top10Groups[i];
            const groupMetadata = await conn.groupMetadata(group.jid).catch(() => null);
            const memberCount = groupMetadata ? groupMetadata.participants.length : 'N/A';

            topGroupsMessage += `┊ 🥇 *${i + 1}.* *${group.name}*
┊    👥 Membri: ${memberCount}
┊    💬 Messaggi: ${formatNumber(group.messages)}\n`;
            if (i < top10Groups.length - 1) {
                topGroupsMessage += `┊ ──────────────────────\n`;
            }
        }
    }

    topGroupsMessage += `╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

    await conn.reply(m.chat, topGroupsMessage, m);
};

handler.help = ['topgruppi'];
handler.tags = ['stats'];
handler.command = ['topgruppi'];
handler.group = true; // Può essere usato nei gruppi
handler.fail = null;

export default handler;
