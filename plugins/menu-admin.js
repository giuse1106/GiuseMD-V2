//Crediti By Gab
import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x4955de, { conn: _0x4b9a49, usedPrefix: _0xeb2cc9 }) => {
  let _0x414c2d = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'locationMessage': {
        'name': "𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧",
        'jpegThumbnail': await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    'participant': "0@s.whatsapp.net"
  };
  
  // Messaggio migliorato con una grafica più pulita e visivamente accattivante
  let _0x259d4e = `
════════════════════
👑 *𝐌𝐞𝐧𝐮 𝐀𝐝𝐦𝐢𝐧* 👑

➤ ${_0xeb2cc9}𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐢 / 𝐩 👑
➤ ${_0xeb2cc9}𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐝𝐢 / 𝐫 ❌
➤ ${_0xeb2cc9}𝐰𝐚𝐫𝐧 / 𝐮𝐧𝐰𝐚𝐫𝐧 ⚠️
➤ ${_0xeb2cc9}𝐦𝐮𝐭𝐚 / 𝐬𝐦𝐮𝐭𝐚 📵
➤ ${_0xeb2cc9}𝐡𝐢𝐝𝐞𝐭𝐚𝐠 👥
➤ ${_0xeb2cc9}𝐭𝐚𝐠𝐚𝐥𝐥 💤
➤ ${_0xeb2cc9}𝐚𝐩𝐞𝐫𝐭𝐨 / 𝐜𝐡𝐢𝐮𝐬𝐨 ✅
➤ ${_0xeb2cc9}𝐬𝐞𝐭𝐰𝐞𝐥𝐜𝐨𝐦𝐞 👋🏻
➤ ${_0xeb2cc9}𝐬𝐞𝐭𝐛𝐲𝐞 😭
➤ ${_0xeb2cc9}𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢 💤
➤ ${_0xeb2cc9}𝐥𝐢𝐬𝐭𝐚𝐧𝐮𝐦 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 🔍
➤ ${_0xeb2cc9}𝐩𝐮𝐥𝐢𝐳𝐢𝐚 + 𝐩𝐫𝐞𝐟𝐢𝐬𝐬𝐨 🎉
➤ ${_0xeb2cc9}𝐬𝐢𝐦✨
➤ ${_0xeb2cc9}𝐚𝐝𝐦𝐢𝐧𝐬👑
➤ ${_0xeb2cc9}𝐟𝐫𝐞𝐞𝐳𝐞 @❄️
➤ ${_0xeb2cc9}𝐩𝐢𝐜 @ 📷

> ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」
`.trim();
  
  let _0xf5c7c0 = global.db.data.nomedelbot || " ꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」";
  
  // Invia il messaggio con una grafica migliorata
  _0x4b9a49.sendMessage(_0x4955de.chat, {
    'text': _0x259d4e,
    'contextInfo': {
      'mentionedJid': _0x4b9a49.parseMention(wm),
      'forwardingScore': 0x1,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': "120363418973546282@newsletter",
        'serverMessageId': '',
        'newsletterName': '꧁ ĝ̽̓̀͑ỉ͔͖̜͌ư̡͕̭̇s̠҉͍͊ͅẹ̿͋̒̕ẹ̿͋̒̕ ꧂ 「 ᵇᵒᵗ 」'
      }
    }
  }, {
    'quoted': _0x414c2d
  });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(menuadm|admin)$/i;
export default handler;

// Funzione per calcolare il tempo di attività
function clockString(_0x5dad08) {
  let _0x233c78 = Math.floor(_0x5dad08 / 3600000);
  let _0x2b10bc = Math.floor(_0x5dad08 / 60000) % 60;
  let _0x2c7d73 = Math.floor(_0x5dad08 / 1000) % 60;
  console.log({
    'ms': _0x5dad08,
    'h': _0x233c78,
    'm': _0x2b10bc,
    's': _0x2c7d73
  });
  return [_0x233c78, _0x2b10bc, _0x2c7d73].map(_0x4bd0ef => _0x4bd0ef.toString().padStart(2, 0)).join(':');
}
