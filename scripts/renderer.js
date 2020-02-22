class Renderer {
    constructor(scale) {
        this.cols = 64;
        this.rows = 32;

        this.scale = scale;

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        this.display = new Array(this.cols * this.rows);
    }

    setPixel(x, y) {
        if (x > this.cols) {
            x -= this.cols;
        } else if (x < 0) {
            x += this.cols;
        }
        
        if (y > this.rows) {
            y -= this.rows;
        } else if (y < 0) {
            y += this.rows;
        }

        let pixelLoc = x + (y * this.cols);

        this.display[pixelLoc] ^= 1;

        return !this.display[pixelLoc];
    }

    clear() {
        this.display = new Array(this.cols * this.rows);
    }

    render() {
        // Clears the display every render cycle. Typical for a render loop.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Loop through our display array
        for (let i = 0; i < this.cols * this.rows; i++) {
            // Grabs the x position of the pixel based off of `i`
            let x = (i % this.cols) * this.scale;
    
            // Grabs the y position of the pixel based off of `i`
            let y = Math.floor(i / this.cols) * this.scale;
    
            // If the value at this.display[i] == 1, then draw a pixel.
            if (this.display[i]) {
                // Set the pixel color to black
                this.ctx.fillStyle = '#000';
    
                // Place a pixel at position (x, y) with a width and height of scale
                this.ctx.fillRect(x, y, this.scale, this.scale);
            }
        }
    }
}

export default Renderer;