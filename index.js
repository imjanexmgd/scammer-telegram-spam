import axios from "axios";
import fs from 'fs'
import inquirer from "inquirer";
import dotenv from 'dotenv'
dotenv.config()
function delay(milliseconds) {
    console.log(`waiting delay ${milliseconds} second`);
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
            const r = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                parse_mode: 'markdown',
                chat_id: `${chatid}`,
                text: `${arrText[randomIndex]}\n\n${kontword}\n\n do you want stop ? contact me lmao ${telegramLink}`
            })
            if (r.data.ok == true) {
                console.log('success spam with message at ' + `${r.data.result.date} progress [${i} / ${count}]`);
            }
            i++
            await delay(2500)
        }

    } catch (error) {
        console.log(error);
        return
    }
})()