import Adjuster from './core/adjuster';
import Filter from './core/filter';
import Resize from './core/resize';

export default class Plotit {
  constructor(props) {
    let selector = props.selector || 'body';
    this.$panel = document.querySelector(selector);
  }

  renderImage(imgSrc) {
    if (this.$panel) {
      let $panel = this.$panel,
          panelW = $panel.clientWidth,
          panelH = $panel.clientHeight;

      let $canvas = document.createElement('canvas'),
          context = $canvas.getContext('2d');

      image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = imgSrc;
      this.image = image;

      image.onload = () => {
        let imageW = image.width,
            imageH = image.height,
            scale;

        context.clearRect(0, 0, $canvas.width, $canvas.height);

        if (imageW > imageH) {
          scale = imageW / panelW;
        } else {
          scale = imageH / panelH;
        }

        imageW = imageW / scale;
        imageH = imageH / scale;

        let dx = (panelW - imageW) / 2,
            dy = (panelH - imageH) / 2;

        $canvas.id = 'plotitCanvas';
        $canvas.width = imageW;
        $canvas.height = imageH;
        $canvas.style.position = 'absolute';
        $canvas.style.top = dy + 'px';
        $canvas.style.left = dx + 'px';
        
        context.drawImage(image, 0, 0, $canvas.width, $canvas.height); 

        $panel.innerHTML = '';
        $panel.appendChild($canvas);

        this.$canvas = $canvas;
        this.context  = context;
        this.originData = this.getData();
      }
    }
  }

  getData(canvas) {
    canvas = canvas || this.$canvas;
    let context = canvas.getContext('2d') || this.context;
    if (context) {
      return context.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  setData(data) {
    let context = this.context || this.$canvas.getContext('2d');
    if (context) {
      this.clearData();
      return context.putImageData(data, 0, 0);
    }
  }

  clearData() {
    let context = this.context || this.$canvas.getContext('2d');
    if (context) {
      return context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }
  }

  resetImage() {
    if (this.originData) {
      this.setData(this.originData);  
    }
  }

  processFilter(processor, canvas) {
    
    // new layer
    Filter.newLayer(canvas);
    // bind Util
    Filter.bindUtil(this);

    if (processor && typeof processor === 'string') {
      processor = Filter[processor].bind(Filter);
    }

    // filter processing
    if (processor && typeof processor === 'function') {
      processor();
      // filter render
      Filter.renderLayer();
    }

  }

  processPixel(processor, degree) {
    if (this.getData()) {
      let imageData = imageData || this.getData(),
          deg = +degree || 0,
          pixel;

      if (processor && typeof processor === 'string') {
        processor = Adjuster[processor];
        processor = processor ? processor.bind(Adjuster) : null;
      }

      if (processor && typeof processor === 'function') {
        for (let i = 0; i < imageData.data.length; i += 4) {
          let pixel = {
            r: imageData.data[i + 0],
            g: imageData.data[i + 1],
            b: imageData.data[i + 2],
            a: imageData.data[i + 3]
          };

          pixel = processor(pixel, deg);

          imageData.data[i + 0] = pixel.r;
          imageData.data[i + 1] = pixel.g;
          imageData.data[i + 2] = pixel.b;
          imageData.data[i + 3] = pixel.a;
        }
      }

      this.setData(imageData);
    }
  }

  processCrop(opts) {
    Resize.cropImage(this.$canvas, opts);
  }

  processResize(originCanvas, scale, previewCanvas) {
    // new layer
    Resize.newFrame(originCanvas, scale);
    // bind Util
    Resize.bindUtil(this);
    // set Preview
    Resize.setPreview(previewCanvas);
    // bind mousemove
    Resize.bindFrame(scale);
  }

  getResizeFrame() {
    return Resize.getFrame();
  }

  removeResizeFrame() {
    Resize.removeFrame();
  }

  convertToBase64(size) {
    let quality = 1,
        maxSize = 10000000,
        base64Str = '';

    if (size > maxSize) {
      quality = Math.floor(maxSize / size);
    }

    let imageData = this.getData();
    
    this.setData(imageData);

    base64Str = this.$canvas.toDataURL(null, quality);

    return base64Str.substring(base64Str.indexOf(',') + 1);
  }

}
 
