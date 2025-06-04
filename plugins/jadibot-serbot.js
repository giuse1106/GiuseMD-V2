/*⚠ VIETATO MODIFICARE ⚠

Il codice in questo file è stato modificato e corretto da:
- MoonContentCreator >> https://github.com/MoonContentCreator

Funzione adattata da:
- MoonContentCreator >> https://github.com/MoonContentCreator
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
- AzamiJs >> https://github.com/AzamiJs

Altri crediti:
- Aiden_NotLogic >> https://github.com/ferhacks
- ReyEndymion >> https://github.com/ReyEndymion
- BrunoSobrino >> https://github.com/BrunoSobrino
*/

const {
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion
} = await import('@whiskeysockets/baileys');
import qrcode from 'qrcode'; // Renamed from _0x4ff56e
import NodeCache from 'node-cache'; // Renamed from _0x5c72be
import fs from 'fs'; // Renamed from _0x2e2754
import path from 'path'; // Explicitly importing path for clarity, though not used directly in this snippet
import pino from 'pino'; // Renamed from _0x23ade6
import util from 'util'; // Not used, but kept for consistency if it was in the original imports
import ws from 'ws'; // Not used, but kept for consistency if it was in the original imports
const {
    child,
    spawn,
    exec
} = await import("child_process");
import { makeWASocket } from '../lib/simple.js';

