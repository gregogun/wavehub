import { arweave, webWallet } from '@/lib/api';
import { addFunds, mineBlock } from '@/lib/utils';

interface UploadProps {
  trackName: string;
  artistName: string;
  trackDescription: string;
  coverImageData: ArrayBuffer;
  coverImageFile: File;
  audioData: ArrayBuffer;
  audioFile: File;
}

export const upload = async (
  artistName: string,
  trackName: string,
  trackDescription: string,
  audioData: ArrayBuffer,
  audioFile: File,
  audioFileDuration: number,
  coverImageData: ArrayBuffer,
  coverImageFile: File
) => {
  try {
    await addFunds(arweave, webWallet.address);
    await mineBlock(arweave);
    //upload image first
    let coverImageTx = await arweave.createTransaction({ data: coverImageData });
    coverImageTx.addTag('Content-Type', coverImageFile.type);

    let imageResult = await webWallet.dispatch(coverImageTx);
    console.log('image uploaded successfully', imageResult);

    //upload audio data
    let audioTx = await arweave.createTransaction({ data: audioData });
    audioTx.addTag('App-Name', 'wavehub');
    audioTx.addTag('Content-Type', audioFile.type);
    audioTx.addTag('Version', '0.0.1');
    audioTx.addTag('Title', trackName);
    audioTx.addTag('Artist', artistName);
    audioTx.addTag('Cover-Artwork', imageResult.id);

    let audioResult = await webWallet.dispatch(audioTx);
    console.log('audio uploaded successfully', audioResult);
    console.log('duration', audioFileDuration);

    let trackMetadataTx = await arweave.createTransaction({
      data: Buffer.from(
        JSON.stringify({
          trackName,
          artistName,
          trackDescription,
          coverImage: imageResult.id,
          trackAudio: audioResult.id,
        })
      ),
    });
    trackMetadataTx.addTag('App-Name', 'wavehub');
    trackMetadataTx.addTag('Content-Type', 'application/json');
    trackMetadataTx.addTag('Version', '0.0.1');
    trackMetadataTx.addTag('Type', 'song');
    trackMetadataTx.addTag('Title', trackName);
    trackMetadataTx.addTag('Artist', artistName);
    trackMetadataTx.addTag('Description', artistName ? trackDescription : 'No description.');
    trackMetadataTx.addTag('Cover-Artwork', imageResult.id);
    trackMetadataTx.addTag('Audio-Source', audioResult.id);
    trackMetadataTx.addTag('Upload-Date', Date.now().toString());
    trackMetadataTx.addTag('Duration', audioFileDuration.toString());

    let trackMetadataResult = await webWallet.dispatch(trackMetadataTx);
    console.log('metadata uploaded successfully', trackMetadataResult);
  } catch (error) {
    alert('There was an error trying to upload. Please try again.');
  }
};
