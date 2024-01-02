
        const board = document.getElementById("board");
        const message = document.getElementById("message");
        const scoreboard = document.getElementById("scoreboard");
        const resetButton = document.getElementById("reset-button");
        const resultScreen = document.getElementById("result-screen");
        const resultMessage = document.getElementById("result-message");
        const resultButton = document.getElementById("result-button");
        const cells = Array.from({ length: 9 }, (_, index) => createCell(index));

        let currentPlayer = "X";
        let gameOver = false;
        let moves = 0;
        let playerXScore = 0;
        let playerOScore = 0;
        let drawScore = 0;

        function createCell(index) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = index;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
            return cell;
        }

        function handleCellClick(event) {
            const cell = event.target;
            if (!cell.classList.contains("cell") || cell.textContent || gameOver) {
                return;
            }

            cell.textContent = currentPlayer;
            moves++;

            if (checkWin()) {
                gameOver = true;
                message.textContent = "";
                resultMessage.textContent = `Player ${currentPlayer} wins!`;
                updateScore();
                showResultScreen();
            } else if (moves === 9) {
                gameOver = true;
                message.textContent = "";
                resultMessage.textContent = "It's a draw!";
                drawScore++;
                updateScore();
                showResultScreen();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }

        function checkWin() {
            const winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                    cells[a].classList.add("winner");
                    cells[b].classList.add("winner");
                    cells[c].classList.add("winner");
                    if (currentPlayer === "X") {
                        playerXScore++;
                    } else {
                        playerOScore++;
                    }
                    return true;
                }
            }

            return false;
        }

        function updateScore() {
            scoreboard.textContent = `Player X: ${playerXScore} | Player O: ${playerOScore} | Draws: ${drawScore}`;
        }

        resetButton.addEventListener("click", resetGame);
        resultButton.addEventListener("click", startNewGame);

        function resetGame() {
            cells.forEach(cell => {
                cell.textContent = "";
                cell.classList.remove("winner");
            });
            currentPlayer = "X";
            gameOver = false;
            moves = 0;
            message.textContent = `Player X's turn`;
            resultScreen.style.display = "none";
        }

        function showResultScreen() {
            resultScreen.style.display = "flex";
        }

        function startNewGame() {
            resetGame();
            resultScreen.style.display = "none";
        }
   