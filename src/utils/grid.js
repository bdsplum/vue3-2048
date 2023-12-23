import { reactive } from 'vue';

/**
 * Represents a grid
 */
export default class Grid {
    /**
     * Creates a grid of the given size
     * @param {Number} x - the horizontal number of cells
     * @param {Number} y - the vertical number of cells
     */
    constructor(x = 4, y = 4) {
        this._sizeX = x;
        this._sizeY = y;
        this._cells = reactive([]);

        this.reset();
    }

    /**
     * @returns {Array[Object]} An array of empty cells
     */
    get EmptyCells() {
        const cells = [];

        for(let i = 0; i < this._sizeY; i++) {
            for(let j = 0; j < this._sizeX; j++) {
                if(this.cellAvailable(j, i)) {
                    cells.push({
                        x: j,
                        y: i
                    });
                }
            }
        }

        return cells;
    }

    /**
     * @returns {Boolean} Whether the grid has an empty cell
     */
    get HasAvailableCell() {
        return this._cells.length < this._sizeX * this._sizeY;
    }

    /**
     * Resets the grid
     */
    reset() {
        this._cells.splice(0);
    }

    /**
     * Gets whether the cell at the given coordinates is available
     * @param {Number} x - the x coordinate
     * @param {Number} y - the y coordinate
     * @returns {Boolean} Whether the cell is available
     */
    cellAvailable(x, y) {
        return !this._cells.some(c => c.x === x && c.y === y);
    }

    /**
     * Inserts a cell at given coordinates
     * @param {Number} x - the x coordinate
     * @param {Number} y - the y coordinate
     * @param {Cell} cell - the cell to insert
     */
    insertCell(cell) {
        this._cells.push(reactive(cell));
    }

    /**
     * Removes a cell at given coordinates
     * @param {Number} x - the x coordinate
     * @param {Number} y - the y coordinate
     */
    removeCell(x, y) {
        const idx = this._cells.findIndex(c => c.x === x && c.y === y);
        this._cells.splice(idx, 1);
    }

    /**
     * Gets a random empty cell coordinate
     * @returns {Cell} A random empty cell
     */
    randomCell() {
        const cells = this.EmptyCells;

        if(cells.length) {
            const idx = randomNumberInclusive(0, cells.length - 1);
            return cells[idx];
        }

        return null;
    }

}

/**
 * Gets a random number inclusive between the given limits
 * @param {Number} min - the minimum number
 * @param {Number} max - the maximum number
 * @returns {Number} A random number between limits 
 */
function randomNumberInclusive(min, max) {
    const fMin = Math.ceil(min);
    const fMax = Math.floor(max);
    return Math.floor(Math.random() * (fMax - fMin + 1) + fMin);
}