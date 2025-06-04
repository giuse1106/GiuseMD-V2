import '@whiskeysockets/baileys'; // Importa le dipendenze necessarie

let handler = async (m, { conn, isOwner }) => {
    // Questo comando è solo per il proprietario del bot.
    if (!isOwner) {
        return conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🚫 *ACCESSO NEGATO* 🚫
┊ ──────────────────────
┊ Questo comando può essere usato solo dal
┊ *proprietario* del bot.
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
    }

    try {
        // Recupera tutti i gruppi a cui il bot partecipa
        const groups = Object.values(await conn.groupFetchAllParticipating());
        const totalGroups = groups.length;

        // Recupera il nome del bot per il footer, se disponibile
        const botName = global.config?.bot?.name || conn.user.name || 'Bot';

        // Messaggio iniziale con il conteggio totale dei gruppi
        let responseMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 📋 *LISTA GRUPPI BOT* 📋
┊ ──────────────────────
┊ 🤖 *Nome Bot:* ${botName}
┊ 📊 *Gruppi Totali:* ${totalGroups}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

        // Itera su ogni gruppo per costruire i dettagli
        for (let i = 0; i < totalGroups; i++) {
            const group = groups[i];
            const groupName = group.subject;
            const memberCount = group.participants.length;
            const groupId = group.id;
            let groupInviteLink = 'N/A'; // Inizializza il link come non disponibile

            try {
                // Tenta di ottenere il link di invito del gruppo
                groupInviteLink = await conn.groupInviteCode(groupId);
                groupInviteLink = `https://chat.whatsapp.com/${groupInviteLink}`;
            } catch (e) {
                // Se il bot non è admin o non può generare il link, cattura l'errore
                console.error(`Impossibile ottenere il link di invito per il gruppo ${groupName} (${groupId}):`, e);
                groupInviteLink = 'Link non disponibile (il bot potrebbe non essere admin)';
            }

            // Aggiungi i dettagli di ogni gruppo al messaggio, includendo il link
            responseMessage += `\n\n╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🔢 *Gruppo N°${i + 1}*
┊ ──────────────────────
┊ 📝 *Nome:* ${groupName}
┊ 👥 *Membri:* ${memberCount}
┊ 🆔 *ID:* ${groupId}
┊ 🔗 *Link:* ${groupInviteLink}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
        }

        // Invia il messaggio con la lista di tutti i gruppi nella chat corrente
        await conn.reply(m.chat, responseMessage, m);

    } catch (e) {
        console.error('Errore durante il recupero dei gruppi:', e);
        // Messaggio di errore inviato nella chat corrente
        await conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ❌ *ERRORE!* ❌
┊ ──────────────────────
┊ Si è verificato un errore durante il recupero della
┊ lista dei gruppi. Riprova più tardi.
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
    }
};

handler.command = /^(listgc)$/i; // Comando per l'handler
handler.owner = true; // Indica che solo l'owner può usare questo comando
handler.fail = null; // Gestione del fallimento

export default handler;
