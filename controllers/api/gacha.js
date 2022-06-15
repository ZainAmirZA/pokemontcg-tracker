const Base1 = require('../../models/Base1')

module.exports = {
    index,
}

async function index(req, res) {
    try {
        // Common, Uncommon, Rare, Rare Holo
        const pack = ['','','','','','','','','',''];
        let thisPack = [];
        const setCards = await Base1.find({});
        const numCardsInSet = setCards.length;
        pack.forEach(function(card, idx) {
            if (idx <= 5) { // 6 Commons
                const commonCard = getCommon(setCards, numCardsInSet);
                thisPack.push(commonCard);
            } else if ((idx > 5) && (idx <= 8)) { // 3 Uncommons after common 
                const uncommonCard = getUncommon(setCards, numCardsInSet);
                thisPack.push(uncommonCard);
            } else { // 1 Rare or higher 
                const rarePlusCard = getRarePlus(setCards, numCardsInSet);
                thisPack.push(rarePlusCard);
            }
        })
        console.log("Do you reach here????")
        console.log(thisPack)
        res.status(200).json(thisPack);
    } catch (err) {
        console.log(error);
        res.status(400).json(error);
    }
}

function getCommon(setCards, numCardsInSet) {
    let cardCache = null;
    while (cardCache === null) {
        let rng = Math.floor(Math.random() * numCardsInSet)
        if (setCards[rng].rarity === "Common") {
            cardCache = setCards[rng];
        } else {
            cardCache = null;
        }
    };
    return cardCache;
}

function getUncommon(setCards, numCardsInSet) {
    let cardCache = null;
    while (cardCache === null) {
        let rng = Math.floor(Math.random() * numCardsInSet)
        if (setCards[rng].rarity === "Uncommon") {
            cardCache = setCards[rng];
        } else {
            cardCache = null;
        }
    };
    return cardCache;
}

function getRarePlus(setCards, numCardsInSet) {
    let cardCache = null;
    while (cardCache === null) {
        let rng = Math.floor(Math.random() * numCardsInSet)
        if ((setCards[rng].rarity !== "Common") && (setCards[rng].rarity !== "Uncommon")) {
            cardCache = setCards[rng];
        } else {
            cardCache = null;
        }
    };
    return cardCache;
}