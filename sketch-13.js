const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  // animate: true,
  //duration: 2,
  fps: 1,
  loop: true,
};

const animate = () => {
	console.log('domestika');
	requestAnimationFrame(animate);
};

const sketch = () => {
	return ({ context, width, height }) => {    
    const a_tree = new Tree(1080/2, 1080, 150, -Math.PI/2, 10, 10);
    context = a_tree.draw(context, a_tree.x, a_tree.y, a_tree.len, a_tree.angle, a_tree.depth, a_tree.branch_width);
  }
};

class Tree {
  constructor(x, y, len, angle, depth, branch_width) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.angle = angle;
    this.depth = depth;
    this.branch_width = branch_width;
  }

  draw(context, x, y, len, angle, depth, branch_width) {
    
    var rand = Math.random;
    const max_branch = 3;
    const max_angle = 2 * Math.PI / 6;

    context.beginPath();
    context.moveTo(x, y);

    const x_new = x + len * Math.cos(angle);
    const y_new = y + len * Math.sin(angle);

    context.lineCap = 'round';
    context.lineWidth = branch_width;
    context.lineTo(x_new, y_new);

    if (depth <= 2) {
      // context.strokeStyle = 'rgb(0,' + (((rand() * 64) + 128) >> 0) + ',0)';
    }
  
    else {
      context.strokeStyle = 'rgb(' + (((rand() * 64) + 64) >> 0) + ',50,25)';
      // context.strokeStyle = 'rgb(' + (((rand() * 10) + 254) >> 0) + ',44,84)';
    }
    
    context.stroke();
    
    const new_depth = depth - 1;

    if (!new_depth) {
      const stroke_list = ['#ED8975', '#F2D096', '#8FB9AA']
      const c = stroke_list[Math.floor(random.range(0, stroke_list.length))];
      
      // context.strokeStyle = 'green';
      const a_circle = new Circle(x_new, y_new, 3, c);
      a_circle.draw(context);
      return;
    }
    const sub_branches = (rand() * (max_branch - 1)) + 1;
    branch_width *= 0.7;
    
    for (let i = 0; i < sub_branches; i++) {
      const new_angle = angle + rand() * max_angle - max_angle * 0.5;
      const new_length = len * (0.7 + rand() * 0.3);
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