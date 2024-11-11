import { Image } from 'react-native';
import React, { ComponentProps, useEffect, useState } from 'react';
import { supabase } from '../client/client';

type RemoteImageProps = {
  path?: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState('');
  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from('product-images')
        .download(path);

      if (error) {
        console.error(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  if (!image) {
  }

  return <Image source={image ? { uri: image } : require('../../assets/images/products/default.jpg')} {...imageProps} />;
};

export default RemoteImage;