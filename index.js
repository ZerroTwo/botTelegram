const TelegramBot = require('node-telegram-bot-api');

const token = '5132845961:AAHl1ascDXRNhZ2ncJX3mo24uHSBuAS3JoQ';

const bot = new TelegramBot(token, {
   polling: {
      interval: 300,
      autoStart: true,
      params: {
         timeout: 10,
      }
   }
});

let price_all = "17Br.";

const keyboards = [
   [
      {
         text: 'МИШКИ', // текст на кнопке
         callback_data: 'Bear', // данные для обработчика событий        
      }
   ],
   [
      {
         text: 'МОРС',
         callback_data: 'FruitDrink',

      }
   ],
   // [
   //    {
   //       text: 'МОРС',
   //       callback_data: 'FruitDrink',

   //    }
   // ],
   [
      {
         text: 'Хочу купить!',
         callback_data: 'pay' //внешняя ссылка
      }
   ]
];

const backKeyboards = [
   [
      {
         text: 'Назад', // текст на кнопке
         callback_data: 'back', // данные для обработчика событий        
      },
      {
         text: 'Хочу купить!',
         callback_data: 'pay' //внешняя ссылка
      }
   ]
];

const all_salt =
   [
      {
         name: "Bear",
         html: `
<b>МИШКИ 30мл (50 мг)</b>
Сладкий вкус якоды  <b>${price_all}</b>
Чай смородина-лимон (Временно не доступно) <b>${price_all}</b>
Дыня-огурец-арбуз  <b>${price_all}</b>
Морс Смородина Калина  <b>${price_all}</b>
   `
         //Ягоды-анис (Временно не доступно) <b>${price_all}</b>
//         Яблоко-энергетик  <b>${price_all}</b>
      },
      {
         name: "FruitDrink",
         html: `
<b>МОРС 30мл (50 мг)</b> 
Клубника, гранат  <b>${price_all}</b>
Клюква, малина  <b>${price_all}</b>
Лесные ягоды  <b>${price_all}</b>
Смородина, брусника  <b>${price_all}</b>
Жимолость - Облепиха  <b>${price_all}</b>
Малина - Асаи (Временно не доступно) <b>${price_all}</b>

<b>МОРС МОРОЗ 30мл (50 мг)</b> 
Брусника-смородина  <b>${price_all}</b>
Клубника-гранат  <b>${price_all}</b>
Лесные ягоды  <b>${price_all}</b>
Малина-ежевика  <b>${price_all}</b>
Малина-земляника  <b>${price_all}</b>
Черника-черная смородина  <b>${price_all}</b>
   `
      },
      //       {
      //          name: "FruitDrink",
      //          html: `
      // <b>МОРС</b> 
      // 7  <b>${price_bear}</b>
      // 8  <b>${price_bear}</b>
      // 3  <b>${price_bear}</b>
      // 4  <b>${price_bear}</b>
      // 5  <b>${price_bear}</b>
      // 6  <b>${price_bear}</b>
      //    `
      //       },
   ];


bot.on('message', (msg) => {
   const { id, first_name } = msg.chat;

   bot.sendMessage(id, 'Привет, ' + first_name + '! чего хочешь посмотреть?', {
      reply_markup: {
         inline_keyboard: keyboards
      }
   });

});

bot.on('callback_query', (query) => {
   const { id } = query.message.chat;
   let img = '';

   switch (query.data) {
      case 'Bear':
         img = 'img/Bear.jpg';
         break;
      case 'FruitDrink':
         img = 'img/FruitDrink.jpg';
         break;
   };

   if (img) {
      bot.sendPhoto(id, img, {})
         .then(() => {
            let name = "";
            for (let i = 0; i < all_salt.length; i++) {
               if (all_salt[i].name == query.data) {
                  bot.sendMessage(id, all_salt[i].html, {
                     parse_mode: "HTML", reply_markup: {
                        inline_keyboard: backKeyboards
                     },
                  });
                  return;
               };
            };
         });
   };
   if (query.data === 'back') {
      bot.sendMessage(id, 'Что хочешь посмотреть?', {
         reply_markup: {
            inline_keyboard: keyboards
         }
      });
   }
   if (query.data === 'pay') {
      bot.sendMessage(id, 'Свяжитесь с нашим менеджером!', {}).then(() => {
         bot.sendMessage(id,
            `

@H_atkevich   
 
   `, {
            parse_mode: "HTML",
         });
      });

   };
});
