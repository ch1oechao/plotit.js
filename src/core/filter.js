import Layer from './layer';

class PlotitFilter {
  constructor() {
    this.options = ['r', 'g', 'b'];
  }

  checkOpts(pixel) {
    var keys = Object.keys(pixel);
    return this.options.every((item) => {
      return keys.indexOf(item) !== -1;
    });
  }

  bindUtil(util) {
    this.util = util;
  }
  
  newLayer(canvas) {
    this.canvas = canvas;
    this.layer = new Layer(canvas, 'newFilter').layer;
  }

  renderLayer() {
    this.canvas.getContext('2d').drawImage(this.layer, 0, 0);
    console.log('render Filter ... is OK!');
  }

  moon() {
    this.util.processPixel('greyscale');
  }

  toaster() {

    this.util.processPixel('brightness', 40);
    this.util.processPixel('contrast', 25);
    
    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 10,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;
    
    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'rgba(255, 226, 114, .3)');
    grd.addColorStop(1, 'rgba(172, 70, 186, .3)');
    
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  _1977() {

    this.util.processPixel('brightness', 20);
    this.util.processPixel('saturation', -10);
    this.util.processPixel('contrast', 20);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, 0, 0, 0);
    grd.addColorStop(0, 'rgba(172, 70, 186, .2)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  aden() {
    this.util.processPixel('brightness', 10);
    this.util.processPixel('saturation', 15);
    this.util.processPixel('contrast', 10);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 5,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'rgba(96, 10, 14, .12)');
    grd.addColorStop(1, 'transparent');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  earlybird() {
    this.util.processPixel('saturation', -20);
    this.util.processPixel('sepia', 10);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 5,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'rgba(208, 186, 142, .15)');
    grd.addColorStop(1, 'rgba(54, 3, 9, .2)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  walden() {
    this.util.processPixel('brightness', 25);
    this.util.processPixel('saturation', -5);
    this.util.processPixel('sepia', 6);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, 0, 0, 0);
    grd.addColorStop(0, 'rgba(20, 68, 204, .1)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  xpro2() {
    this.util.processPixel('contrast', 10);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 6,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'rgba(230, 231, 224, .2)');
    grd.addColorStop(1, 'rgba(13, 27, 86, .4)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  lofi() {
    this.util.processPixel('saturation', 5);
    this.util.processPixel('contrast', 20);

    var ctx = this.layer.getContext('2d'),
        width = this.layer.width,
        height = this.layer.height,
        x0 = width / 2,
        y0 = height / 2,
        r0 = (width > height ? width : height) / 3,
        x1 = width / 2,
        y1 = height / 2,
        r1 = (width > height ? width : height) / 2;

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, 'transparent');
    grd.addColorStop(1, 'rgba(34, 34, 34, .2)');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

} 

export default new PlotitFilter();
 