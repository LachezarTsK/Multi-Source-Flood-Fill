
// const {Queue} = require('@datastructures-js/queue');
/*
 Queue is internally included in the solution file on leetcode.
 When running the code on leetcode it should stay commented out. 
 It is mentioned here just for information about the external library 
 that is applied for this data structure.
 */

function colorGrid(rows: number, columns: number, sources: number[][]): number[][] {
    const boundary = { rows: rows, columns: columns };
    return colorTheMatrixWithMultisourceBreadthFirstSearch(sources, boundary);
};

function colorTheMatrixWithMultisourceBreadthFirstSearch(sources: number[][], boundary: Boundary): number[][] {
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

function createColoredMatrix(sources: number[][], visited: number[][], step: number, boundary: Boundary): number[][] {
    const coloredMatrix = Array.from(new Array(boundary.rows), () => new Array(boundary.columns).fill(0));
    for (let [row, column, color] of sources) {
        visited[row][column] = step;
        coloredMatrix[row][column] = color;
    }
    return coloredMatrix;
}

function createQueueColor(sources: number[][]): Queue<Point> {
    const queueColor = new Queue<Point>();
    for (let [row, column, color] of sources) {
        queueColor.enqueue(new Point(row, column, color));
    }
    return queueColor;
}

function isInMatrix(row: number, column: number, boundary: Boundary): boolean {
    return row >= 0 && row < boundary.rows && column >= 0 && column < boundary.columns;
}

class Point {
    constructor(public row: number, public column: number, public color: number) { }
}

type Boundary = { rows: number, columns: number }

class Util {
    static NOT_VISITED = 0;
    static UP = [1, 0];
    static DOWN = [-1, 0]
    static LEFT = [0, -1]
    static RIGHT = [0, 1]
    static MOVES = [Util.UP, Util.DOWN, Util.LEFT, Util.RIGHT];
}
