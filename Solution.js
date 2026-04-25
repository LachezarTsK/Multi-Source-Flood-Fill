
// const {Queue} = require('@datastructures-js/queue');
/*
 Queue is internally included in the solution file on leetcode.
 When running the code on leetcode it should stay commented out. 
 It is mentioned here just for information about the external library 
 that is applied for this data structure.
 */

/**
 * @param {number} rows
 * @param {number} columns
 * @param {number[][]} sources
 * @return {number[][]}
 */
var colorGrid = function (rows, columns, sources) {
    const boundary = {rows: rows, columns: columns};
    return colorTheMatrixWithMultisourceBreadthFirstSearch(sources, boundary);
};

/**
 * @param {number[][]} sources
 * @param {object{rows: number, columns: number}} boundary 
 * @return {number[][]}
 */
function colorTheMatrixWithMultisourceBreadthFirstSearch(sources, boundary) {
    let step = 1;
    const visited = Array.from(new Array(boundary.rows), () => new Array(boundary.columns).fill(0));
    const coloredMatrix = createColoredMatrix(sources, visited, step, boundary);
    const queueColor = createQueueColor(sources);

    while (!queueColor.isEmpty()) {

        ++step;
        let pointsInCurrentStep = queueColor.size();

        while (pointsInCurrentStep > 0) {
            const current = queueColor.dequeue();

            for (let move of Util.MOVES) {
                const nextRow = current.row + move[0];
                const nextColumn = current.column + move[1];

                if (isInMatrix(nextRow, nextColumn, boundary)
                        && (visited[nextRow][nextColumn] === Util.NOT_VISITED
                                || visited[nextRow][nextColumn] === step)
                        && coloredMatrix[nextRow][nextColumn] < current.color) {

                    visited[nextRow][nextColumn] = step;
                    coloredMatrix[nextRow][nextColumn] = current.color;
                    queueColor.enqueue(new Point(nextRow, nextColumn, current.color));
                }
            }
            --pointsInCurrentStep;
        }
    }
    return coloredMatrix;
}

/**
 * @param {number[][]} sources
 * @param {number[][]} visited
 * @param {number} step
 * @param {object{rows: number, columns: number}} boundary 
 * @return {number[][]}
 */
function createColoredMatrix(sources, visited, step, boundary) {
    const coloredMatrix = Array.from(new Array(boundary.rows), () => new Array(boundary.columns).fill(0));
    for (let [row, column, color] of sources) {
        visited[row][column] = step;
        coloredMatrix[row][column] = color;
    }
    return coloredMatrix;
}

/**
 * @param {number[][]} sources
 * @return {Queue<Point>}
 */
function createQueueColor(sources) {
    const queueColor = new Queue();
    for (let [row, column, color] of sources) {
        queueColor.enqueue(new Point(row, column, color));
    }
    return queueColor;
}

/**
 * @param {number} row
 * @param {number} column
 * @param {object{rows: number, columns: number}} boundary 
 * @return {boolean}
 */
function isInMatrix(row, column, boundary) {
    return row >= 0 && row < boundary.rows && column >= 0 && column < boundary.columns;
}

/**
 * @param {number} row
 * @param {number} column
 * @param {number} color
 */
function Point(row, column, color) {
    this.row = row;
    this.column = column;
    this.color = color;
}

class Util {
    static NOT_VISITED = 0;
    static UP = [1, 0];
    static DOWN = [-1, 0]
    static LEFT = [0, -1]
    static RIGHT = [0, 1]
    static MOVES = [Util.UP, Util.DOWN, Util.LEFT, Util.RIGHT];
}
