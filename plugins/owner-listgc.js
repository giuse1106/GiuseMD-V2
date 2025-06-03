import '@whiskeysockets/baileys';

let handler = async (m, { conn, isOwner, participants }) => {
    // Assicurati che solo l'owner possa usare questo comando
    if (!isOwner) {
        return conn.reply(m.chat, 'Questo comando può essere usato solo dal proprietario del bot.', m);
    }

    // Se il comando viene eseguito in un gruppo, avvisa l'owner che la lista è stata inviata in privato
    if (m.isGroup) {
        // Estrai il JID del proprietario da global.owner
        const ownerJid = global.owner[0] ? global.owner[0][0] + '@s.whatsapp.net' : null;
        
        if (ownerJid) {
            // Menziona l'owner nel gruppo
            await conn.sendMessage(m.chat, {
                text: `Ciao @${ownerJid.split('@')[0]}, ti ho inviato la lista dei gruppi in privato!`,
                mentions: [ownerJid]
            }, { quoted: m });
        } else {
            await conn.reply(m.chat, 'Non riesco a trovare il JID del proprietario per inviare il messaggio privato.', m);
        }
    }

    try {
        // Ottieni tutti i gruppi in cui il bot è presente
        const groups = Object.values(await conn.groupFetchAllParticipating());
        const totalGroups = groups.length;

        // Recupera il nome del bot
        const botName = global.config?.bot?.name || conn.user.name || 'Bot';

        // Costruisci il messaggio iniziale
        let responseMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🤖 *Nome Bot:* ${botName}
┊ 📊 *Gruppi Totali:* ${totalGroups}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

        // Aggiungi i dettagli di ogni gruppo
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

        // Estrai il JID del proprietario dal global.owner per l'invio privato
        const ownerJid = global.owner[0] ? global.owner[0][0] + '@s.whatsapp.net' : null;

        if (ownerJid) {
            // Invia il messaggio in privato al proprietario
            await conn.reply(ownerJid, responseMessage);
        } else {
            console.error('Errore: JID del proprietario non trovato in global.owner.');
            await conn.reply(m.chat, 'Errore: Non riesco a trovare il JID del proprietario per inviare la lista in privato.', m);
        }

    } catch (e) {
        console.error('Errore durante il recupero dei gruppi:', e);
        await conn.reply(m.chat, 'Si è verificato un errore durante il recupero della lista dei gruppi.', m);
    }
};

handler.command = /^(listgc)$/i;
handler.owner = true; // Indica che solo l'owner può usare questo comando
handler.private = false; // Permette di eseguire il comando sia in privato che nei gruppi
handler.fail = null;

export default handler;
