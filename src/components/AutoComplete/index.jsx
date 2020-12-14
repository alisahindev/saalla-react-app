import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingTop: "20px",
  },
  avatarImg: {
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    borderRadius: "24px",
    boxSizing: "border-box",
    flex: "none",
    height: "32px",
    width: "32px",
    margin: "0 8px",
  },
  community_title: {
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "18px",
    color: "black",
  },
  com_cont: {
    padding: "1rem 1rem 0 0",
    display: "flex",
  },
  member_count: {
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "16px",
    paddingBottom: "4px",
  },
}));

export default function ComboBox({
  options,
  labelField,
  onChange,
  placeholder,
  user,
  className,
  defaultValue,
  style,
  onSearch,
}) {
  const classes = useStyles();

  const renderOption = (option, classes) => {
    return (
      <div className={classes.com_cont}>
        <Col style={{ display: "flex", paddingLeft: "0px" }}>
          <img className={classes.avatarImg} src={option.logoPath} alt="" />
          <div style={{ display: "grid" }}>
            <code className={classes.community_title}>{option.name}</code>
            {option.type !== "user" && (
              <span className={classes.member_count}>
                {option.memberCount} üye
              </span>
            )}
          </div>
        </Col>
      </div>
    );
  };

  const renderUserOption = (option, classes) => {
    return (
      <div className={classes.com_cont}>
        <Col style={{ display: "flex", paddingLeft: "0px" }}>
          <img className={classes.avatarImg} src={option.profileImg} alt="" />
          <div style={{ display: "grid" }}>
            <code className={classes.community_title}>{option.username}</code>
          </div>
        </Col>
      </div>
    );
  };

  return (
    <Autocomplete
      className={className}
      defaultValue={defaultValue}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      options={options}
      renderOption={(option) =>
        user ? renderUserOption(option, classes) : renderOption(option, classes)
      }
      getOptionLabel={(option) => option[labelField]}
      noOptionsText="Sonuç yok"
      style={style}
      renderInput={(params) => (
        <TextField
          onChange={onSearch}
          {...params}
          label={placeholder}
          variant="outlined"
        />
      )}
    />
  );
}
