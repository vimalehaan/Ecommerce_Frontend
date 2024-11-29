import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export const OutlinedIconButton = ({ icon, color, height, ...props }) => (
  <IconButton
    variant="outlined"
    sx={{
      border: "1.5px solid",
      borderColor: color,
      color: color,
      height: height,
      width: height,
      ...props.sx,
    }}
    onClick={props.onClick}
  >
    {icon}
  </IconButton>
);

export const FilledIconButton = ({
  icon,
  backgroundColor,
  color,
  height,
  ...props
}) => (
  <IconButton
    variant="contained"
    sx={{
      // border: "1px solid",
      backgroundColor: backgroundColor,
      color: color,
      height: height,
      width: height,
      // color: color,
      ...props.sx,
    }}
    onClick={props.onClick}
  >
    {icon}
  </IconButton>
);

export const BlackBigButton = ({ text, ...props }) => {
  return (
    <Button
      disableElevation
      variant="contained"
      sx={{
        fontWeight: 600,
        borderRadius: "200px",
        height: "50px",
        transition: "transform 0.4s",
        ":hover": {
          transform: "scale(1.05)",
        },
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {text}
    </Button>
  );
};

export const BlackButton = ({ text, ...props }) => {
  return (
    <Button
      disableElevation
      variant="contained"
      sx={{
        fontWeight: 600,
        borderRadius: "200px",
        ...props.sx,
      }}
    >
      {text}
    </Button>
  );
};

export const OutlinedBlackButton = ({ text, ...props }) => {
  return (
    <Button
      disableElevation
      variant="outlined"
      sx={{
        fontWeight: 500,
        borderRadius: "200px",
        border: "1.2px solid",
        textTransform: "capitalize",
        ...props.sx,
        fontFamily: "Noto Sans",
      }}
      onClick={props.onClick}
    >
      {text}
    </Button>
  );
};
