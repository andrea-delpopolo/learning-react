# Tutorial TIC TAC TOE - my complete solution to React tutorial [link](https://reactjs.org/tutorial/tutorial.html)
Contains exercise and solutions to the tutorials that I have used for learning React

## How to build and run

- Make sure you have a recent version of Node.js installed.

```
npx create-react-app my-app
cd my-app
npm start
```
- Delete all files in the src/ folder of the new project
- Paste `index.js` and `index.css` in the src/ folder

## Deployment

The solution has been deployed to Azure @ https://tictactoereact.azurewebsites.net/

## Features list

- Display the location for each move in the format (col, row) in the move history list.
- Bold the currently selected item in the move list.
- Rewrite Board to use two loops to make the squares instead of hardcoding them.
- Add a toggle button that lets you sort the moves in either ascending or descending order.
- When someone wins, highlight the three squares that caused the win.
- When no one wins, display a message about the result being a draw.
