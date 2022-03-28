$(document).ready(function () {
  const suits = ["&#9827;", "&#9830;&#65039;", "&#10084;", "&#9824;"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  let deck = [];
  suits.forEach(function (suit) {
    values.forEach(function (value) {
      deck.push(value + " " + suit);
    });
  });

  shuffle(deck);
  let player1 = deck.slice(0, 26);
  let player2 = deck.slice(26, 52);

  $("#play").click(function () {
    $("#output").text("");

    const player1Card = player1.pop();
    const player2Card = player2.pop();

    $("#output").append($("<p>You played: " + player1Card + "</p>"));
    $("#output").append($("<p>They played: " + player2Card + "</p>"));

    let winner = "";
    if (
      values.indexOf(player1Card.split(" ")[0]) >
      values.indexOf(player2Card.split(" ")[0])
    ) {
      winner = "player 1";
      player1.unshift(player1Card);
      player1.unshift(player2Card);
    } else if (
      values.indexOf(player1Card.split(" ")[0]) <
      values.indexOf(player2Card.split(" ")[0])
    ) {
      winner = "player 2";
      player2.unshift(player1Card);
      player2.unshift(player2Card);
    } else {
      let pot = [player1Card, player2Card];
      let player1TieCard;
      let player2TieCard;

      do {
        player1TieCard = player1.pop();
        player2TieCard = player2.pop();

        pot.push(player1.pop());
        pot.push(player1.pop());
        pot.push(player1.pop());
        pot.push(player2.pop());
        pot.push(player2.pop());
        pot.push(player2.pop());

        $("#output").append($("<p>You Tied! Tie-breaker round: </p>"));

        $("#output").append($("<p>You played: " + player1TieCard + "</p>"));
        $("#output").append($("<p>They played: " + player2TieCard + "</p>"));

        if (
          values.indexOf(player1TieCard.split(" ")[0]) >
          values.indexOf(player2TieCard.split(" ")[0])
        ) {
          winner = "player 1";
          player1.unshift(player1TieCard);
          player1.unshift(player2TieCard);
          pot.forEach(function (card) {
            player1.unshift(card);
          });
        } else if (
          values.indexOf(player1TieCard.split(" ")[0]) <
          values.indexOf(player2TieCard.split(" ")[0])
        ) {
          winner = "player 2";
          player2.unshift(player1TieCard);
          player2.unshift(player2TieCard);
          pot.forEach(function (card) {
            player2.unshift(card);
          });
        } else {
          pot.push(player1TieCard);
          pot.push(player2TieCard);
        }
      } while (
        values.indexOf(player1TieCard.split(" ")[0]) ===
        values.indexOf(player2TieCard.split(" ")[0])
      );
    }

    $("#player1-score").text(player1.length);
    $("#player2-score").text(player2.length);

    $("#output").append($("<p>" + winner + " won the round!</p>"));

    if (player1.length === 0 || player2.length === 0) {
      if (player1.length === 0) {
        $("#output").append($("<p> Player 2 won the game!</p>"));
      } else {
        $("#output").append($("<p> Player 1 won the game!</p>"));
      }

      $("#restart").removeClass("hidden");
      $("#play").addClass("hidden");
    }
  });

  $("#restart").click(function () {
    $("#output").text("");

    $("#player1-score").text("26");
    $("#player2-score").text("26");

    deck = [];
    suits.forEach(function (suit) {
      values.forEach(function (value) {
        deck.push(value + " of " + suit);
      });
    });

    shuffle(deck);
    player1 = deck.slice(0, 26);
    player2 = deck.slice(26, 52);

    $("#restart").addClass("hidden");
    $("#play").removeClass("hidden");
  });
});

function shuffle(deck) {
  deck.forEach(function (card, index) {
    const j = Math.floor(Math.random() * (index + 1));
    deck[index] = deck[j];
    deck[j] = card;
  });
}
