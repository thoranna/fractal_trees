// Fractals

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  // animate: true,
  // duration: 4,
  dimensions: [1080, 1080],
  fps: 0.5,
};

const animate = () => {
	console.log('domestika');
	requestAnimationFrame(animate);
};

const sketch = () => {
	return ({ context, width, height }) => { 

    // Create gradient
    var grd = context.createLinearGradient(0, 0, 0, 1500);
    grd.addColorStop(0, "#F1B3BA");
    grd.addColorStop(1, "white");

    // Fill with gradient
    context.fillStyle = grd;
    context.fillRect(0, 0, width, height);
    var rand = Math.random;

    let num = 80;
    
    const a_tree = new Tree(1080/2, 1080, 300, -Math.PI/2, 9, 8);
    const a_tree2 = new Tree((num-1)*1080/num, 1080, 150, -Math.PI/2, 7, 5);
    const a_tree3 = new Tree(1080/num, 1080, 50, -Math.PI/2, 7, 7);
    for (let i = 30; i < num; i++) {
      a_tree3.draw(context, a_tree3.x + (1080/num)*i*rand() + 50, a_tree3.y, 50 + rand()*250, a_tree3.angle, a_tree3.depth, a_tree3.branch_width);
    }
  }
};

class Tree {
  constructor(x, y, len, angle, depth, branch_width) {
    this.x = x
    this.y = y;
    this.len = len;
    this.angle = angle;
    this.depth = depth;
    this.branch_width = branch_width;
  }

  draw(context, x, y, len, angle, depth, branch_width) {
    
    var rand = Math.random;
    const max_branch = 4;
    const max_angle = 2 * Math.PI / 4;

    const x_new = x + len * Math.cos(angle)
    const y_new = y + len * Math.sin(angle)
    
    context.beginPath();
    context.moveTo(x, y);
    context.lineWidth = branch_width;
    context.lineTo(x_new, y_new);
    context.stroke();
    
    const new_depth = depth - 1;

    if (!new_depth) {
      const stroke_list = ['#e64c05', '#ff7b03', '#fb8905']
      const c = stroke_list[Math.floor(random.range(0, stroke_list.length))];
      const a_circle = new Circle(x_new, y_new, 4*rand(), c);
      a_circle.draw(context);
      return;
    }
    const sub_branches = (rand() * (max_branch - 1)) + 1;
    branch_width *= 0.5
    
    for (let i = 0; i < sub_branches; i++) {
      const new_angle = angle + rand() * max_angle - max_angle * 0.5;
      const new_length = len * (0.6 + rand() * 0.01);
      this.draw(context, x_new, y_new, new_length, new_angle, new_depth, branch_width)
    }
  }
}

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    context.fillStyle = this.color;
    context.fill();
  }
}
canvasSketch(sketch, settings);
