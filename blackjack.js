var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck;
let player1 = {
    hand: [],
    seat: "player1"
};
let dealer = {
    hand: [],
    seat: "dealer"
};

function getDeck() {
    deck = [];
    for(let i = 0; i < suits.length; i++) {
        for(let x = 0; x < values.length; x++) {
            let card = {Value: values[x], Suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck) {
    for(let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];
        
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
    return deck;
}

function render(cards, l) {
    document.getElementById(l).innerHTML = "";
    for(let i = 0; i < cards.length; i++) {
        let card = document.createElement("div");
        var icon = '';
        if (cards[i].Suit == 'hearts') {
            icon = "&hearts;";
            card.style.color = "red";
        }else if (cards[i].Suit == 'spades') {
            icon = "&spades;";
        }else if (cards[i].Suit == 'diamonds') {
            icon = "&diams;";
            card.style.color = "red";
        }else {
            icon = "&clubs;";
        }
        card.className = "card";
        card.innerHTML = cards[i].Value + "<br>" + icon;
        document.getElementById(l).appendChild(card);
    }
}

function deal(player) {
    let card = deck.pop();
    player.hand.push(card);
    render(deck, "deck");
    render(player.hand, player.seat);
    return card;
}

render(shuffle(getDeck()), "deck");


