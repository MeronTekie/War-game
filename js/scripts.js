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
    $("#play").attr("disabled", "true");

    const player1Card = player1.pop();
    const player2Card = player2.pop();

    $("#output").append($("<h2>You played: " + player1Card + "</h2>"));

    delayMessage(
      $("#output"),
      $("<h2>They played: " + player2Card + "</h2>"),
      500
    );

    let winner = "";
    if (
      values.indexOf(player1Card.split(" ")[0]) >
      values.indexOf(player2Card.split(" ")[0])
    ) {
      winner = "Player 1";
      player1.unshift(player1Card);
      player1.unshift(player2Card);
    } else if (
      values.indexOf(player1Card.split(" ")[0]) <
      values.indexOf(player2Card.split(" ")[0])
    ) {
      winner = "Player 2";
      player2.unshift(player1Card);
      player2.unshift(player2Card);
    } else {
      let pot = [player1Card, player2Card];
      let player1TieCard = "";
      let player2TieCard = "";

      while (
        values.indexOf(player1TieCard.split(" ")[0]) ===
        values.indexOf(player2TieCard.split(" ")[0])
      ) {
        player1TieCard = player1.pop();
        player2TieCard = player2.pop();

        pot.push(player1.pop());
        pot.push(player1.pop());
        pot.push(player1.pop());
        pot.push(player2.pop());
        pot.push(player2.pop());
        pot.push(player2.pop());

        $("#output").append($("<h2>You Tied! Tie-breaker round: </h2>"));

        $("#output").append($("<h2>You played: " + player1TieCard + "</h2>"));
        $("#output").append($("<h2>They played: " + player2TieCard + "</h2>"));

        if (
          values.indexOf(player1TieCard.split(" ")[0]) >
          values.indexOf(player2TieCard.split(" ")[0])
        ) {
          winner = "Player 1";
          player1.unshift(player1TieCard);
          player1.unshift(player2TieCard);
          pot.forEach(function (card) {
            player1.unshift(card);
          });
        } else if (
          values.indexOf(player1TieCard.split(" ")[0]) <
          values.indexOf(player2TieCard.split(" ")[0])
        ) {
          winner = "Player 2";
          player2.unshift(player1TieCard);
          player2.unshift(player2TieCard);
          pot.forEach(function (card) {
            player2.unshift(card);
          });
        } else {
          pot.push(player1TieCard);
          pot.push(player2TieCard);
        }
      }
    }

    setTimeout(function () {
      $("#player1-score").text(player1.length);
      $("#player2-score").text(player2.length);
      $("#play").removeAttr("disabled");
      $("#output").append($("<h2>" + winner + " won the round!</h2>"));
    }, 500);

    if (player1.length === 0 || player2.length === 0) {
      if (player1.length === 0) {
        $("#output").append($("<h1> Player 2 won the game!</h1>"));
      } else {
        $("#output").append($("<h1> Player 1 won the game!</h1>"));
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

function delayMessage(parent, child, delay) {
  setTimeout(function () {
    parent.append(child);
  }, delay);
}
