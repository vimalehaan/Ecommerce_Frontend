import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";


export const OutlinedIconButton = ({ icon, color, ...props }) => (
  <IconButton
    variant="outlined"
    sx={{
      border: "1px solid",
      borderColor: color,
      color: color,
      ...props.sx,
    }}
  >
    {icon}
  </IconButton>
);

export const FilledIconButton = ({ icon, backgroundColor, color, ...props }) => (
    <IconButton
      variant="contained"
      sx={{
        // border: "1px solid",
        backgroundColor: backgroundColor,
        color: color,
        // color: color,
        ...props.sx,
      }}
    >
      {icon}
    </IconButton>
  );

export const BlackBigButton = ({text, ...props}) => {
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
    >
      {text}
    </Button>
  );
};
