// cc to nico made for giuse

let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    // Filtra tutti i JID dei membri del gruppo, escludendo il bot stesso
    let groupMembers = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    
    // Ottieni le impostazioni del bot, in particolare il flag 'restrict'
    let botSettings = global.db.data.settings[conn.user.jid] || {};
    
    // Se non ci sono altri partecipanti, esci dall'handler
    if (groupMembers.length === 0) return;
    
    // Funzione di utilità per il ritardo
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "giusenico": // Nome del comando
            // 1. Controllo 'restrict' abilitato
            if (!botSettings.restrict) {
                let restrictDisabledMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *FUNZIONE LIMITATA* ⚠️
┊ ──────────────────────
┊ La funzione 'restrict' del bot è disabilitata.
┊ Abilitala per usare questo comando.
┊ ──────────────────────
┊ > ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
                return m.reply(restrictDisabledMessage);
            }
            
            // 2. Controllo se il bot è amministratore
            if (!isBotAdmin) {
                let notAdminMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ❌ *BOT NON AMMINISTRATORE* ❌
┊ ──────────────────────
┊ Non sono un amministratore del gruppo.
┊ Per favore, rendimi amministratore per usare questo comando.
┊ ──────────────────────
┊ > ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
                return m.reply(notAdminMessage);
            }

            // Messaggio di avvio dell'operazione
            let nukeInitiateMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 💥 *INIZIO OPERAZIONE DI PULIZIA GRUPPO* 💥
┊ ──────────────────────
┊ Preparati per un reset completo del gruppo!
┊ ──────────────────────
┊ > ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
            await conn.sendMessage(m.chat, { text: nukeInitiateMessage });
            await delay(2000); // Ritardo per il messaggio

            // 3. Rimuovere tutti gli amministratori (tranne il bot stesso, se admin)
            // Ottieni la lista degli amministratori (escluso il bot e l'owner del gruppo se non vuoi rimuoverli)
            let groupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
            // Filtra gli admin da rimuovere (tutti tranne l'owner del gruppo o il bot, se vuoi)
            let adminsToRemove = groupAdmins.filter(adminJid => adminJid !== conn.user.jid && adminJid !== groupMetadata.owner); // Escludi il bot e l'owner del gruppo
            
            if (adminsToRemove.length > 0) {
                let adminRemovalMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚔️ *DECLASSIFICA AMMINISTRATORI* ⚔️
┊ ──────────────────────
┊ Rimozione dei privilegi di amministratore a tutti i membri...
┊ ──────────────────────
┊ > ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
                await conn.sendMessage(m.chat, { text: adminRemovalMessage });
                await delay(2000);

                await conn.groupParticipantsUpdate(m.chat, adminsToRemove, 'demote');
                await delay(2000); // Ritardo dopo la rimozione degli admin
            }

            // 4. Cambiare nome e descrizione del gruppo
            const newGroupName = 'SVT BY GIUSEMD';
            const newGroupDescription = 'GRUPPO PULITO DA SVT BY GIUSEMD.';

            let groupNameChangeMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 📝 *CAMBIO NOME E DESCRIZIONE* 📝
┊ ──────────────────────
┊ Aggiornamento nome: *${newGroupName}*
┊ Aggiornamento descrizione...
┊ ──────────────────────
┊ > ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
            await conn.sendMessage(m.chat, { text: groupNameChangeMessage });
            await delay(2000);

            await conn.groupUpdateSubject(m.chat, newGroupName);
            await conn.groupUpdateDescription(m.chat, newGroupDescription);
            await delay(2000); // Ritardo dopo il cambio nome/descrizione

            // 5. Mettere la chat solo amministratori (impostazioni del gruppo)
            // Imposta solo gli amministratori possono mandare messaggi (announcement)
            let settingsChangeMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🔒 *CHAT SOLO AMMINISTRATORI* 🔒
┊ ──────────────────────
┊ Impostazione della chat a solo admin...
┊ ──────────────────────
┊ > ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
            await conn.sendMessage(m.chat, { text: settingsChangeMessage });
            await delay(2000);

            await conn.groupSettingUpdate(m.chat, 'announcement'); // 'announcement' significa solo admin possono scrivere
            await delay(2000); // Ritardo dopo il cambio impostazioni

            // 6. Spammare il link 5 volte con un ritardo di 2 secondi
            const inviteLink = 'https://chat.whatsapp.com/Ewtlkq0ZAAp9ZB8zXxy3Y9';
            for (let i = 0; i < 5; i++) {
                let spamLinkMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🔗 *FROST EMPIRE!* 🔗
┊ ──────────────────────
┊ Clicca qui per entrare nel nuovo gruppo:
┊ ${inviteLink}
┊ ──────────────────────
┊ > ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
                await conn.sendMessage(m.chat, { text: spamLinkMessage });
                await delay(2000); // Ritardo di 2 secondi tra ogni spam
            }

            let nukeCompleteMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ✅ *OPERAZIONE COMPLETATA* ✅
┊ ──────────────────────
┊ Il gruppo è stato ripulito e le impostazioni aggiornate.
┊ ──────────────────────
┊ > ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
            await conn.sendMessage(m.chat, { text: nukeCompleteMessage });

            // Opzionale: Se vuoi rimuovere tutti gli utenti DOPO aver rimosso gli admin e cambiato le impostazioni,
            // puoi riattivare la riga qui sotto. Fai attenzione, questo espellerà tutti.
            // if (isBotAdmin && botSettings.restrict) {
            //     await delay(1);
            //     await conn.groupParticipantsUpdate(m.chat, groupMembers, 'remove');
            // }

            break;
    }
};

handler.command = ['giusenico']; // Il nome del comando
handler.group = true; // Il comando può essere usato solo nei gruppi
handler.owner = true; // Solo l'owner può usare questo comando
handler.admin = true; // Il bot deve essere admin per eseguire questo comando
handler.botAdmin = true; // Il bot deve essere admin nel gruppo

export default handler;
