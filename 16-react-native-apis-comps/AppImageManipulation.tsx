import React, { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import { manipulateAsync, FlipType, SaveFormat, ImageResult } from 'expo-image-manipulator';

export default function App() {
  const [ready, setReady] = useState<boolean>(false);
  const [image, setImage] = useState<Asset | ImageResult | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const image = Asset.fromModule(require('./assets/snack-icon.png'));
      await image.downloadAsync();
      setImage(image);
      setReady(true);
    })();
  }, []);

  const _rotate90andFlip = async () => {
    const manipResult = await manipulateAsync(
      getImageUri(image),
      [
        {
          resize: {
            width: 300,
          }
        },
        { rotate: 90 },
      ],
      { base64: true, format: SaveFormat.PNG }
    );
    setDataUrl('data:image/xxx;base64,' + manipResult.base64);
    setImage(manipResult);
  }

  const _renderImage = () => (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getImageUri(image) }}
          style={styles.image}
        />
        {dataUrl && <Image
          source={{ uri: dataUrl }}
          style={styles.image}
        />}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {ready && image && _renderImage()}
      <Button title="Rotate and Flip" onPress={_rotate90andFlip} />
    </View>
  );
}

function getImageUri(image: Asset | ImageResult | null) {
  let uri: string = '';
  if (image) {
    if ('localUri' in image) {
      uri = image.localUri ?? '';
    } else {
      uri = image.uri;
    }
  }
  return uri;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
