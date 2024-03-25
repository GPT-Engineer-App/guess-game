import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [player1Number, setPlayer1Number] = useState("");
  const [player2Number, setPlayer2Number] = useState("");
  const [player1Guess, setPlayer1Guess] = useState("");
  const [player2Guess, setPlayer2Guess] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const toast = useToast();

  const handleNumberSubmit = () => {
    if (player1Number && player2Number) {
      setCurrentPlayer(1);
    } else {
      toast({
        title: "Please enter numbers for both players.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGuessSubmit = () => {
    if (currentPlayer === 1) {
      if (player1Guess === player2Number) {
        setGameOver(true);
        toast({
          title: "Player 1 wins!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setCurrentPlayer(2);
        setPlayer1Guess("");
      }
    } else {
      if (player2Guess === player1Number) {
        setGameOver(true);
        toast({
          title: "Player 2 wins!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setCurrentPlayer(1);
        setPlayer2Guess("");
      }
    }
  };

  const resetGame = () => {
    setPlayer1Number("");
    setPlayer2Number("");
    setPlayer1Guess("");
    setPlayer2Guess("");
    setCurrentPlayer(1);
    setGameOver(false);
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Number Guessing Game
      </Heading>
      {!player1Number || !player2Number ? (
        <VStack spacing={4}>
          <Input type="number" placeholder="Player 1's number" value={player1Number} onChange={(e) => setPlayer1Number(e.target.value)} min={1} max={20} />
          <Input type="number" placeholder="Player 2's number" value={player2Number} onChange={(e) => setPlayer2Number(e.target.value)} min={1} max={20} />
          <Button onClick={handleNumberSubmit} colorScheme="blue">
            Start Game
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Text fontSize="xl">Player {currentPlayer}'s turn to guess</Text>
          {currentPlayer === 1 ? <Input type="number" placeholder="Player 1's guess" value={player1Guess} onChange={(e) => setPlayer1Guess(e.target.value)} min={1} max={20} /> : <Input type="number" placeholder="Player 2's guess" value={player2Guess} onChange={(e) => setPlayer2Guess(e.target.value)} min={1} max={20} />}
          <Button onClick={handleGuessSubmit} colorScheme="blue">
            Submit Guess
          </Button>
        </VStack>
      )}
      {gameOver && (
        <VStack spacing={4} mt={8}>
          <Text fontSize="xl">Game Over!</Text>
          <Button onClick={resetGame} colorScheme="green">
            Play Again
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
