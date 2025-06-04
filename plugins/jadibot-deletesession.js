import { promises as fs } from "fs";

let handler = async (m, { conn, usedPrefix, command }) => {
    // Determina l'ID dell'utente target
    // In questo caso, il comando mira all'utente che lo esegue, quindi usiamo m.sender.
    // Ho rimosso il controllo m.mentionedJid e m.fromMe perché il comando è per l'utente stesso.
    let userId = m.sender;
    let uniqueId = userId.split('@')[0];
    let userName = conn.getName(userId);

    try {
        // Tenta di rimuovere la cartella della sessione dell'utente
        await fs.rm(`./jadibts/${uniqueId}`, { recursive: true, force: true });
        
        // Messaggio di successo
        await conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ✅ *Sessione SubBot Eliminata!*
┊ ──────────────────────
┊ *La sessione SubBot di ${userName} è stata rimossa con successo.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);

    } catch (err) {
        // Se la cartella non esiste (ENOENT), l'utente non ha sessioni collegate
        if (err.code === 'ENOENT' && err.path === `./jadibts/${uniqueId}`) {
            await conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⓘ *Nessuna Sessione Trovata*
┊ ──────────────────────
┊ *${userName}, non hai sessioni SubBot collegate.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
        } else {
            // Per altri tipi di errori
            console.error('Errore durante l\'eliminazione della sessione:', err);
            await conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ❌ *Errore Durante l'Eliminazione*
┊ ──────────────────────
┊ *Si è verificato un errore inaspettato durante l'eliminazione della sessione.*
┊ *Dettagli: ${err.message || 'Nessun dettaglio specifico.'}*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
        }
    }
};

// Array dei comandi supportati
handler.command = ['deletebot', 'delsession', 'delessione', 'delsessión', 'delsesion', 'delsesión', 'deletesession', 'deletesesion', 'deletesesión', 'deletesessión', 'eliminarsession'];
handler.private = true; // Indica che il comando funziona solo in chat private con il bot

export default handler;
