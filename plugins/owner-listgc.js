import '@whiskeysockets/baileys';

let handler = async (m, { conn, isOwner }) => {
    // Questo comando è solo per il proprietario del bot.
    if (!isOwner) {
        return conn.reply(m.chat, 'Questo comando può essere usato solo dal proprietario del bot.', m);
    }

    // Il JID dell'utente che ha eseguito il comando (che sappiamo essere un owner)
    const commandSenderJid = m.sender;

    // Se il comando viene eseguito in un gruppo, avvisa l'owner che la lista è stata inviata in privato
    if (m.isGroup) {
        await conn.sendMessage(m.chat, {
            text: `Ciao @${commandSenderJid.split('@')[0]}, ti ho inviato la lista dei gruppi in privato!`,
            mentions: [commandSenderJid]
        }, { quoted: m });
    }

    try {
        const groups = Object.values(await conn.groupFetchAllParticipating());
        const totalGroups = groups.length;

        const botName = global.config?.bot?.name || conn.user.name || 'Bot';

        let responseMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🤖 *Nome Bot:* ${botName}
┊ 📊 *Gruppi Totali:* ${totalGroups}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

        for (let i = 0; i < totalGroups; i++) {
            const group = groups[i];
            const groupName = group.subject;
            const memberCount = group.participants.length;
            const groupId = group.id;

            responseMessage += `\n\n╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🔢 *Gruppo N°${i + 1}*
┊ ──────────────────────
┊ 📝 *Nome:* ${groupName}
┊ 👥 *Membri:* ${memberCount}
┊ 🆔 *ID:* ${groupId}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
        }

        // Invia il messaggio con la lista dei gruppi in privato all'owner che ha eseguito il comando
        await conn.reply(commandSenderJid, responseMessage);

    } catch (e) {
        console.error('Errore durante il recupero dei gruppi:', e);
        // Messaggio di errore inviato all'owner che ha eseguito il comando
        await conn.reply(commandSenderJid, 'Si è verificato un errore durante il recupero della lista dei gruppi.', m);
    }
};

handler.command = /^(listgc)$/i;
handler.owner = true; // Indica che solo l'owner può usare questo comando
handler.fail = null;

export default handler;
