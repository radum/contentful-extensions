import quantize from 'quantize';
import rgbToHex from './rgb-to-hex';

export default (canvasData, paletteCount = 6, quality = 25) => {
  // Store the RGB values in an array format suitable for quantize function
  const pixels = [];
  for (
    let x = 0, r, g, b, a, len = canvasData.length;
    x < len;
    x += 4 * quality
  ) {
    r = canvasData[x + 0];
    g = canvasData[x + 1];
    b = canvasData[x + 2];
    a = canvasData[x + 3];

    // If pixel is mostly opaque and not white
    if (a >= 125) {
      if (!(r > 250 && g > 250 && b > 250)) {
        pixels.push([r, g, b]);
      }
    }
  }

  const pixelMap = quantize(pixels, paletteCount);
  return pixelMap.palette().map(([r, g, b]) => rgbToHex(r, g, b));
};
