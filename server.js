const expresss = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = expresss();

const PORT = 4000;

const url = 'https://coinmarketcap.com/'

async function scrapeData() {
    let array = []
    let crypto_items = [
        "star",
        "index",
        "name",
        "price",
        "hours",
        "days",
        "market_cap",
        "volume",
        "circulating_supply",
    ]
    let json = {}
    try {
        const { data } = await axios.get('https://coinmarketcap.com/');
        const $ = cheerio.load(data);
        $('#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr').each((idx1, el1) => {
            if (idx1 <= 9) {
                $(el1).children().each((idx2, el2) => {
                    const element = $(el2).text()
                    if (element !== "") {
                        json[crypto_items[[idx2]]] = element
                    }
                })
                for (const [key, value] of Object.entries(json)) {
                    array.push(`${(key)} : ${value}`)
                }
            }
        })
        // console.log(array)
        return array
    } catch (error) {
        console.error(error)
    }
}
scrapeData()

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
})

