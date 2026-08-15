export const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;

        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args);
            }, wait);
        };
    },

    // Update grid widgets positions
    updateElementPosition(gridInstance, column, row) {
        const nodes = gridInstance.current.engine.nodes;
        const occuped = Array.from({ length: column }, () =>
            Array.from({ length: row }, () => false),
        );

        for (let k = 0; k < nodes.length; k++) {
            const xPos = nodes[k].x;
            const yPos = nodes[k].y;
            const width = nodes[k].w;
            const height = nodes[k].h;
            for (let i = xPos; i < xPos + width; i++) {
                for (let j = yPos; j < yPos + height; j++) {
                    if (i >= 0 && i < column && j >= 0 && j < row) {
                        occuped[i][j] = true;
                    }
                }
            }
        }

        return occuped;
    },

    // Verify grid space
    verifyGrid(positionMatrix, widgetType, row, column) {
        const matrix = positionMatrix;

        for (let i = 0; i < column; i++) {
            for (let j = 0; j < row; j++) {
                switch (widgetType) {
                    case "pomodoro":
                        if (!matrix[i][j]) {
                            if(this.verifyWidget(matrix, row, column, 1, 1, i, j)) {
                                return true;
                            }
                        }
                        break;

                    case "list":
                        if (!matrix[i][j]) {
                            if(this.verifyWidget(matrix, row, column, 3, 2, i, j)) {
                                return true;
                            }
                        }
                        break;
                    
                    case "note":
                        if(!matrix[i][j]) {
                            if(this.verifyWidget(matrix, row, column, 2, 2, i, j)) {
                                return true;
                            }
                        }
                        break;
                }
            }
        }

        return false;
    },

    verifyWidget(matrix, row, column, width, height, i, j) {
        let emptySpace = true;
        for (let k = i; k < i + width; k++) {
            for (let l = j; l < j + height; l++) {
                if (
                    k >= column ||
                    l >= row ||
                    matrix[k][l]
                ) {
                    emptySpace = false;
                    break;
                }
            }
            if (!emptySpace) break;
        }
        if (emptySpace) {
            return true;
        }
        return false;
    }
};
