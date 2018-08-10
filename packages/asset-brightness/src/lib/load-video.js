const MAX_RETRIES = 3;

export default function loadVideo(url, contentType = 'video/mp4', retry = 1) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.autoplay = false;
    video.loop = false;
    video.crossOrigin = 'Anonymous';
    video.onloadeddata = () => {
      resolve(video);
    };

    video.onerror = () => {
      if (retry < MAX_RETRIES) {
        resolve(loadVideo(url, contentType, retry + 1));
      }
      reject(
        new Error('The video failed to load. Reload the page to try again.')
      );
    };

    const source = document.createElement('source');
    source.type = contentType;
    source.src = url;
    video.appendChild(source);
  });
}
