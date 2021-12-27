// Deck
let deck = getDeck();

// Players
class Player {
    constructor(seat) {
        this.hand = [];
        this.score = 0;
        this.chips = 0;
        this.seat = seat;
    }
}

let player1 = new Player("player1");

// Dealer
const dealer = {
    hand: [],
    score: 0,
    seat: "dealer",
    deal: function(player) {
        let card = deck.pop();
        player.hand.push(card);
        score(player);
        refresh(player);
        return card;
    },
    dealRound: function() {
        shuffle(deck);
        this.deal(player1);
        this.deal(dealer);
        this.deal(player1);
        this.deal(dealer);
        document.getElementById("dealRound").style.display = "none";
        document.getElementById("hit").style.display = "flex";
        document.getElementById("stay").style.display = "flex";
        renDealer.cardsUp();
        refresh(player1);
    },
    play: function(score) {
        document.getElementById("hit").style.display = "none";
        document.getElementById("stay").style.display = "none";
        refresh(dealer);
        if(score > 0 && score <= 16) {
            this.deal(dealer);
            this.play(dealer.score);
        }else{
            compare(player1, dealer);
        }
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
    return deck;
}
// Rendering
class Render {
    constructor(player) {
        this.player = player;
    }
    cardsUp() {
        let cards = this.player.hand;
        let l = this.player.seat;
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
    score() {
        let score = document.createElement("div");
        score.className = "score";
        if(this.player.score <= 21) {
            score.innerHTML = this.player.score;
        }else {
            score.innerHTML = "Bust!";
            this.player.score = 0;
            dealer.play(dealer.score);
        }
        document.getElementById(this.player.seat).appendChild(score);
    }
}

let renDealer = new Render(dealer);

function refresh(player) {
    let r = new Render(player);
    r.cardsUp();
    r.score();
}

// Scoring
// Get Score
// Compare
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

function compare(p1, p2) {
    let result = document.getElementById("result");
    if(p1.score > p2.score) {
        result.innerHTML = "Player 1 Wins!";
    }else if(p1.score == p2.score) {
        result.innerHTML = "Draw";
    }
    else {result.innerHTML = "Dealer Wins";}
    result.style.border = "3px solid goldenrod";
}
