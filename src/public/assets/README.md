# Jig-Saw Assets
This directory is where the game assets are saved.

## Puzzles
Each puzzle directory should contain 64 `.png` files and a `properties.json` file.

Each `.png` file is named by its position i.e. the top left piece is `00.png` and the bottom right is `77.png`. The `properties.json` file tells the game which pieces have tabs on their top or their left side respectively. This allows the pieces to be positioned correctly on the game board since tabs effect the size of the pieces.
