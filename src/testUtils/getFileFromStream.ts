import stream from 'stream';

import Vinyl from 'vinyl';

export default function getFileFromStream(
  stream: stream.Readable,
  filename?: string,
) {
  return new Promise<Vinyl>((resolve, reject) => {
    stream.on('data', (file: Vinyl) => {
      if (file.contents && (!filename || file.relative === filename)) {
        resolve(file);
      }
    });
    stream.on('finish', () => reject(new Error('No file in stream matched')));
    stream.on('error', reject);
  });
}
