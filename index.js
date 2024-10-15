const TELEGRAM_BOT_TOKEN = '7793797009:AAGXNwmSMvoT79sPeaPM5IE4FghZVL5iV8w';
const TeleBot = require('telebot');
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

const express = require('express');

const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

let file2 = 'natija1';
let XLSX = require('xlsx');



function faly_oqish () {

  var workbook = XLSX.readFile(`${file2}.xlsx`);



  let workweet = workbook.Sheets[workbook.SheetNames[0]];
  
  let a = true;
  
  let varaq = 2;
  while(a) {
      if (workweet[`A${varaq}`] != undefined) {
          varaq++;
      }
      else a=false;
  };
  console.log(varaq);
  return varaq;

}














function fananiq(a) {
    let harf = a[0];
    switch(harf) {
        case 'M':
          return 'Matematika: '
          break;
        case 'O':
          return 'Ona tili: ';
          break;
        case 'I':
          return 'Ingliz tili: ';
          break;
        case 'F':
          if (a[1]=='r') {return 'Fransuz tili: ';}
          else {return 'Fizika: ';}
          break;
        case 'K':
          return 'Kimyo: ';
          break;
        case 'B':
          return 'Biologiya: ';
          break;
        case 'R':
          return 'Rus tili: ';
          break;  
        case 'T':
          return 'Tarix: ';
          break;
        case 'H':
          return 'Huquq: ';
          break;
        case 'G':
          return 'Geagrafiya: ';
          break;
        default:
          "Fan topilmadi bizga murojaat qiling!!"
      }
}










function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };




bot.on('text', (msg) => 
{



    if (msg.text == '/start'){

    msg.reply.text('Varaq Nomeringizni Kiriting');

    }
    else {

      var workbook = XLSX.readFile(`${file2}.xlsx`);
      let workweet = workbook.Sheets[workbook.SheetNames[0]];
      let varaq = faly_oqish()

        if (isNumber(msg.text)) {
            
            for(let i=2 ; i<varaq; i++) {
                if(workweet[`C${i}`].v == msg.text) {
                    
                    
                    msg.reply.text(
                   `
FIO: ${workweet[`B${i}`].v} 
Sizning Balingiz: ${Math.floor(workweet[`K${i}`].v * 10)/10}

 
                        `
                    )
                    setTimeout(() => {
                    msg.reply.text(`
                        Asosiy fanlar:
${ fananiq (workweet[`G${i}`].v) +  workweet[`H${i}`].v}
${ fananiq (workweet[`I${i}`].v) +  workweet[`J${i}`].v}
 
                        `)
                    }, 1000);
                        setTimeout(() => {
                        msg.reply.text(`
                        Majburiy fanlar:
Ona tili: ${workweet[`D${i}`].v} | Matematika: ${workweet[`E${i}`].v} | Tarix: ${workweet[`F${i}`].v}
                        `
                    )
                }, 1500);

                    setTimeout(() => {
                    msg.reply.text(`
Xato qilinganlari:
${workweet[`L${i}`].v}
                        
                        `)
                    }, 2000);

                    break;
                }
                else {
                    if (i==varaq-1){
                    msg.reply.text(`Bunday varaq raqam topilmadi! \nQayta urinib Ko'ring => /start`); 
                    break;
                    }
                }
            }

        }
        else {
            msg.reply.text('Iltimos varaq raqamini togri kiriting');
            
        }
    }

}

);



const https = require('https');
const fs = require('fs');
let otgan_zamon = 0;


bot.on('document' , (msg) => {



if (msg.document.file_name == (file2 + '.xlsx')) {

const url2 = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${msg.document.file_id}`;

  https.get(url2, response => {
    const fileStream = fs.createWriteStream('url2.txt');
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      
      fileStream.close(); 
      
    });
  });

  var manzil_olish = fs.readFileSync("url2.txt", {encoding: 'utf8'}).toString();
  var maznilcha = '';
  
  for(let i=0; i<=manzil_olish.length; i++) {
    if(manzil_olish[i] == 'd' && manzil_olish[i+1] == 'o' && manzil_olish[i+2] == 'c') {
      if(isNumber(manzil_olish[i+17])){
      maznilcha = manzil_olish[i+15] + manzil_olish[i+16] + manzil_olish[i+17];
      
    }
    else {
      maznilcha = manzil_olish[i+15] + manzil_olish[i+16];
    }

  }
  }
  otgan_zamon = parseInt(maznilcha);
  
  const url = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/documents/file_${otgan_zamon}.xlsx`;
  const filePath = file2 + '.xlsx';
  https.get(url, response => {
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close(); // Не забывайте закрывать ледник! 😄
      msg.reply.text("Fayl qabul qilindi.")
      
  
      
    });
  });
  

}
else {
  msg.reply.text("Fayl qabul qilinmadi.!")
  
}




});




setInterval(faly_oqish, 150000);

setInterval(() => {

console.log("ishlayapdi");
},60000)

bot.start();


