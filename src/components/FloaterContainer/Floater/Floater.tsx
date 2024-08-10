import { IoIosMusicalNote, IoIosMusicalNotes } from "react-icons/io";

import classes from "./Floater.module.css";

interface Floater_Props {
  x: number
  size: number;
  duration: number;
  initialDelay: number;
}

export default function Floater(props: Floater_Props) {
  const renderNote = (): JSX.Element => {
    const style = {
      width: `${props.size}em`,
      height: `${props.size}em`,
      // TODO: Randomize colors.
      color: "#3E3E3E",
    };
    if (Math.random() < 0.85) {
      return (
        <IoIosMusicalNote style={style} />
      );
    } else {
      return (
        <IoIosMusicalNotes style={style} />
      );
    }
  };

  return (
    <div
      className={`${classes["note"]} pointer-events-none fixed bottom-0 -z-10`}
      style={{
        left: `${props.x}vw`,
        animationDuration: `${props.duration}s`,
        animationDelay: `${props.initialDelay}s`,
      }}
    >
      {renderNote()}
    </div>
  );
}
