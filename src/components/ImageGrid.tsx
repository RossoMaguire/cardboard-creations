import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import NextImage from "next/image";

type image = {
  img: string;
  title: string;
};

interface IImageGridProps {
  images: image[];
}

function ImageGrid({ images }: IImageGridProps) {
  return (
    <ImageList sx={{ width: 500, height: 450 }} variant="quilted" cols={3}>
      {images.map((image) => (
        <ImageListItem key={image.img}>
          <NextImage
            src={`${image.img}?w=164&h=164&fit=crop&auto=format`}
            alt={image.title}
            loading="lazy"
            layout="fill"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ImageGrid;
