
#include <span>
#include <queue>
#include <ranges>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {

    struct Point {
        int row{};
        int column{};
        int color{};
        Point(int row, int column, int color) : row{ row }, column{ column }, color{ color } {}
    };

    static const int NOT_VISITED = 0;
    inline static const array<int, 2> UP = { 1, 0 };
    inline static const array<int, 2> DOWN = { -1, 0 };
    inline static const array<int, 2> LEFT = { 0, -1 };
    inline static const array<int, 2> RIGHT = { 0, 1 };

    inline static const array<array<int, 2>, 4> MOVES = { UP, DOWN, LEFT, RIGHT };

    int rows;
    int columns;

public:
    vector<vector<int>> colorGrid(int rows, int columns, vector<vector<int>>& sources) {
        this->rows = rows;
        this->columns = columns;
        return colorTheMatrixWithMultisourceBreadthFirstSearch(sources);
    }

private:
    vector<vector<int>> colorTheMatrixWithMultisourceBreadthFirstSearch(span<const vector<int>> sources) {
        int step = 1;
        vector<vector<int>> visited(rows, vector<int>(columns));
        vector<vector<int>> coloredMatrix = createColoredMatrix(sources, visited, step);
        queue<Point> queueColor = createQueueColor(sources);

        while (!queueColor.empty()) {

            ++step;
            int pointsInCurrentStep = queueColor.size();

            while (pointsInCurrentStep > 0) {
                Point current = queueColor.front();
                queueColor.pop();

                for (const auto& move : MOVES) {
                    int nextRow = current.row + move[0];
                    int nextColumn = current.column + move[1];

                    if (isInMatrix(nextRow, nextColumn) &&
                        (visited[nextRow][nextColumn] == NOT_VISITED ||
                         visited[nextRow][nextColumn] == step) &&
                        coloredMatrix[nextRow][nextColumn] < current.color) {

                        visited[nextRow][nextColumn] = step;
                        coloredMatrix[nextRow][nextColumn] = current.color;
                        queueColor.emplace(nextRow, nextColumn, current.color);
                    }
                }
                --pointsInCurrentStep;
            }
        }
        return coloredMatrix;
    }

    vector<vector<int>> createColoredMatrix(span<const vector<int>> sources, span<vector<int>> visited, int step) {
        vector<vector<int>> coloredMatrix(rows, vector<int>(columns));

        for (const auto& source : sources) {
            int row = source[0];
            int column = source[1];
            int color = source[2];

            visited[row][column] = step;
            coloredMatrix[row][column] = color;
        }
        return coloredMatrix;
    }

    queue<Point> createQueueColor(span<const vector<int>> sources) {
        queue<Point> queueColor;

        for (const auto& source : sources) {
            int row = source[0];
            int column = source[1];
            int color = source[2];

            queueColor.emplace(row, column, color);
        }
        return queueColor;
    }

    bool isInMatrix(int row, int column) const {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
