const fruits = [
  { name: "limão", hint: "É uma fruta que começa com a letra 'L'"},
  { name: "coco", hint: "É uma fruta que começa com a letra 'C'"},
  { name: "jaca", hint: "É uma fruta que começa com a letra 'J'"},
  { name: "melão", hint: "É uma fruta que começa com a letra 'M'" },
  { name: "manga", hint: "É uma fruta que começa com a letra 'M'" },
  { name: "caju", hint: "É uma fruta que começa com a letra 'C'" },
  { name: "kiwi", hint: "É uma fruta que começa com a letra 'K'" },
  { name: "mamão", hint: "É uma fruta que começa com a letra 'M'" },
  { name: "amora", hint: "É uma fruta que começa com a letra 'A'" }
];

let currentFruitIndex = 0;
let attempts = 3;
let score = 0;


function chooseFruit() {
  // Reinicializar as tentativas para cada nova palavra
  attempts = 3;

  // Embaralhar a ordem das frutas usando o algoritmo de Fisher-Yates
  for (let i = fruits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fruits[i], fruits[j]] = [fruits[j], fruits[i]];
  }

  if (currentFruitIndex < fruits.length) {
    const currentFruit = fruits[currentFruitIndex];
    const firstLetter = currentFruit.name.charAt(0).toUpperCase();
    document.getElementById("currentWord").textContent = currentFruit.name; 
    document.getElementById("hintText").textContent = currentFruit.hint;
    document.getElementById("firstLetter").textContent = firstLetter;
    document.getElementById("additionalHint").textContent = "";
  } else {
    endGame();
  }
}



function guess() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value.toLowerCase(); // Converta a entrada do usuário para minúsculas

  // Converta o nome da fruta atual para minúsculas antes de comparar
  const currentFruitName = fruits[currentFruitIndex].name.toLowerCase();

  if (guess === currentFruitName) {
    document.getElementById("result").textContent = "Parabéns! Você acertou!";
    score += attempts * 10;
    document.getElementById("score").textContent = score;
    guessInput.value = ""; // Limpa a caixa de texto do usuário
    currentFruitIndex++;
    chooseFruit();
    attempts = 3;
    document.getElementById("attempts").textContent = attempts;
  } else {
    attempts--;
    document.getElementById("attempts").textContent = attempts;
    if (attempts === 0) {
      document.getElementById("result").textContent = `Suas tentativas acabaram! A resposta correta era: ${fruits[currentFruitIndex].name}`;
      // Reduzir a pontuação do jogador para 0
      score = 0;
      document.getElementById("score").textContent = score;
      // Reinicializar as tentativas
      attempts = 3;
      document.getElementById("attempts").textContent = attempts;
      guessInput.value = "";
    } else {
      document.getElementById("result").textContent = "Tente novamente!";
    }
  }
}






function showAdditionalHint() {
  if (currentFruitIndex < fruits.length) {
      const additionalHint = fruits[currentFruitIndex].hint;
      if (additionalHint) {
          document.getElementById("additionalHint").textContent = additionalHint;
      } else {
          document.getElementById("additionalHint").textContent = "Não há dica adicional disponível para esta fruta.";
      }
  }
}

function endGame() {
  document.getElementById("result").textContent = `Jogo encerrado! Sua pontuação final é: ${score}`;
  document.getElementById("guessInput").style.display = "none";
  document.querySelector("button").style.display = "none";
}

function restartGame() {
  currentFruitIndex = 0;
  score = 0;
  attempts = 3;
  chooseFruit(); // Chamando a função para escolher a primeira fruta
  document.getElementById("score").textContent = score;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("result").textContent = ""; // Limpa o resultado anterior
  document.getElementById("guessInput").value = ""; // Limpa o campo de entrada
  document.getElementById("guessInput").style.display = "inline-block"; // Mostra o campo de entrada
  document.querySelector("button").style.display = "inline-block"; // Mostra o botão de adivinhar
}

function playSuccessSound() {
  const audio = new Audio('caminho/para/acerto.mp3'); // Substitua 'caminho/para/acerto.mp3' pelo caminho real do seu arquivo de som de acerto
  audio.play();
}

function playErrorSound() {
  const audio = new Audio('caminho/para/erro.mp3'); // Substitua 'caminho/para/erro.mp3' pelo caminho real do seu arquivo de som de erro
  audio.play();
}


window.onload = chooseFruit;
