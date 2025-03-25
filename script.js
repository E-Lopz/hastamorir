let cols, rows;
let grid;
let resolution = 10;
let myFont;
let showText = false;
let canvas;

function preload() {
    myFont = loadFont('/fonts/EVA-Matisse_Classic.ttf'); // Ensure Bold.ttf is in the same directory
}

function setup() {
    let parentDiv = document.getElementById('landing');
    canvas = createCanvas(parentDiv.clientWidth, parentDiv.clientHeight);
    canvas.parent('landing'); // Attach canvas inside the div

    cols = floor(width / resolution);
    rows = floor(height / resolution);
    grid = make2DArray(cols, rows, true); // Initialize with random values
}

function draw() {
    background(0);
    
    let deadCells = 0;

    // Draw Game of Life cells
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 1) {
                stroke(255);
                strokeWeight(2);
                line(x, y, x, y + resolution - 2);
            } else {
                deadCells++; // Count dead cells
            }
        }
    }

    // Update grid for next generation
    grid = nextGeneration(grid);

    // If most cells are dead, show "Hasta Morir"
    showText = deadCells > cols * rows * 0.9;

    // Draw text inside canvas
    if (showText) {
        textFont(myFont);
        let textSizeValue = min(width, height) * 0.1; // Adjust size dynamically
        textSize(textSizeValue);
        fill(255);
        textAlign(CENTER, CENTER);
        text("HASTA MORIR", width / 2, height / 2);
    }
}

// Function to create a 2D array (optional preserveGrid)
function make2DArray(cols, rows, randomize = false, oldGrid = null) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            if (randomize) {
                arr[i][j] = floor(random(2)); // Initialize with random values
            } else if (oldGrid && i < oldGrid.length && j < oldGrid[i].length) {
                arr[i][j] = oldGrid[i][j]; // Preserve old grid values
            } else {
                arr[i][j] = 0; // Default to dead cell
            }
        }
    }
    return arr;
}

// Function to compute the next generation
function nextGeneration(grid) {
    let newGrid = make2DArray(cols, rows, false, grid);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbors = countNeighbors(grid, i, j);
            if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
                newGrid[i][j] = 0; // Cell dies
            } else if (grid[i][j] == 0 && neighbors == 3) {
                newGrid[i][j] = 1; // Cell is born
            }
        }
    }
    return newGrid;
}

// Function to count neighbors
function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y]; // Exclude itself
    return sum;
}

// Resize canvas to match parent div **without resetting the game**
function windowResized() {
    let parentDiv = document.getElementById('landing');
    resizeCanvas(parentDiv.clientWidth, parentDiv.clientHeight);
}




/////// NAV dropdown ///////

/////// NAV dropdown ///////

document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const hoverElement = dropdown.querySelector('.dropdown-hover');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        // Show dropdown on hover
        hoverElement.addEventListener('mouseenter', () => {
            dropdownContent.style.display = 'block';
        });

        // Keep dropdown open when moving mouse inside the dropdown content
        dropdownContent.addEventListener('mouseenter', () => {
            dropdownContent.style.display = 'block';
        });

        // Hide dropdown only when the mouse leaves both hoverElement and dropdownContent
        dropdown.addEventListener('mouseleave', () => {
            dropdownContent.style.display = 'none';
        });
    });

    // Close all dropdowns if clicking outside
    document.addEventListener('click', function (e) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.querySelector('.dropdown-content').style.display = 'none';
            }
        });
    });
});