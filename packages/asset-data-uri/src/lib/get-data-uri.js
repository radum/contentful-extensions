export default asset =>
  new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = asset.naturalWidth;
      canvas.height = asset.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(asset, 0, 0);
      const dataUri = ctx.toDataURL('image/jpeg');
      resolve(dataUri);
    } catch (e) {
      reject(e);
    }
  });
