import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";

export default function Favorite(props) {
  /* const [value, setValue] = useState(0); */

  return (
    <div className="favoriteContainer">
      <Rating
        name={props.id + "favorite"}
        value={props.value}
        max={1}
        size="large"
        onChange={(event, newValue) => {
          props.set(newValue);
        }}
      />
    </div>
  );
}
