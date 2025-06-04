// Crediti By Giuse
import { format } from 'human-readable';
const formatNumber = (n) => format(n, { separator: ',', unit: '' });

let handler = async (m, { conn, usedPrefix, command }) => {
    // Prepara il nome del bot per il footer
    const botNewsletterName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」";

    // Filtra gli utenti che hanno un contatore di messaggi
    const usersWithMessages = Object.entries(global.db.data.users)
        .filter(([, user]) => user.messages)
        .map(([jid, user]) => ({
            jid,
            name: user.name || jid.split('@')[0], // Prende il nome utente
            messages: user.messages
        }));

    // Ordina gli utenti per numero di messaggi in ordine decrescente
    usersWithMessages.sort((a, b) => b.messages - a.messages);

    // Prende la top 10
    const top10Users = usersWithMessages.slice(0, 10);

    let topUsersMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🥇 *TOP 10 UTENTI CON PIÙ MESSAGGI* 🥇
┊ ──────────────────────\n`;

    if (top10Users.length === 0) {
        topUsersMessage += `┊ ➡️ Nessun dato disponibile. Assicurati che il bot stia contando i messaggi.\n`;
    } else {
        for (let i = 0; i < top10Users.length; i++) {
            const user = top10Users[i];
            
            // Trova il gruppo più recente in cui l'utente ha interagito (o un gruppo a caso)
            let groupName = 'N/A';
            if (m.isGroup) { // Se il comando è eseguito in un gruppo, mostra il nome di quel gruppo
                groupName = (await conn.groupMetadata(m.chat)).subject;
            } else { // Altrimenti, cerca un gruppo a caso o lascia N/A
                const chatEntry = Object.values(global.db.data.chats).find(chat => chat.jid?.endsWith('@g.us') && chat.messages > 0);
                if (chatEntry) groupName = chatEntry.name || 'Gruppo Sconosciuto';
            }


            topUsersMessage += `┊ 🏆 *${i + 1}.* *${user.name}*
┊    💬 Messaggi: ${formatNumber(user.messages)}\n`;
            // Ho rimosso il "Gruppo: ${groupName}" dato che topusergc prende da tutti i gruppi
            // Se vuoi mostrare un gruppo specifico, devi salvare il "last_group_id" per ogni utente.
            if (i < top10Users.length - 1) {
                topUsersMessage += `┊ ──────────────────────\n`;
            }
        }
    }

    topUsersMessage += `╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

    await conn.reply(m.chat, topUsersMessage, m);
};

handler.help = ['topusergc'];
handler.tags = ['stats'];
handler.command = ['topusergc'];
handler.fail = null;

export default handler;
