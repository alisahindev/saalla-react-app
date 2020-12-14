import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function PostMenu(props) {
  const { menuItems } = props;
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
      >
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, index) => (
            <MenuItem key={index} onClick={item && item.onClick}>
              {item && item.title}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