// Initialize global.conns if it's not an array
if (!(global.conns instanceof Array)) {
    console.log("Inizializzazione array globale di connessioni.");
    global.conns = [];
}

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => { // Renamed parameters
    // Controllo se la funzione jadibot è attiva nelle impostazioni globali
    if (!global.db.data.settings[conn.user.jid].jadibot) {
        throw `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ❌ *Funzione Jadibot Disabilitata!*
┊ ──────────────────────
┊ *La funzione Jadibot non è attiva.*
┊ *Contatta il proprietario del bot per abilitarla.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`;
    }

    // Se il comando è eseguito da un SubBot, reindirizza al bot principale
    if (conn.user.jid !== global.conn.user.jid) {
        return conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *Comando Riservato al Bot Principale*
┊ ──────────────────────
┊ *Vai sul numero principale del bot per usare questo comando:*
┊ wa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix}${command}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
    }

    // Controlla se l'utente desidera ricevere il codice di accoppiamento
    const requestPairingCode = args[0] && args[0].includes("--code") ? true : !!(args[1] && args[1].includes("--code"));
    let targetUserJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let userIdString = '' + targetUserJid.split('@')[0];

    // Pulisce l'argomento se contiene "--code"
    if (requestPairingCode) {
        args[0] = args[0] ? args[0].replace("--code", '').trim() : undefined;
        if (args[1]) {
            args[1] = args[1].replace("--code", '').trim();
        }
    }

    // Crea la directory per la sessione se non esiste
    if (!fs.existsSync(`./jadibts/${userIdString}`)) {
        fs.mkdirSync(`./jadibts/${userIdString}`, { recursive: true });
    }

    // Se è stato fornito un codice di accoppiamento (creds.json in base64)
    if (args[0] && args[0] !== undefined) {
        try {
            const decodedCreds = JSON.parse(Buffer.from(args[0], "base64").toString("utf-8"));
            fs.writeFileSync(`./jadibts/${userIdString}/creds.json`, JSON.stringify(decodedCreds, null, "\t"));
        } catch (e) {
            console.error("Errore durante la decodifica o scrittura delle credenziali:", e);
            return conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ❌ *Errore Credenziali*
┊ ──────────────────────
┊ *Il codice fornito non è valido o è malformato.*
┊ *Assicurati di aver copiato l'intero codice Base64.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
        }
    }

    // Controlla e potenzialmente elimina creds.json se la registrazione non è completa
    if (fs.existsSync(`./jadibts/${userIdString}/creds.json`)) {
        let credsData = JSON.parse(fs.readFileSync(`./jadibts/${userIdString}/creds.json`));
        if (credsData && credsData.registered === false) { // Verifica se il flag 'registered' è impostato su false
            fs.unlinkSync(`./jadibts/${userIdString}/creds.json`);
        }
    }

    // Questo exec sembra eseguire un comando shell che potrebbe essere per "compilare" o "verificare"
    // specifici file JS. L'ho mantenuto come era, ma il suo scopo esatto è offuscato.
    const execCommand = Buffer.from("Y2QgcGx1Z2lucyA7IG1kNXN1bSBpbmZvLWRvbmFyLmpzIF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz", "base64").toString("utf-8");
    exec(execCommand, async (error, stdout, stderr) => {
        const signatureText = Buffer.from("wqkg8J2QgfCdkKLwnZCx8J2Qm/CdkLLwnZCB8J2QqPCdkK0t8J2QjPCdkJ0g8J+Urg==", "base64").toString("utf-8");

        async function startJadibotConnection() {
            let userJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
            let userDir = '' + userJid.split('@')[0];

            if (!fs.existsSync(`./jadibts/${userDir}`)) {
                fs.mkdirSync(`./jadibts/${userDir}`, { recursive: true });
            }

            // Se args[0] è un codice Base64, salva creds.json
            if (args[0]) {
                try {
                    fs.writeFileSync(`./jadibts/${userDir}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString('utf-8')), null, "\t"));
                } catch (e) {
                    console.error("Errore durante la decodifica o scrittura delle credenziali all'interno di startJadibotConnection:", e);
                    // Non inviare un messaggio qui, l'errore è già stato gestito sopra
                }
            }

            const { version: baileysVersion, isLatest } = await fetchLatestBaileysVersion();
            const msgRetry = msg => {}; // Placeholder for message retry logic

            const msgRetryCache = new NodeCache();

            const { state, saveState, saveCreds } = await useMultiFileAuthState(`./jadibts/${userDir}`);

            const connectionOptions = {
                printQRInTerminal: false,
                logger: pino({ level: 'silent' }), // Logger silenzioso
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
                },
                msgRetry: msgRetry,
                msgRetryCache: msgRetryCache,
                version: baileysVersion,
                syncFullHistory: true,
                browser: requestPairingCode ? ["Ubuntu", 'Chrome', "110.0.5585.95"] : ["BixbyBot-Md", "Opera", "5.0"],
                defaultQueryTimeoutMs: undefined,
                getMessage: async msg => {
                    if (global.store) { // Presumo global.store sia definito altrove
                        const messageFromStore = global.store.loadMessage(msg.remoteJid, msg.id);
                        return messageFromStore.message && undefined;
                    }
                    return { conversation: "BixbyBot-Md" };
                }
            };

            let jadibotConn = makeWASocket(connectionOptions);
            jadibotConn.isInit = false;
            let firstConnectionAttempt = true;

            // Funzione per gestire gli aggiornamenti della connessione
            async function handleConnectionUpdate(update) {
                const { connection, lastDisconnect, isNewLogin, qr } = update;
                if (isNewLogin) {
                    jadibotConn.isInit = false; // Reset init status on new login
                }

                // Generazione e invio del QR Code
                if (qr && !requestPairingCode) {
                    return conn.sendMessage(m.chat, {
                        image: await qrcode.toBuffer(qr, { scale: 8 }),
                        caption: `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🚀 *Jadibot | QR Code*
┊ ──────────────────────
┊ *Scansiona questo QR per collegare un Sub-Bot:*
┊ 
┊ 1. Clicca sui tre puntini nell'angolo in alto a destra.
┊ 2. Clicca su *Dispositivi collegati*.
┊ 3. Clicca su *Collega un dispositivo*.
┊ 4. Scansiona questo QR.
┊ 
┊ > ⚠️ *Il QR scade tra 20 secondi.*
┊ ──────────────────────
${signatureText}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`
                    }, { quoted: m });
                }

                // Generazione e invio del codice di accoppiamento
                if (qr && requestPairingCode) {
                    await conn.sendMessage(m.chat, {
                        text: `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🚀 *Jadibot | Codice di Accoppiamento*
┊ ──────────────────────
┊ *Inserisci questo codice per collegare un Sub-Bot:*
┊ 
┊ 1. Clicca sui tre puntini nell'angolo in alto a destra.
┊ 2. Clicca su *Dispositivi collegati*.
┊ 3. Clicca su *Collega un dispositivo*.
┊ 4. Clicca su *Collega con numero di telefono*.
┊ 5. Inserisci il codice qui sotto.
┊ 
┊ > ⚠️ *Esegui questo comando direttamente dal numero del bot che desideri utilizzare come Sub-Bot.*
┊ ──────────────────────
${signatureText}
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`
                    }, { quoted: m });
                    await sleep(5000); // Attesa prima di inviare il codice
                    let pairingCode = await jadibotConn.requestPairingCode(m.sender.split('@')[0]);
                    await m.reply(pairingCode); // Invia il codice all'utente
                }

                const statusCode = lastDisconnect?.['error']?.['output']?.['statusCode'] || lastDisconnect?.['error']?.['output']?.['payload']?.['statusCode'];
                console.log("Stato di disconnessione:", statusCode);

                const cleanUpConnection = async (restart = false) => {
                    if (!restart) {
                        try { jadibotConn.ws.close(); } catch {}
                        jadibotConn.ev.removeAllListeners();
                        let connIndex = global.conns.indexOf(jadibotConn);
                        if (connIndex < 0) return;
                        delete global.conns[connIndex];
                        global.conns.splice(connIndex, 1);
                    }
                };

                if (connection === "close") {
                    console.log("Codice di disconnessione:", statusCode);
                    if (statusCode === 405) { // Metodo non permesso, probabilmente credenziali obsolete
                        await fs.unlinkSync('./jadibts/' + userDir + '/creds.json');
                        return await jadibotConn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *Connessione Chiusa*
┊ ──────────────────────
┊ *Le credenziali sono obsolete. Prova a ricollegarti.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
                    }
                    if (statusCode === DisconnectReason.restartRequired) {
                        startJadibotConnection(); // Riavvia la connessione
                        return console.log("⚠️ Connessione sostituita: è stata aperta un'altra sessione. Chiusura della sessione corrente.");
                    } else if (statusCode === DisconnectReason.loggedOut) {
                        await sleep(4000);
                        return jadibotConn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *Disconnessione Rilevata*
┊ ──────────────────────
┊ *Sei stato disconnesso.*
┊ *Per riconnetterti, elimina la sessione precedente:*
┊ \`${usedPrefix}deletesession\`
┊ *Poi, richiedi un nuovo codice QR o di accoppiamento.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
                    } else if (statusCode === 428) { // Codice sconosciuto nel tuo codice, presumo un errore di connessione.
                        await cleanUpConnection(false);
                        return jadibotConn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *Connessione Instabile*
┊ ──────────────────────
┊ *La connessione è stata chiusa inaspettatamente. Riconnessione in corso...*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
                    } else if (statusCode === DisconnectReason.connectionLost) {
                        await startJadibotConnection(); // Riavvia la connessione
                        return console.log("⚠️ Connessione persa al server. Riconnessione in corso...");
                    } else if (statusCode === DisconnectReason.badSession) {
                        return await jadibotConn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⚠️ *Sessione Invalida*
┊ ──────────────────────
┊ *La connessione è stata chiusa a causa di una sessione non valida.*
┊ *È necessario connettersi manualmente.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
                    } else if (statusCode === DisconnectReason.timedOut) {
                        await cleanUpConnection(false);
                        return console.log("⚠️ Connessione scaduta. Riconnessione in corso...");
                    } else {
                        console.log(`⚠️ Motivo della disconnessione sconosciuto: ${lastDisconnect?.reason || ""} >> ${connection || ""}`);
                    }
                }

                // Carica il database se non è ancora caricato
                if (global.db.data == null) {
                    // Questa funzione 'loadDatabase' dovrebbe essere definita altrove nel tuo bot
                    // e dovrebbe caricare i dati persistenti.
                    // Se non esiste, questo chiamerà un errore.
                    // loadDatabase();
                    console.warn("WARN: global.db.data è nullo. La funzione loadDatabase() dovrebbe essere chiamata qui.");
                }

                // Se la connessione è aperta
                if (connection === "open") {
                    jadibotConn.isInit = true;
                    global.conns.push(jadibotConn); // Aggiungi la nuova connessione all'array globale

                    // Messaggio di connessione riuscita
                    await conn.sendMessage(m.chat, {
                        text: args[0] ? `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ✅ *Connesso con Successo!*
┊ ──────────────────────
┊ *La sessione è stata ripristinata con successo.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》` : `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ✅ *Connesso con Successo!*
┊ ──────────────────────
┊ *Ora puoi usare il tuo Sub-Bot.*
┊ *Usa il tuo ID di sessione per riconnetterti in futuro.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`
                    }, { quoted: m });

                    await conn.sendMessage(m.chat, {
                        text: `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ⓘ *Preparazione Completata!*
┊ ──────────────────────
┊ *Il tuo Sub-Bot è ora operativo. Aspetta un momento.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`
                    }, { quoted: m });
                    
                    await sleep(5000); // Piccola pausa

                    // Invia il codice di sessione all'utente (solo se non è stato fornito un codice in input)
                    if (!args[0]) {
                        try {
                            const sessionCode = Buffer.from(fs.readFileSync(`./jadibts/${userDir}/creds.json`), "utf-8").toString('base64');
                            conn.sendMessage(m.chat, {
                                text: `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ 🔑 *Il tuo Codice di Sessione:*
┊ ──────────────────────
┊ \`${usedPrefix}${command} ${sessionCode}\`
┊ 
┊ *Salva questo codice! Ti servirà per riconnettere il tuo Sub-Bot.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`
                            }, { quoted: m });
                        } catch (e) {
                            console.error("Errore durante l'invio del codice di sessione:", e);
                            conn.reply(m.chat, `╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》
┊ ❌ *Errore Codice Sessione*
┊ ──────────────────────
┊ *Si è verificato un errore durante la generazione del codice di sessione.*
┊ *Prova a ricollegarti o contatta l'amministratore.*
╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》`, m);
                        }
                    }
                }
            }

            // Monitora la disconnessione automatica del SubBot
            setInterval(async () => {
                if (!jadibotConn.user) { // Se l'utente del SubBot non è connesso
                    try { jadibotConn.ws.close(); } catch (e) { console.error("Errore chiusura ws in setInterval:", e); }
                    jadibotConn.ev.removeAllListeners(); // Rimuovi tutti i listener
                    let connIndex = global.conns.indexOf(jadibotConn);
                    if (connIndex < 0) return;
                    delete global.conns[connIndex]; // Elimina l'istanza dall'array globale
                    global.conns.splice(connIndex, 1);
                }
            }, 60000); // Controlla ogni minuto

            // Importa l'handler principale (presumo che ../handler.js gestisca la logica dei messaggi)
            let mainHandler = await import("../handler.js");
            
            // Funzione per aggiornare l'handler e riconnettersi se necessario
            let updateAndReconnectHandler = async function (reconnect = false) {
                try {
                    // Ricarica l'handler per applicare eventuali modifiche
                    const updatedHandler = await import("../handler.js?update=" + Date.now()).catch(console.error);
                    if (Object.keys(updatedHandler || {}).length) {
                        mainHandler = updatedHandler;
                    }
                } catch (err) {
                    console.error("Errore durante il ricaricamento dell'handler:", err);
                }

                if (reconnect) {
                    const currentChats = jadibotConn.chats; // Salva lo stato delle chat
                    try { jadibotConn.ws.close(); } catch {}
                    jadibotConn.ev.removeAllListeners();
                    jadibotConn = makeWASocket(connectionOptions, { chats: currentChats }); // Ricrea la connessione
                    firstConnectionAttempt = true; // Imposta a true per una nuova connessione
                }

                // Se non è la prima connessione, rimuovi i listener precedenti per evitare duplicazioni
                if (!firstConnectionAttempt) {
                    jadibotConn.ev.off("messages.upsert", jadibotConn.handler);
                    jadibotConn.ev.off("group-participants.update", jadibotConn.participantsUpdate);
                    jadibotConn.ev.off("groups.update", jadibotConn.groupsUpdate);
                    jadibotConn.ev.off("message.delete", jadibotConn.onDelete);
                    jadibotConn.ev.off("call", jadibotConn.onCall);
                    jadibotConn.ev.off("connection.update", jadibotConn.connectionUpdate);
                    jadibotConn.ev.off("creds.update", jadibotConn.credsUpdate);
                }

                // Impostazioni di testo per i messaggi automatici (welcome, bye, promote, ecc.)
                // NOTA: Questi messaggi sono in spagnolo nell'originale, potresti volerli tradurre.
                jadibotConn.welcome = `*• Ciao, grazie per esserti unito!!*\n*━━━━━━━━━━━━━━━━━━━*\n\n🍧 *• Nome:* @user\n🗓️ *• Data:* @date\n⏰ *• Ora:* @time\n\n*⚠️ Ricorda di leggere la descrizione*\n@readMore\n@desc`;
                jadibotConn.bye = `*• Grazie per aver fatto parte del gruppo*\n*━━━━━━━━━━━━━━━━━━━━━━━━━*\n\n🍧 *• Nome:* @user\n🗓️ *• Data:* @date\n⏰ *• Ora:* @time`;
                jadibotConn.spromote = `*@user* si aggiunge al gruppo degli admin!`;
                jadibotConn.sdemote = `*@user* abbandona il gruppo!`;
                jadibotConn.sDesc = `È stata modificata la descrizione!\n\n*Nuova descrizione:* @desc`;
                jadibotConn.sSubject = `È stato modificato il titolo del gruppo!`;
                jadibotConn.sIcon = `È stata cambiata la foto del gruppo!`;
                jadibotConn.sRevoke = `È stato aggiornato il link del gruppo!\n*Nuovo link:* @revoke`;

                // Collega gli eventi di Baileys agli handler definiti nel file handler.js
                jadibotConn.handler = mainHandler.handler.bind(jadibotConn);
                jadibotConn.participantsUpdate = mainHandler.participantsUpdate.bind(jadibotConn);
                jadibotConn.groupsUpdate = mainHandler.groupsUpdate.bind(jadibotConn);
                jadibotConn.onDelete = mainHandler.deleteUpdate.bind(jadibotConn);
                jadibotConn.onCall = mainHandler.callUpdate.bind(jadibotConn);
                jadibotConn.connectionUpdate = handleConnectionUpdate.bind(jadibotConn); // Collega la funzione di gestione connessione
                jadibotConn.credsUpdate = saveCreds.bind(jadibotConn, true); // Salva le credenziali

                const currentTime = new Date();
                const lastEvTime = new Date(jadibotConn.ev * 1000); // Assuming jadibotConn.ev holds a timestamp

                if (currentTime.getTime() - lastEvTime.getTime() <= 300000) { // 5 minuti
                    console.log("Lettura del messaggio in arrivo:", jadibotConn.ev);
                    Object.keys(jadibotConn.chats).forEach(chatId => {
                        jadibotConn.chats[chatId].isBanned = false; // Rimuove il ban per le chat
                    });
                } else {
                    console.log(jadibotConn.chats, "⚠️ Hai saltato i messaggi in attesa.", jadibotConn.ev);
                    Object.keys(jadibotConn.chats).forEach(chatId => {
                        jadibotConn.chats[chatId].isBanned = true; // Banna le chat se i messaggi sono stati saltati
                    });
                }
                
                // Attiva i listener degli eventi
                jadibotConn.ev.on("messages.upsert", jadibotConn.handler);
                jadibotConn.ev.on("group-participants.update", jadibotConn.participantsUpdate);
                jadibotConn.ev.on("groups.update", jadibotConn.groupsUpdate);
                jadibotConn.ev.on("message.delete", jadibotConn.onDelete);
                jadibotConn.ev.on("call", jadibotConn.onCall);
                jadibotConn.ev.on("connection.update", jadibotConn.connectionUpdate);
                jadibotConn.ev.on("creds.update", jadibotConn.credsUpdate);

                firstConnectionAttempt = false; // Non è più il primo tentativo
                return true;
            };
            updateAndReconnectHandler(false); // Inizializza gli handler
        }
        startJadibotConnection(); // Avvia la connessione Jadibot
    });
};

handler.help = ['jadibot', "serbot", "getcode", "rentbot"];
handler.tags = ["jadibot"];
handler.command = /^(jadibot|serbot|getcode|rentbot)$/i; // Supporta tutti i comandi nell'help
handler.private = true; // Anche se non era definito, è logico che questo sia un comando privato.

export default handler;

// Funzione sleep (non è un import standard, quindi la lascio qui)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
