import 'dotenv/config';
import { Telegraf, Markup } from 'telegraf';
import { message } from 'telegraf/filters';

const token = process.env.TOKEN;
const webAppUrl = process.env.APP_URL;

const bot = new Telegraf(token);

bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
        Markup.keyboard([
            Markup.button.webApp('Отправить сообщение', `${webAppUrl}/feedback` ),
            // Markup.button.userRequest('user request', 1234567890, {}),
            // Markup.button.contactRequest('contact request'),
            // Markup.button.login('login', 'https://tg-fin-bot.localhost:4200/'),
        ])
    )
});

bot.on('callback_query', (data) => console.log('callback_query', data));
bot.on('channel_post', (data) => console.log('channel_post', data));
bot.on('chat_boost', (data) => console.log('chat_boost', data));
bot.on('chat_join_request', (data) => console.log('chat_join_request', data));
bot.on('chat_member', (data) => console.log('chat_member', data));
bot.on('chosen_inline_result', (data) => console.log('chosen_inline_result', data));
bot.on('edited_channel_post', (data) => console.log('edited_channel_post', data));
bot.on('edited_message', (data) => console.log('edited_message', data));
bot.on('inline_query', (data) => console.log('inline_query', data));

bot.on(message('web_app_data'), async (ctx) => {
    console.log('web_app_data');
    const data = ctx.webAppData.data.json()
    ctx.reply(`Ваше сообщение: ${data}` ?? 'empty message')
  })

bot.on('message', (data) => {
    console.log('message', data.update.message);

    const _users: number[] = data?.update?.message['users_shared']['user_ids'];
    if (_users) {
        _users.forEach((id) => {
            console.log(id);
            
            
            bot.telegram.sendMessage(id, `Проверка`);
        }); 
    }
});

bot.on('message_reaction', (data) => console.log('message_reaction', data));
bot.on('message_reaction_count', (data) => console.log('message_reaction_count', data));
bot.on('my_chat_member', (data) => console.log('my_chat_member', data));
bot.on('poll', (data) => console.log('poll', data));
bot.on('poll_answer', (data) => console.log('poll_answer', data));
bot.on('pre_checkout_query', (data) => console.log('pre_checkout_query', data));
bot.on('removed_chat_boost', (data) => console.log('removed_chat_boost', data));
bot.on('shipping_query', (data) => console.log('shipping_query', data));




bot.launch();
