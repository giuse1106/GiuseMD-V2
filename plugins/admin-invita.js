import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Nome del bot per il footer e le menzioni
    const botNewsletterName = global.db.data.nomedelbot || "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」";

    // Controlla se il bot è admin nel gruppo. Essenziale per generare il link di invito.
    if (!m.isGroup) {
        return m.reply(`╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ❌ *COMANDO SOLO PER GRUPPI* ❌
┊ ──────────────────────
┊ Questo comando può essere usato solo all'interno di un gruppo.
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`);
    }
    
    let isBotAdmin = await conn.groupMetadata(m.chat).then(g => g.participants.find(p => p.id === conn.user.jid)?.admin);
    if (!isBotAdmin) {
        return m.reply(`╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *BOT NON AMMINISTRATORE* ⚠️
┊ ──────────────────────
┊ Per invitare qualcuno, il bot deve essere un amministratore del gruppo.
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`);
    }

    // Estrai il numero dal comando
    // accetta sia un numero puro che un numero con prefisso internazionale
    let number = args[0]?.replace(/[^0-9]/g, ''); 
    if (!number) {
        return m.reply(`╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *UTILIZZO CORRETTO DEL COMANDO* ⚠️
┊ ──────────────────────
┊ Inserisci il numero da invitare dopo il comando.
┊ 
┊ 💡 *Esempio:*
┊  \`${usedPrefix}${command} 393401234567\`
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`);
    }

    // Assicurati che il numero abbia il prefisso WhatsApp
    if (!number.endsWith('@s.whatsapp.net')) {
        number += '@s.whatsapp.net';
    }

    // Ottieni il nome del gruppo
    const groupName = (await conn.groupMetadata(m.chat)).subject;
    // Ottieni il link di invito del gruppo
    const groupInviteLink = await conn.groupInviteCode(m.chat);
    const fullInviteLink = `https://chat.whatsapp.com/${groupInviteLink}`;

    // Crea il messaggio da inviare all'utente invitato
    const inviteMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┊ ┊ 👥 𝐈𝐍𝐕𝐈𝐓𝐎 𝐀𝐋 𝐆𝐑𝐔𝐏𝐏𝐎 👥
┊ ╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┊ ╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┊ ┊ 𝐂𝐢𝐚𝐨 @${𝐧𝐮𝐦𝐛𝐞𝐫.𝐬𝐩𝐥𝐢𝐭('@')[0]}, 𝐬𝐨𝐧𝐨 @${𝐜𝐨𝐧𝐧.𝐮𝐬𝐞𝐫.𝐣𝐢𝐝.𝐬𝐩𝐥𝐢𝐭('@')[0]} 𝐞 
┊ ┊ 𝐬𝐨𝐧𝐨 𝐮𝐧 𝐛𝐨𝐭! @${𝐦.𝐬𝐞𝐧𝐝𝐞𝐫.𝐬𝐩𝐥𝐢𝐭('@')[0]} 𝐦𝐢 𝐡𝐚 𝐜𝐡𝐢𝐞𝐬𝐭𝐨 𝐝𝐢 𝐢𝐧𝐯𝐢𝐭𝐚𝐫𝐭𝐢 𝐢𝐧 
┊ ┊ 𝐪𝐮𝐞𝐬𝐭𝐨 𝐠𝐫𝐮𝐩𝐩𝐨: *#${𝐠𝐫𝐨𝐮𝐩𝐍𝐚𝐦𝐞}*
┊ ╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┊ ╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┊ ┊ 🔗 ${fullInviteLink}
┊ ╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┊ ${botName}   -  𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞: ${vs}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

    try {
        // Invia il messaggio di invito all'utente specificato
        await conn.sendMessage(number, {
            text: inviteMessage,
            contextInfo: {
                mentionedJid: [number, conn.user.jid, m.sender], // Menziona l'invitato, il bot e chi ha invitato
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363418973546282@newsletter", // JID di una newsletter di esempio
                    serverMessageId: '',
                    newsletterName: botNewsletterName
                }
            }
        });

        // Messaggio di conferma nella chat del bot
        await conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ✅ *INVITO INVIATO* ✅
┊ ──────────────────────
┊ L'invito al gruppo è stato inviato a @${number.split('@')[0]}.
┊ Spero che si unisca presto!
┊ ──────────────────────
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m, { mentions: [number] });

    } catch (error) {
        console.error("Errore durante l'invio dell'invito:", error);
        await conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ❌ *ERRORE NELL'INVITO* ❌
┊ ──────────────────────
┊ Si è verificato un errore durante l'invio dell'invito a @${number.split('@')[0]}.
┊ L'utente potrebbe avere le impostazioni di privacy che impediscono l'invito.
┊ ──────────────────────
┊ > ${botNewsletterName}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m, { mentions: [number] });
    }
};

handler.help = ['invita <numero>'];
handler.tags = ['group'];
handler.command = ['invita', 'invite'];
handler.group = true; // Funziona solo nei gruppi
handler.botAdmin = true; // Il bot deve essere admin per invitare
handler.fail = null;

export default handler;
