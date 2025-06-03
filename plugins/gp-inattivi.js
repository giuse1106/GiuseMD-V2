import '@whiskeysockets/baileys';
import fetch from 'node-fetch'; // Necessario per scaricare le immagini delle thumbnail

let handler = async (m, {
    conn,
    text,
    participants,
    command
}) => {
    let allParticipantsJids = participants.map(p => p.id);

    let checkLimit = text ? parseInt(text) : allParticipantsJids.length;

    let inactiveCount = 0;
    let inactiveUsersJids = [];

    for (let i = 0; i < checkLimit; i++) {
        const participantJid = allParticipantsJids[i];
        const participantDetails = m.isGroup ? participants.find(p => p.id === participantJid) : {};

        const userData = global.db.data.users[participantJid];

        const isInactiveInDb = (typeof userData === "undefined" || userData.chat === 0);
        const isNotAdmin = !participantDetails.admin && !participantDetails.superAdmin;
        const isNotWhitelisted = typeof userData === 'undefined' || userData.whitelist === false;

        if (isInactiveInDb && isNotAdmin && isNotWhitelisted) {
            inactiveCount++;
            inactiveUsersJids.push(participantJid);
        }
    }

    // --- Preparazione delle Immagini e dell'Embed di Posizione Fake ---
    let thumbnailBuffer;
    let locationName; // Questo sarà il 'name' del locationMessage

    if (command === "inattivi") {
        locationName = `😴 Revisione Inattivi | ${await conn.getName(m.chat)}`;
        let groupPicUrl = 'https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png'; // Immagine di default
        if (m.isGroup) {
            groupPicUrl = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png');
        }
        thumbnailBuffer = await fetch(groupPicUrl).then(res => res.buffer()).catch(() => Buffer.from(''));

    } else if (command === "viainattivi") {
        locationName = `🚫 Rimozione Inattivi`;
        // Immagine specifica per l'avviso di rimozione (puoi cambiarla)
        const warningImageUrl = 'https://telegra.ph/file/5a5c6c0b3b4f6e0b7f8c0.jpg'; // Esempio: immagine di avviso
        thumbnailBuffer = await fetch(warningImageUrl).then(res => res.buffer()).catch(() => Buffer.from(''));
    }

    // Costruisci l'oggetto locationFake una volta, riutilizzandolo
    const locationFake = {
        key: {
            participants: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'inattivi-bot-info', // ID univoco per questo comando
        },
        message: {
            locationMessage: {
                name: locationName, // Nome della posizione
                jpegThumbnail: thumbnailBuffer, // La tua thumbnail
            },
        },
        participant: '0@s.whatsapp.net',
    };


    switch (command) {
        case "inattivi":
            if (inactiveCount === 0) {
                return conn.reply(m.chat, "𝐧𝐞𝐬𝐬𝐮𝐧 𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐨", m);
            }

            const inactiveListMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 😴 *Revisione Inattivi*
┊ ──────────────────────
┊ 👥 *Gruppo:* ${await conn.getName(m.chat)}
┊ 📊 *Inattivi Trovati:* ${inactiveUsersJids.length}
┊ ──────────────────────
${inactiveUsersJids.map(jid => `┊ 👉🏻 @${jid.replace(/@.+/, '')}`).join("\n")}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

            await conn.sendMessage(m.chat, {
                text: inactiveListMessage,
                mentions: inactiveUsersJids, // Le menzioni sono qui
                // contextInfo non contiene più forwardedNewsletterMessageInfo
            }, { quoted: locationFake }); // L'embed di posizione viene passato come 'quoted'
            break;

        case "viainattivi":
            if (inactiveCount === 0) {
                return conn.reply(m.chat, "𝐧𝐞𝐬𝐬𝐮𝐧 𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐨", m);
            }

            const removeMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🚫 *Rimozione Inattivi*
┊ ──────────────────────
┊ *Questi utenti verranno rimossi:*
${inactiveUsersJids.map(jid => `┊ 👉🏻 @${jid.replace(/@.+/, '')}`).join("\n")}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

            await conn.sendMessage(m.chat, {
                text: removeMessage,
                mentions: inactiveUsersJids, // Le menzioni sono qui
                // contextInfo non contiene più forwardedNewsletterMessageInfo
            }, { quoted: locationFake }); // L'embed di posizione viene passato come 'quoted'

            await conn.groupParticipantsUpdate(m.chat, inactiveUsersJids, "remove");
            break;
    }
};

handler.command = /^(inattivi|viainattivi)$/i;
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;

export default handler;
