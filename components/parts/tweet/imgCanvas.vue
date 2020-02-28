<template>
  <div :id="'canvas-container-' + image.id" class="canvas-container">
    <canvas :id="'canvas-' + image.id" />
  </div>
</template>

<script>
export default {
  name: 'ImgCanvas',
  props: {
    image: {
      type: Object,
      default () {
        return {
          bounding_box: {},
          id: '0',
          labels: [],
          url: ''
        }
      }
    }
  },
  data () {
    return {
      box: {
        Top: 0,
        Left: 0,
        Width: 0,
        Height: 0,
        Right: 0,
        Bottom: 0
      },
      width: 0,
      height: 0
    }
  },
  mounted () {
    const self = this
    const canvasContainer = document.getElementById('canvas-container-' + String(self.image.id))
    const canvas = document.getElementById('canvas-' + String(self.image.id))
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = self.image.url
    img.onload = function () {
      self.width = img.width
      self.height = img.height
      self.box = self.imageTrimming(self.image, self.width, self.height)
      const drawGain = self.gain(canvasContainer)
      self.resize(canvas, canvasContainer, self.box, drawGain)
      ctx.drawImage(img, self.box.Left, self.box.Top, self.box.Width, self.box.Height, 0, 0, self.box.Width * drawGain, self.box.Height * drawGain)
      self.$emit('sendHeight')
    }
  },
  methods: {
    gain (parent) {
      const gain = parent.clientWidth / this.box.Width
      const drawGain = (gain < 1.5) ? gain : 1.5
      return drawGain
    },
    resize (canvas, parent, box, drawGain) {
      const parentHeight = box.Height * drawGain
      // parent.setAttribute('style', `height: ${parentHeight}px;`)
      canvas.width = parent.clientWidth
      canvas.height = parentHeight
    },
    imageTrimming (img, w, h) {
      const boundingBox = this.mergeBoundingBox(img)
      const left = Math.ceil(w * boundingBox.Left)
      const top = Math.ceil(h * boundingBox.Top)
      const width = Math.ceil(w * boundingBox.Width)
      const height = Math.ceil(h * boundingBox.Height)
      const mergedBox = {
        Top: top,
        Left: left,
        Width: width,
        Height: height
      }
      return mergedBox
    },
    mergeBoundingBox (img) {
      const mergedBox = {
        Top: 0,
        Left: 0,
        Width: 0,
        Height: 0,
        Right: 0,
        Bottom: 0
      }
      mergedBox.Top = img.bounding_box[0].Top
      mergedBox.Left = img.bounding_box[0].Left
      mergedBox.Width = img.bounding_box[0].Width
      mergedBox.Height = img.bounding_box[0].Height
      for (const box of img.bounding_box) {
        const boxRight = box.Left + box.Width
        const boxBottom = box.Top + box.Height
        mergedBox.Right = mergedBox.Left + mergedBox.Width
        mergedBox.Bottom = mergedBox.Top + mergedBox.Height
        if (mergedBox.Left > box.Left) {
          mergedBox.Width = (mergedBox.Right < boxRight) ? box.Width : mergedBox.Width + mergedBox.Left - box.Left
          mergedBox.Left = box.Left
        } else {
          // mergedBox.Left = mergedBox.Left
          mergedBox.Width = (mergedBox.Right < boxRight) ? box.Width + box.Left - mergedBox.Left : mergedBox.Width
        }
        if (mergedBox.Top > box.Top) {
          mergedBox.Height = (mergedBox.Bottom < boxBottom) ? box.Height : mergedBox.Height + mergedBox.Top - box.Top
          mergedBox.Top = box.Top
        } else {
          // mergedBox.Top = mergedBox.Top
          mergedBox.Height = (mergedBox.Bottom < boxBottom) ? box.Height + box.Top - mergedBox.Top : mergedBox.Height
        }
      }
      return mergedBox
    }
  }
}
</script>

<style>
.canvas-container {
  width: 100%;
}

canvas {
  width: 100%;
}

canvas:hover {
  opacity: 0.7;
}
</style>
