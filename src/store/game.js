import { defineStore } from 'pinia';
import { ref } from 'vue';
import Grid from '../utils/grid';

const gridSize = 4;
let id = 1;

export const useGameStore = defineStore('game', () => {
    const grid = ref(null);

    /**
     * Starts a new game
     */
    function newGame() {
        grid.value = new Grid(gridSize, gridSize);
        grid.value.reset();

        addCell(2);
    }

    /**
     * Adds a new cell to the grid
     * @param {Number} number - the number of cells to add
     */
    function addCell(number = 1) {
        for(let i = 0; i < number; i++) {
            const c = grid.value.randomCell();
            if(c) {
                const newCell = {...c, value: 2, id: id++};
                grid.value.insertCell(newCell);
            }
        }
    }

    document.addEventListener('keydown', ev => {
        const direction = {
            38: { axis: 'y', maxAxis: 0, reverse: -1, groupAxis: 'x', groupMaxAxis: grid.value._sizeX }, // up
            40: { axis: 'y', maxAxis: grid.value._sizeY - 1, reverse: 1, groupAxis: 'x', groupMaxAxis: grid.value._sizeX }, // down
            37: { axis: 'x', maxAxis: 0, reverse: -1, groupAxis: 'y', groupMaxAxis: grid.value._sizeY }, // left
            39: { axis: 'x', maxAxis: grid.value._sizeX - 1, reverse: 1, groupAxis: 'y', groupMaxAxis: grid.value._sizeY } // right
        };

        const dir = direction[ev.which];
        if(dir) {
            let moved = false;
            ev.preventDefault();

            // go through each row/column
            for(let idx = 0; idx < dir.groupMaxAxis; idx++) {
                // get cells in row ordered by rightmost first
                let cells = grid.value._cells.filter(c => c[dir.groupAxis] === idx).sort((a, b) => {
                    if(a[dir.axis] > b[dir.axis]) return -1 * dir.reverse;
                    return 1 * dir.reverse;
                });

                // process each cell
                for(let i = 0; i < cells.length; i++) {
                    if(i === 0) {
                        // furthest-most cell
                        if(cells[i][dir.axis] !== dir.maxAxis) {
                            cells[i][dir.axis] = dir.maxAxis;
                            moved = true;
                        }
                    } else if(cells[i].value === cells[i - 1].value && !cells[i - 1].merged) {
                        // merge-able cell
                        cells[i].value += cells[i - 1].value;
                        cells[i][dir.axis] = cells[i - 1][dir.axis];
                        cells[i].merged = true;
                        cells[i - 1].remove = true;
                        moved = true;
                    } else if(Math.abs(cells[i - 1][dir.axis] - cells[i][dir.axis]) > 1) {
                        // move-able cell - there is space between this and the previous cell
                        cells[i][dir.axis] = cells[i - 1][dir.axis] - dir.reverse;
                        moved = true;
                    }
                }
            }

            // clean up
            grid.value._cells.forEach(c => c.merged = false);
            grid.value._cells = grid.value._cells.filter(c => !c.remove);

            if(moved) {
                addCell();
            } else if(!grid.value.HasAvailableCell) {
                alert('Game over!');
            } else {
                // must play valid move before new cell is placed
            }
        }
    });

    return {
        grid,
        newGame
    }
});