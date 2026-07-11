export const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;

        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args);
            }, wait);
        }
    },

    // Update grid widgets positions
    updateElementPosition(gridInstance, gridParameter, column, row,) {
        const nodes = gridInstance.current.engine.nodes;
        const occuped = Array.from(
            { length: column },
            () => Array(row).fill(false)
        )

        for(let k=0;k<nodes.length;k++) {
            const xPos = nodes[k].x;
            const yPos = nodes[k].y;
            const width = nodes[k].w;
            const height = nodes[k].h;
            for(let i=xPos;i<xPos + width;i++) {
                for(let j=yPos;j<yPos + height;j++) {
                    occuped[i][j] = true;
                }
            }
        }

        return occuped;
    }
}