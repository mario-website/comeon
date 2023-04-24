declare global {
  interface Window {
    comeon: {
      game: {
        launch: (gameCode: string) => void;
      };
    };
  }
}

export {};
