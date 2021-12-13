var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck;
let playerHand = [];
let dealerHand = [];

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

function render(deck) {
    document.getElementById("deck").innerHTML = "";
    for(let i = 0; i < deck.length; i++) {
        let card = document.createElement("div");
        var icon = '';
        if (deck[i].Suit == 'hearts') {
            icon = "&hearts;";
            card.style.color = "red";
        }else if (deck[i].Suit == 'spades') {
            icon = "&spades;";
        }else if (deck[i].Suit == 'diamonds') {
            icon = "&diams;";
            card.style.color = "red";
        }else {
            icon = "&clubs;";
        }
        card.className = "card";
        card.innerHTML = deck[i].Value + "<br>" + icon;
        document.getElementById("deck").appendChild(card);
    }
}

function deal() {
    //let card = deck.pop();
    //return card;
    let card = deck.pop();
    playerHand.push(card);
    render(deck);
    renderHand(playerHand);
    return card;
}

function renderHand(hand) {
    document.getElementById("playerHand").innerHTML = "";
    for(let i = 0; i < hand.length; i++) {
        let card = document.createElement("div");
        var icon = '';
        if (hand[i].Suit == 'hearts') {
            icon = "&hearts;";
            card.style.color = "red";
        }else if (hand[i].Suit == 'spades') {
            icon = "&spades;";
        }else if (hand[i].Suit == 'diamonds') {
            icon = "&diams;";
            card.style.color = "red";
        }else {
            icon = "&clubs;";
        }
        card.className = "card";
        card.innerHTML = hand[i].Value + "<br>" + icon;
        document.getElementById("playerHand").appendChild(card);
    }
}
render(shuffle(getDeck()));

//document.getElementById("deck").style.color = "red";



