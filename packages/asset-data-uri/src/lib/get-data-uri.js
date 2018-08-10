export default asset =>
  new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = asset.naturalWidth;
      canvas.height = asset.naturalHeight;
      canvas.getContext('2d').drawImage(asset, 0, 0);
      const dataUri = canvas.toDataURL('image/jpeg');
      resolve(dataUri);
    } catch (e) {
      reject(e);
    }
  });
