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
            Array.from({ length: row }, () => false)
        );

        console.log("Occuped: ", occuped);
        console.log("Nodes: ", nodes);

        for (let k = 0; k < nodes.length; k++) {
            const xPos = nodes[k].x;
            const yPos = nodes[k].y;
            const width = nodes[k].w;
            const height = nodes[k].h;
            for (let i = xPos; i < xPos + width; i++) {
                for (let j = yPos; j < yPos + height; j++) {
                    if(i>=0 && i<column && j>=0 && j<row) {
                        occuped[i][j] = true;
                        console.log("width, height: ", width, height);
                        console.log("i, j: ", i, j);
                    }
                }
            }
        }

        return occuped;
    },

    // Verify grid space
    verifyGrid(positionMatrix, widgetType, row, column) {
        const matrix = positionMatrix;

        console.log(matrix);
        for(let i=0;i<column;i++) {
            for(let j=0;j<row;j++) {
                switch(widgetType) {
                    case "pomodoro":
                        console.log("Matriz: ", matrix[i][j]);
                        if(!matrix[i][j]) {
                            return true;
                        }
                        break;

                    case "list":
                        if(!matrix[i][j]) {
                            let emptySpace = true;
                            for(let k=i;k<i+2;k++) {
                                for(let l=j;l<j+3;l++) {
                                    if(k >= row || l >= column || matrix[k][l]) {
                                        emptySpace = false;
                                        break;
                                    }
                                }
                                if(!emptySpace) break;
                            }
                            if(emptySpace) {
                                return true;
                            }
                        }
                        break;
                }
            }
        }
    }
};
