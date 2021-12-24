// Game Objects
// Deck Objects
// Player1
// Dealer
let deck = getDeck();
const player1 = {
    hand: [],
    score: 0,
    seat: "player1"
};

const dealer = {
    hand: [],
    score: 0,
    seat: "dealer",
    deal: function(player) {
        let card = deck.pop();
        player.hand.push(card);
        render(deck, "deck");
        render(player.hand, player.seat);
        return card;
    },
    dealRound: function() {
        this.deal(player1);
        this.deal(dealer);
        this.deal(player1);
        this.deal(dealer);
    }
};
// Deck Functions
// Create Deck
// Shuffle Deck
function getDeck() {
    var suits = ["spades", "diamonds", "clubs", "hearts"];
    var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let deck = [];
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
    render(deck, "deck");
    return deck;
}
// System Functions
// Rendering Items
// Calculating Scores
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

function score(player) {
    player.score = 0;
    let hand = [];
    let points = {"K": 10,"Q": 10,"J": 10,"10": 10,"9": 9,"8": 8,
    "7": 7,"6": 6,"5": 5,"4": 4,"3": 3,"2": 2,"A": 11};
    for(let i = 0; i < player.hand.length; i++) {
        let s = player.hand[i].Value;
        hand.push(s);
        console.log(points[s]);
        player.score = player.score + points[s];
    }
    if (player.score > 21) {
        for(let i = 0; i < hand.length; i++) {
            let c = hand[i];
            console.log(c);
            if (c == "A") {
                player.score = player.score - 10;
            }else{}
        }
    }else{}
    return player.score;
}

render(deck, "deck");
