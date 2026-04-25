
package main

type Point struct {
    row    int
    column int
    color  int
}

const NOT_VISITED = 0

var UP = []int{1, 0}
var DOWN = []int{-1, 0}
var LEFT = []int{0, -1}
var RIGHT = []int{0, 1}
var MOVES = [][]int{UP, DOWN, LEFT, RIGHT}

var rows int
var columns int

func colorGrid(r int, c int, sources [][]int) [][]int {
    rows = r
    columns = c
    return colorTheMatrixWithMultisourceBreadthFirstSearch(sources)
}

func colorTheMatrixWithMultisourceBreadthFirstSearch(sources [][]int) [][]int {
    step := 1
    visited := make([][]int, rows)
    for i := range visited {
        visited[i] = make([]int, columns)
    }

    coloredMatrix := createColoredMatrix(sources, visited, step)
    var queueColor []Point = createQueueColor(sources)

    for len(queueColor) > 0 {

        step++
        pointsInCurrentStep := len(queueColor)

        for pointsInCurrentStep > 0 {
            current := queueColor[0]
            queueColor = queueColor[1:]

            for _, move := range MOVES {
                nextRow := current.row + move[0]
                nextColumn := current.column + move[1]

                if isInMatrix(nextRow, nextColumn) &&
                    (visited[nextRow][nextColumn] == NOT_VISITED ||
                     visited[nextRow][nextColumn] == step) &&
                    coloredMatrix[nextRow][nextColumn] < current.color {

                    visited[nextRow][nextColumn] = step
                    coloredMatrix[nextRow][nextColumn] = current.color
                    queueColor = append(queueColor, Point{nextRow, nextColumn, current.color})
                }
            }
            pointsInCurrentStep--
        }
    }
    return coloredMatrix
}

func createColoredMatrix(sources [][]int, visited [][]int, step int) [][]int {
    coloredMatrix := make([][]int, rows)
    for i := range coloredMatrix {
        coloredMatrix[i] = make([]int, columns)
    }

    for i := range sources {
        row := sources[i][0]
        column := sources[i][1]
        color := sources[i][2]

        visited[row][column] = step
        coloredMatrix[row][column] = color
    }
    return coloredMatrix
}

func createQueueColor(sources [][]int) []Point {
    // alternative data structure for queueColor: list.List from "container/list"
    queueColor := make([]Point, len(sources))
    for i := range sources {
        row := sources[i][0]
        column := sources[i][1]
        color := sources[i][2]
        queueColor[i] = Point{row, column, color}
    }
    return queueColor
}

func isInMatrix(row int, column int) bool {
    return row >= 0 && row < rows && column >= 0 && column < columns
}
