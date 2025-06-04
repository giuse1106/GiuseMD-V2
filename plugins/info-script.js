import moment from 'moment-timezone'; // Renamed from _0x4b8137 for clarity
import fetch from 'node-fetch'; // Renamed from _0x2c74f8 for clarity

let handler = async (m, { conn }) => { // Renamed m from _0x221549, conn from _0xf8de2c, removed unused args
    try {
        const repoUrl = 'https://api.github.com/repos/giuse1106/GiuseMD-V2';
        const githubResponse = await fetch(repoUrl);
        const repoData = await githubResponse.json();

        // Estrai le informazioni necessarie
        const repoName = repoData.name;
        const watchersCount = repoData.watchers_count;
        const sizeMB = (repoData.size / 1024).toFixed(2); // Converti in MB e formatta
        const updatedAt = moment(repoData.updated_at).format("DD/MM/YY - HH:mm:ss");
        const htmlUrl = repoData.html_url;
        const forksCount = repoData.forks_count;
        const starsCount = repoData.stargazers_count;
        const openIssuesCount = repoData.open_issues_count;
        const authorText = global.author || 'Sconosciuto'; // Assuming 'author' is globally defined

        // Costruisci il messaggio formattato con il tuo stile
        const formattedMessage = `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ *꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」  | Dettagli Repo*
┊ ──────────────────────
┊ 📝 *Nome:* ${repoName}
┊ 👀 *Visitatori:* ${watchersCount}
┊ 📊 *Dimensione:* ${sizeMB} MB
┊ 📅 *Aggiornato:* ${updatedAt}
┊ 🔗 *Link:* ${htmlUrl}
┊ ──────────────────────
┊ 🍴 *Forks:* ${forksCount}
┊ ⭐ *Stars:* ${starsCount}
┊ ❗ *Issues:* ${openIssuesCount}
┊ ──────────────────────
┊ 🧑‍💻 *Autore:* ${authorText}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;

        // Prepara l'embed con il vcard (come nel tuo esempio originale)
        const contextInfoEmbed = {
            'key': {
                'participants': "0@s.whatsapp.net",
                'fromMe': false,
                'id': "RepoInfo" // ID unico per questo embed
            },
            'message': {
                'extendedTextMessage': {
                    'text': "꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」 ", // Questo testo appare sopra il vCard
                    'vcard': `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
                }
            },
            'participant': '0@s.whatsapp.net'
        };

        // Invia il messaggio formattato con l'embed
        await conn.reply(m.chat, formattedMessage, null, { quoted: contextInfoEmbed });

    } catch (error) {
        console.error('Errore nel comando script:', error);
        await conn.reply(m.chat, '❌ Si è verificato un errore durante il recupero delle informazioni del repository.', m);
    }
};

handler.help = ["script", "scbot"]; // Include entrambi per flessibilità
handler.tags = ["info"];
handler.command = /^(script|scbot)$/i; // Comandi supportati

export default handler;
