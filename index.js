function useDeck() {
    const URL = 'https://deckofcardsapi.com/api/deck/'
    let deckId;

    async function newDeck() {
        const resp = await axios.get(URL + 'new/shuffle/?deck_count=1')
        deckId = resp.data.deck_id
    }

    async function drawCard() {
        const resp = await axios.get(URL + `${deckId}/draw/?count=1`)
        if(resp.data.cards.length > 0)
            return resp.data.cards[0].image
        else   
            return false
    }

    newDeck()
    return [ newDeck, drawCard ]
}

const [newDeck, drawCard] = useDeck()

$('button').on('click', async function() {
    let card = await drawCard()
    if(card) {
        renderCard(card)
    }
    else {
        $('#card-pile').empty()
        await newDeck()
    }
});

function renderCard(img) {
    let htmlCard = $(`<div class="card"><img src="${img}"></div>`)
    let deg = randInt(-37, 36)
    let top = randInt(355 - 100, 355 + 50)
    let left = randInt(388 - 100, 388 + 100)
    htmlCard.css({'transform': `rotate(${deg}deg)`})
    htmlCard.css({'top': `calc(${top}px/2 - 5em)`})
    htmlCard.css({'left': `calc(50vw - ${left}px/3)`})
    $('#card-pile').append(htmlCard)
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}