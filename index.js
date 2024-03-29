import axios from "axios";
import fs from 'fs'
import inquirer from "inquirer";
import dotenv from "dotenv";
dotenv.config()
const delay = (milliseconds) => {
    console.log(`waiting delay ${milliseconds} millisecond`);
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
const botToken = process.env.BOT_TOKEN;
const chatid = process.env.CHAT_ID;
const telegramLink = process.env.YOUR_TELEGRAM_LINK;
(async () => {
    try {
        process.stdout.write('\x1Bc');
        const textFile = fs.readFileSync('text.txt', 'utf-8')
        const arrText = textFile.split('\n')
        console.log(`Found ${arrText.length} word at list\n\n`);
        const { count } = await inquirer.prompt({
            type: 'input',
            name: 'count',
            message: 'how many spam message do you want'
        })
        let i = 1
        let kontword = ''
        let a = []
        for (let index = 1; index <= 100; index++) {
            const umpatan = ['kontol', 'memek', 'puki', 'pemai', 'ngana', 'jembut', 'asu', 'perek', 'peli']
            const randomIndex = Math.floor(Math.random() * umpatan.length)
            a.push(umpatan[randomIndex])
        }
        kontword = a.join(' ')
        while (i <= count) {
            const randomIndex = Math.floor(Math.random() * arrText.length)
            try {
                const r = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    parse_mode: 'markdown',
                    chat_id: `${chatid}`,
                    text: `${arrText[randomIndex]}\n\n${kontword}\n\n do you want stop ? contact me lmao ${telegramLink}`
                })
                if (r.data.ok == true) {
                    console.log('success spam with message at ' + `${r.data.result.date} progress [${i} / ${count}]`);
                }
            } catch (error) {
                if (error.message == 'Request failed with status code 429') {
                    console.log(error.response.data.description);
                    const ratelimitparam = `${error.response.data.parameters.retry_after}000`
                    await delay(parseInt(ratelimitparam))
                } else {
                    console.log(error);
                    break
                }
            }
            i++
        }

    } catch (error) {
        console.log(error);
    }
})()