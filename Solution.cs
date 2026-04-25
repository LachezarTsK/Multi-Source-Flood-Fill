
using System;
using System.Collections.Generic;

public class Solution
{
    private record Point(int Row, int Column, int Color) { }

    private static readonly int NOT_VISITED = 0;
    private static readonly int[] UP = { 1, 0 };
    private static readonly int[] DOWN = { -1, 0 };
    private static readonly int[] LEFT = { 0, -1 };
    private static readonly int[] RIGHT = { 0, 1 };

    private static readonly int[][] MOVES = { UP, DOWN, LEFT, RIGHT };

    private int rows;
    private int columns;

    public int[][] ColorGrid(int rows, int columns, int[][] sources)
    {
        this.rows = rows;
        this.columns = columns;
        return ColorTheMatrixWithMultisourceBreadthFirstSearch(sources);
    }

    private int[][] ColorTheMatrixWithMultisourceBreadthFirstSearch(int[][] sources)
    {
        int step = 1;
        int[][] visited = new int[rows][];
        for (int row = 0; row < rows; ++row)
        {
            visited[row] = new int[columns];
        }

        int[][] coloredMatrix = CreateColoredMatrix(sources, visited, step);
        Queue<Point> queueColor = CreateQueueColor(sources);

        while (queueColor.Count > 0)
        {

            ++step;
            int pointsInCurrentStep = queueColor.Count;

            while (pointsInCurrentStep > 0)
            {
                Point current = queueColor.Dequeue();

                foreach (int[] move in MOVES)
                {
                    int nextRow = current.Row + move[0];
                    int nextColumn = current.Column + move[1];

                    if (IsInMatrix(nextRow, nextColumn)
                            && (visited[nextRow][nextColumn] == NOT_VISITED
                            || visited[nextRow][nextColumn] == step)
                            && coloredMatrix[nextRow][nextColumn] < current.Color)
                    {

                        visited[nextRow][nextColumn] = step;
                        coloredMatrix[nextRow][nextColumn] = current.Color;
                        queueColor.Enqueue(new Point(nextRow, nextColumn, current.Color));
                    }
                }
                --pointsInCurrentStep;
            }
        }
        return coloredMatrix;
    }

    private int[][] CreateColoredMatrix(int[][] sources, int[][] visited, int step)
    {
        int[][] coloredMatrix = new int[rows][];
        for (int row = 0; row < rows; ++row)
        {
            coloredMatrix[row] = new int[columns];
        }

        foreach (int[] source in sources)
        {
            int row = source[0];
            int column = source[1];
            int color = source[2];

            visited[row][column] = step;
            coloredMatrix[row][column] = color;
        }
        return coloredMatrix;
    }

    private Queue<Point> CreateQueueColor(int[][] sources)
    {
        Queue<Point> queueColor = [];
        foreach (int[] source in sources)
        {
            int row = source[0];
            int column = source[1];
            int color = source[2];

            queueColor.Enqueue(new Point(row, column, color));
        }
        return queueColor;
    }

    private bool IsInMatrix(int row, int column)
    {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
