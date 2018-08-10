export default (asset, areaOfInterest = {}) =>
  new Promise((resolve, reject) => {
    try {
      const defaultAreaOfInterest = { top: 0, right: 0, width: 1, height: 1 };
      const { top, right, width, height } = {
        ...defaultAreaOfInterest,
        ...areaOfInterest
      };

      const canvas = document.createElement('canvas');
      canvas.width = asset.naturalWidth || asset.videoWidth;
      canvas.height = asset.naturalHeight || asset.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(asset, 0, 0);

      // Get pixels
      const { data } = ctx.getImageData(
        canvas.height * top,
        canvas.width * right,
        canvas.width * width,
        canvas.height * height
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
