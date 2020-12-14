import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function CategoriesBar() {
  const history = useHistory();
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Gündem" },
    { key: 1, label: "Sağlık" },
    { key: 2, label: "Ekonomi" },
    { key: 3, label: "Spor" },
    { key: 4, label: "Siyaset" },
    { key: 5, label: "Yazılım" },
    { key: 6, label: "Bilim" },
  ]);

  const handleClick = (e) => {
    e.persist();
    console.log(e.target.innerText);
    history.push(`/posts/${e.target.innerText}`);
  };

  return (
    <Paper className={classes.root}>
      {chipData.map((data) => {
        return (
          <Chip
            style={{ fontSize: "16px" }}
            key={data.key}
            icon={<LoyaltyIcon />}
            label={data.label}
            onClick={handleClick}
            clickable
            color="primary"
            variant="outlined"
          />
        );
      })}
    </Paper>
  );
}
