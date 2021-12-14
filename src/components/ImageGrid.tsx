import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import NextImage from "next/image";
import React from "react";

interface IImageGridProps {
  images: Image[];
}

function ImageGrid({ images }: IImageGridProps) {
  return (
    <ImageList sx={{ width: 500, height: 450 }} variant="quilted" cols={3}>
      {images.map((image) => (
        <ImageListItem key={image.img} data-testid="image-grid-item">
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
