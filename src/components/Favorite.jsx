import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";

export default function Favorite(props) {
  return (
    <div className="favoriteContainer">
      <Rating
        name={props.name}
        value={props.value}
        max={1}
        size="large"
      />
    </div>
  );
}
