
import java.util.*

class Solution {

    private data class Point(val row: Int, val column: Int, val color: Int) {}

    private companion object {
        const val NOT_VISITED = 0
        val UP = intArrayOf(1, 0)
        val DOWN = intArrayOf(-1, 0)
        val LEFT = intArrayOf(0, -1)
        val RIGHT = intArrayOf(0, 1)
        val MOVES = arrayOf(UP, DOWN, LEFT, RIGHT)
    }

    private var rows = 0
    private var columns = 0

    fun colorGrid(rows: Int, columns: Int, sources: Array<IntArray>): Array<IntArray> {
        this.rows = rows
        this.columns = columns
        return colorTheMatrixWithMultisourceBreadthFirstSearch(sources)
    }

    private fun colorTheMatrixWithMultisourceBreadthFirstSearch(sources: Array<IntArray>): Array<IntArray> {
        var step = 1
        val visited = Array<IntArray>(rows) { IntArray(columns) }
        val coloredMatrix = createColoredMatrix(sources, visited, step)
        val queueColor = createQueueColor(sources)

        while (queueColor.isNotEmpty()) {

            ++step
            var pointsInCurrentStep = queueColor.size

            while (pointsInCurrentStep > 0) {
                val current = queueColor.removeFirst()

                for (move in MOVES) {
                    val nextRow = current.row + move[0]
                    val nextColumn = current.column + move[1]

                    if (isInMatrix(nextRow, nextColumn)
                        && (visited[nextRow][nextColumn] == NOT_VISITED
                                || visited[nextRow][nextColumn] == step)
                        && coloredMatrix[nextRow][nextColumn] < current.color
                    ) {

                        visited[nextRow][nextColumn] = step
                        coloredMatrix[nextRow][nextColumn] = current.color
                        queueColor.add(Point(nextRow, nextColumn, current.color))
                    }
                }
                --pointsInCurrentStep
            }
        }
        return coloredMatrix
    }

    private fun createColoredMatrix(sources: Array<IntArray>, visited: Array<IntArray>, step: Int): Array<IntArray> {
        val coloredMatrix = Array<IntArray>(rows) { IntArray(columns) }
        for ((row, column, color) in sources) {
            visited[row][column] = step
            coloredMatrix[row][column] = color
        }
        return coloredMatrix
    }

    private fun createQueueColor(sources: Array<IntArray>): MutableList<Point> {
        val queueColor = LinkedList<Point>()
        for ((row, column, color) in sources) {
            queueColor.add(Point(row, column, color))
        }
        return queueColor
    }

    private fun isInMatrix(row: Int, column: Int): Boolean {
        return row in 0..<rows && column in 0..<columns
    }
}
