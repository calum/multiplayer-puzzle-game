# GameLobby API

A standard is needed to communicate between players in a lobby.

## Status Codes
100.  New Player Connected
200.  Starting Game
201.  Loaded Puzzle
300.  Game Information
400.  Game Over
500.  Return to lobby

### Examples
```js
// New Player Connected
{
  status: 100,
  username: 'name'
}

// Starting Game
{
  status: 200,
  puzzleName: 'penguin'
}

// Loaded Puzzle
{
  status: 201
}

// Game Information
{
  status: 300,
  sprite: ... ,
}
```
