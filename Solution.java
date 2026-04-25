
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private record Point(int row, int column, int color) {}

    private static final int NOT_VISITED = 0;
    private static final int[] UP = {1, 0};
    private static final int[] DOWN = {-1, 0};
    private static final int[] LEFT = {0, -1};
    private static final int[] RIGHT = {0, 1};
    private static final int[][] MOVES = {UP, DOWN, LEFT, RIGHT};

    private int rows;
    private int columns;

    public int[][] colorGrid(int rows, int columns, int[][] sources) {
        this.rows = rows;
        this.columns = columns;
        return colorTheMatrixWithMultisourceBreadthFirstSearch(sources);
    }

    private int[][] colorTheMatrixWithMultisourceBreadthFirstSearch(int[][] sources) {
        int step = 1;
        int[][] visited = new int[rows][columns];
        int[][] coloredMatrix = createColoredMatrix(sources, visited, step);
        Queue<Point> queueColor = createQueueColor(sources);

        while (!queueColor.isEmpty()) {

            ++step;
            int pointsInCurrentStep = queueColor.size();

            while (pointsInCurrentStep > 0) {
                Point current = queueColor.poll();

                for (int[] move : MOVES) {
                    int nextRow = current.row + move[0];
                    int nextColumn = current.column + move[1];

                    if (isInMatrix(nextRow, nextColumn)
                            && (visited[nextRow][nextColumn] == NOT_VISITED
                            || visited[nextRow][nextColumn] == step)
                            && coloredMatrix[nextRow][nextColumn] < current.color) {

                        visited[nextRow][nextColumn] = step;
                        coloredMatrix[nextRow][nextColumn] = current.color;
                        queueColor.add(new Point(nextRow, nextColumn, current.color));
                    }
                }
                --pointsInCurrentStep;
            }
        }
        return coloredMatrix;
    }

    private int[][] createColoredMatrix(int[][] sources, int[][] visited, int step) {
        int[][] coloredMatrix = new int[rows][columns];
        for (int[] source : sources) {
            int row = source[0];
            int column = source[1];
            int color = source[2];

            visited[row][column] = step;
            coloredMatrix[row][column] = color;
        }
        return coloredMatrix;
    }

    private Queue<Point> createQueueColor(int[][] sources) {
        Queue<Point> queueColor = new LinkedList<>();
        for (int[] source : sources) {
            int row = source[0];
            int column = source[1];
            int color = source[2];

            queueColor.add(new Point(row, column, color));
        }
        return queueColor;
    }

    private boolean isInMatrix(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
