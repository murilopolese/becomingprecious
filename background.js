window.onload = function() {
  const points = []
  let size
  let cols, rows
  const colors = [
    '#fe5301',
    '#f87c84',
    '#e3c63b',
    '#037d5f',
    '#62a3c7',
    '#013287',
    '#d0c3b3'
  ]
  const operations = [
    '+', '-', '*', '/', '&', '^', '|', 'min', 'max'
  ]

  function operator(op, a, b) {
    switch (op) {
      case '+': return a + b;
      case '-': return Math.abs(a - b);
      case '*': return a * b;
      case '/': return parseInt(a / max(1, b));
      case '&': return a & b;
      case '^': return a ^ b;
      case '|': return a | b;
      case 'min': return min(a, b);
      case 'max': return max(a, b);
    }
  }

  function getColor(i) {
    return colors[i%colors.length]
  }

  function random(min, max) {
    if (max) {
      return (Math.random() * (max - min)) + min
    }
    if (min instanceof Array) {
      return min[parseInt(Math.random()*min.length)]
    }
    return Math.random() * min
  }

  function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  }

  const max = Math.max
  const min = Math.min

  const header = document.querySelector('header')
  const canvas = document.createElement('canvas')
  canvas.className = 'background'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.transform = 'scale(1.1)'
  header.prepend(canvas)

  function draw() {
    const width = canvas.width
    const height = canvas.height

    size = height / 15
    cols = width/size
    rows = height/size

    for (let y = 0; y < rows; y++) {
      points[y] = []
      for (let x = 0; x < cols; x++) {
        points[y][x] = {
          x: random(-0.1, 0.1),
          y: random(-0.1, 0.1)
        }
      }
    }
    const op1 = random(operations)
    const op2 = random(operations)
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 1
    for (let y = 0; y < rows-1; y++) {
      for (let x = 0; x < cols-1; x++) {
        ctx.fillStyle = getColor(operator(op1, x, y))
        ctx.strokeStyle = getColor(operator(op1, x, y))
        ctx.beginPath()
        ctx.moveTo(
          map(x+points[y][x].x, 0, cols-1, 0, width),
          map(y+points[y][x].y, 0, rows-1, 0, height)
        )
        ctx.lineTo(
          map(x+1+points[y][x+1].x, 0, cols-1, 0, width),
          map(y+points[y][x+1].y, 0, rows-1, 0, height)
        )
        ctx.lineTo(
          map(x+points[y+1][x].x, 0, cols-1, 0, width),
          map(y+1+points[y+1][x].y, 0, rows-1, 0, height)
        )
        ctx.closePath()
        ctx.stroke()
        ctx.fill()

        ctx.fillStyle = getColor(operator(op2, x, y))
        ctx.strokeStyle = getColor(operator(op2, x, y))

        ctx.beginPath()
        ctx.moveTo(
          map(x+1+points[y+1][x+1].x, 0, cols-1, 0, width),
          map(y+1+points[y+1][x+1].y, 0, rows-1, 0, height)
        )
        ctx.lineTo(
          map(x+1+points[y][x+1].x, 0, cols-1, 0, width),
          map(y+points[y][x+1].y, 0, rows-1, 0, height)
        )
        ctx.lineTo(
          map(x+points[y+1][x].x, 0, cols-1, 0, width),
          map(y+1+points[y+1][x].y, 0, rows-1, 0, height)
        )
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
      }

    }
  }

  draw()
  canvas.addEventListener('click', draw)
  canvas.addEventListener('tap', draw)

  window.addEventListener('resize', draw)
}
