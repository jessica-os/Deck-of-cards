const borda = document.querySelector(".borda-animada");
const botao = document.getElementById("btn").addEventListener("click", () => {
  tirarUmaCartaDoBaralho();

  borda.style.animation = "none";
  setTimeout(() => {
    borda.style.animation = " slidein 1s linear forwards";
  }, 1000);
});

async function criarBaralho() {
  const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const resposta = await fetch(url);
  return await resposta.json();
}
async function selecionarUmaCarta(deck_id) {
  const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
  const resposta = await fetch(url);
  return await resposta.json();
}

async function tirarUmaCartaDoBaralho() {
  const baralho = await criarBaralho();
  const carta = await selecionarUmaCarta(baralho.deck_id);

  const imagemCarta = carta.cards[0].image;
  let valorCarta = carta.cards[0].value;
  let nipe = carta.cards[0].suit;

  const nipeDaCarta = {
    HEARTS: "Copas",
    DIAMONDS: "Ouros",
    SPADES: "Espada",
    CLUBS: "Paus",
  };
  const valorDaCarta = {
    JACK: "Valete",
    QUEEN: "Dama",
    KING: "Rei",
    CLUBS: "Paus",
    ACE: "Ás",
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
  };

  document.getElementById("carta").src = imagemCarta;
  document.getElementById(
    "descricao"
  ).innerText = `${valorDaCarta[valorCarta]} de ${nipeDaCarta[nipe]}`;
}
tirarUmaCartaDoBaralho();
