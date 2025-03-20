// Card.tsx
'use client'
import React from "react";
import InteractiveCard from "./InteractiveCard";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Image from "next/image";

interface CardProps {
  venueName: string;
  imgSrc: string;
  rating?: number | null;  // Made optional with ?
  onRatingChange?: (newRating: number | null) => void;  // Made optional with ?
}

export default function Card({ venueName, imgSrc, rating, onRatingChange }: CardProps) {
  return (
    <InteractiveCard venueName={venueName}>
      <div className="w-full h-48 relative rounded-t-lg">
        <Image 
          alt={venueName} 
          src={imgSrc} 
          className="object-cover rounded-t-lg" 
          fill={true}
        />
      </div>
      <div className="w-full p-3 rounded-b-lg text-black font-serif text-xl">
        {venueName}
      </div>
      {(rating !== undefined || onRatingChange !== undefined) && (
        <Box sx={{ '& > legend': { mt: 0 } }} className="ml-2 mb-2">
          <div onClick={(e) => e.stopPropagation()}>
            <Rating
              name={`${venueName} Rating`}
              id={`${venueName} Rating`}
              data-testid={`${venueName} Rating`}
              value={rating || null}
              onChange={(event, newValue) => {
                event.preventDefault();
                onRatingChange && onRatingChange(newValue);
              }}
              className="text-2xl"
            />
          </div>
        </Box>
      )}
    </InteractiveCard>
  );
}