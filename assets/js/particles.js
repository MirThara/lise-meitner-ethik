window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d', {
        willReadFrequently: true
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = this.effect.canvasHeight;
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap;
            // this.size = 1;
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.force = 0;
            this.angle = 0;
            this.distance = 0;
            // this.friction = Math.random() * 0.01 + 0.92; //0.6; 0.15
            this.friction = Math.random() * 0.6 + 0.2; //0.6; 0.15
            this.ease = Math.random() * 0.225 + 0.005; // 0.1; 0.005
        }
        draw() {
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.mouse.radius / this.distance;

            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
    }

    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.fontSize = 130;
            this.lineHeight = this.fontSize * 1.2;
            this.maxTextWidth = canvasWidth * 0.8;
            this.image = document.getElementById('image');
            this.textInput = document.getElementById('textInput');
            this.particles = [];
            this.gap = 1;
            this.mouse = {
                radius: 15000,
                x: 0,
                y: 0,
                active: false
            };
            canvas.addEventListener('mouseenter', () => {
                this.mouse.active = true;
            });

            canvas.addEventListener('mouseleave', () => {
                this.mouse.active = false;
                this.mouse.x = null;
                this.mouse.y = null;
            });

            canvas.addEventListener('mousemove', (e) => {
                if (this.mouse.active) {
                    const rect = canvas.getBoundingClientRect();
                    this.mouse.x = e.x - rect.left;
                    this.mouse.y = e.y - rect.top;
                }
            });
        }
        wrapText() {
            const maxWidth = window.innerWidth;
            const aspectRatio = this.image.width / this.image.height;

            let imageWidth = maxWidth;
            let imageHeight = imageWidth / aspectRatio; //imageWidth / aspectRatio;

            if (this.image.width < maxWidth) {
                imageWidth = this.image.width;
                imageHeight = this.image.height;
            }
            let x;
            let y;

            x = this.canvasWidth * 0.5 - imageWidth * 0.5;
            y = window.innerHeight - imageHeight;

            console.log("canvasWidth:", this.canvasWidth, "window.innerWidth:", window.innerWidth);
            console.log("imageWidth:", imageWidth, "x:", x);


            this.context.drawImage(this.image, x, y, imageWidth, imageHeight);

            this.convertToParticles();
        }

        convertToParticles() {
            this.particles = [];
            const width = this.canvasWidth;
            const height = this.canvasHeight;
            const pixels = this.context.getImageData(0, 0, width, height).data;
            this.context.clearRect(0, 0, width, height);
            let index = 0;
            for (let y = 0; y < height; y += this.gap) {
                for (let x = 0; x < width; x += this.gap) {
                    const alpha = pixels[index + 3];
                    if (alpha > 0) {
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = `rgb(${red},${green},${blue})`;
                        this.particles.push(new Particle(this, x, y, color));
                    }
                    index += 4 * this.gap; // schneller als jedes Mal multiplizieren
                }
                index += 4 * width * (this.gap - 1);
            }
        }


        render() {
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            })
        }

        resize(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.maxTextWidth = this.canvasWidth * 0.8;
        }
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText('Lorem ipsum dolor, sit amet consectetur adipisicing elit.');

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.render();
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        effect.resize(canvas.width, canvas.height);
        effect.wrapText('Lorem ipsum dolor, sit amet consectetur adipisicing elit.');
    });
});