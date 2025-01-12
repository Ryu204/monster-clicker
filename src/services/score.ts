export async function getHighScore() {
  // Simulate a 3-second delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Return mock data
  return {
    data: [
      { score: 10, name: "Jane" },
      { score: 20, name: "John" },
      { score: 15, name: "Alice" },
      { score: 5, name: "Alice" },
      { score: 15, name: "Alice" },
      { score: 15, name: "Alice" },
      { score: 15, name: "Alice" },
      { score: 15, name: "Alice" },
      { score: 15, name: "Alice" },
      { score: 15, name: "Alice" },
      { score: 15, name: "Alice" },
    ],
  };
}
