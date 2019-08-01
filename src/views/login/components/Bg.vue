<template>
  <div class="beijing">
    <canvas class="canva" />
  </div>
</template>

<script>
// npo

var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.lineWidth = 0.3
ctx.strokeStyle = new Color(150).style

var mousePosition = {
  x: (30 * canvas.width) / 100,
  y: (30 * canvas.height) / 100
}

var dots = {
  nb: 750,
  distance: 50,
  d_radius: 100,
  array: []
}

export default {
  data() {
    return {}
  },
  created() {
    Dot.prototype = {
      draw: function() {
        ctx.beginPath()
        ctx.fillStyle = this.color.style
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
      }
    }
    this.createDots()
    this.requestAnimationFrame(animateDots)
  },

  methods: {
    colorValue(min) {
      return Math.floor(Math.random() * 255 + min)
    },

    createColorStyle(r, g, b) {
      return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)'
    },

    mixComponents(comp1, weight1, comp2, weight2) {
      return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
    },

    averageColorStyles(dot1, dot2) {
      var color1 = dot1.color
      var color2 = dot2.color

      var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius)
      var g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius)
      var b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
      return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b))
    },

    Color(min) {
      min = min || 0
      this.r = colorValue(min)
      this.g = colorValue(min)
      this.b = colorValue(min)
      this.style = createColorStyle(this.r, this.g, this.b)
    },

    Dot() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height

      this.vx = -0.5 + Math.random()
      this.vy = -0.5 + Math.random()

      this.radius = Math.random() * 2

      this.color = new Color()
      console.log(this)
    },
    createDots() {
      for (i = 0; i < dots.nb; i++) {
        dots.array.push(new Dot())
      }
    },

    moveDots() {
      for (i = 0; i < dots.nb; i++) {
        var dot = dots.array[i]

        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx
          dot.vy = -dot.vy
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx
          dot.vy = dot.vy
        }
        dot.x += dot.vx
        dot.y += dot.vy
      }
    },

    connectDots() {
      for (i = 0; i < dots.nb; i++) {
        for (j = 0; j < dots.nb; j++) {
          i_dot = dots.array[i]
          j_dot = dots.array[j]

          if (
            i_dot.x - j_dot.x < dots.distance &&
            i_dot.y - j_dot.y < dots.distance &&
            i_dot.x - j_dot.x > -dots.distance &&
            i_dot.y - j_dot.y > -dots.distance
          ) {
            if (
              i_dot.x - mousePosition.x < dots.d_radius &&
              i_dot.y - mousePosition.y < dots.d_radius &&
              i_dot.x - mousePosition.x > -dots.d_radius &&
              i_dot.y - mousePosition.y > -dots.d_radius
            ) {
              ctx.beginPath()
              ctx.strokeStyle = averageColorStyles(i_dot, j_dot)
              ctx.moveTo(i_dot.x, i_dot.y)
              ctx.lineTo(j_dot.x, j_dot.y)
              ctx.stroke()
              ctx.closePath()
            }
          }
        }
      }
    },

    drawDots() {
      for (i = 0; i < dots.nb; i++) {
        var dot = dots.array[i]
        dot.draw()
      }
    },
    animateDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      moveDots()
      connectDots()
      drawDots()

      requestAnimationFrame(animateDots)
    }
  }
}
</script>

<style lang="scss" scoped>
.beijing {
  background: #000;
  margin: 0;
  padding: 0;
}

.canva {
  width: 100%;
  height: 90%;
  position: absolute;
}
/* Demo Buttons Style */

.codrops-demos {
  font-size: 0.8em;
  text-align: center;
  position: absolute;
  z-index: 99;
  width: 96%;
}

.codrops-demos a {
  display: inline-block;
  margin: 0.35em 0.1em;
  padding: 0.5em 1.2em;
  outline: none;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  border-radius: 2px;
  font-size: 110%;
  border: 2px solid transparent;
  color: #fff;
}

.codrops-demos a:hover,
.codrops-demos a.current-demo {
  border-color: #383a3c;
}
</style>
