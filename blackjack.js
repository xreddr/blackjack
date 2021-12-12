var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function getDeck() {
    let deck = new Array();
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
    document.getElementById("demo").innerHTML = "";
    for(let i = 0; i < deck.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        card.className = "card";
        value.className = "value";
        suit.className = "suit";
        
        value.innerHTML = deck[i].Value;
        card.appendChild(value);
        card.appendChild(suit);
        
        document.getElementById("demo").appendChild(card);
    }
}

getDeck();

function testRender() {
    const para = document.createElement("div");
    //const node = document.createTextNode("Hello");
    para.className = "card";
    //para.appendChild(node);

    const element = document.getElementById("demo");
    element.appendChild(para);
}

testRender();
render(shuffle(getDeck()));


