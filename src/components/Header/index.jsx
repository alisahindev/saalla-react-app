import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import Badge from "@material-ui/core/Badge";
import { Button, ListItem, Avatar } from "@material-ui/core";
import { readLocalStorage } from "../../helpers";
import { logOut } from "../../redux/auth/actions";
import ComboBox from "../AutoComplete";
import {
  getUserCommunitiesRequest,
  ofModeratorsRequest,
} from "../../redux/community/actions";
import MainDrawer from "../Drawer";
import { getCountRequest } from "../../redux/notifications/actions";
import MailIcon from "@material-ui/icons/Mail";
import { connect } from "react-redux";
import { renderImage } from "../ProfileCard";
import { getUnreadsRequest } from "../../redux/messages/actions";
import { searchRequest } from "../../redux/home/actions";
import logo from "../logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    width: "7rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#a3989826",
    "&:hover": {
      backgroundColor: "#59535326",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function PrimarySearchAppBar(props) {
  const { unReads, unReadMessages } = props;

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(false);
  const [userQuery, setUserQuery] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const user = readLocalStorage("user");
    if (user) {
      setUser(user);
    }
    const {
      getUserCommunities,
      getUnReads,
      ofModerators,
      auth,
      getUnReadMessages,
    } = props;
    getUserCommunities({});
    getUnReads();
    getUnReadMessages();
    auth.data.user && auth.data.user.isModerator && ofModerators();
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSelectChange = (community) => {
    community && history.push(`/t/${community.slug}`);
  };

  const handleSearchChange = (values) => {
    if (values) {
      values.type === "community"
        ? history.push(`/t/${values.name}`)
        : history.push(`/${values.name}`);
    } else {
      return;
    }
  };

  const delayedQuery = useRef(_.debounce((q) => props.search({ text: q }), 500))
    .current;
  const onSearch = (e) => {
    setUserQuery(e.target.value);
    delayedQuery(e.target.value);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push(`/p/${user.username}`)}>
        Profil
      </MenuItem>
      <MenuItem onClick={props.logOut}>Çıkış</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {props.auth.data.token ? (
        <span>
          {" "}
          <MenuItem onClick={() => history.push("/chat")}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={unReadMessages} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Mesajlar</p>
          </MenuItem>
          <MenuItem onClick={() => history.push(`/bildirimler`)}>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={unReads && unReads.count} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Bildirimler</p>
          </MenuItem>
          <MenuItem onClick={() => history.push(`/p/${user.username}`)}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar
                className="header_avatar"
                src={renderImage(user.profileImagePath, user.gender)}
              />
            </IconButton>
            <p>Profil</p>
          </MenuItem>{" "}
          <MenuItem onClick={props.logOut}>
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <p>Çıkış</p>
          </MenuItem>
        </span>
      ) : (
        <span>
          <MenuItem onClick={() => history.push("/giris-yap")}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Giriş Yap</p>
          </MenuItem>
          <MenuItem onClick={() => history.push("/kaydol")}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Kaydol</p>
          </MenuItem>
        </span>
      )}
    </Menu>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img className={classes.title} src={logo} />
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <ComboBox
              style={{ width: "100%" }}
              onSearch={onSearch}
              onChange={handleSearchChange}
              placeholder="ara"
              options={props.searchData || []}
              labelField="name"
            />
          </div>
          {props.auth.data.token && (
            <ComboBox
              style={{ width: "50%" }}
              onChange={handleSelectChange}
              placeholder="Toplulukların"
              options={props.userCommunities || []}
              labelField="name"
            />
          )}
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            {props.auth.data.token ? (
              <React.Fragment>
                <IconButton
                  onClick={() => history.push("/chat")}
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={unReadMessages} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  onClick={() => history.push("/bildirimler")}
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge
                    badgeContent={unReads && unReads.count}
                    color="secondary"
                  >
                    <NotificationImportantIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    className="header_avatar"
                    src={user.profileImagePath}
                  />
                </IconButton>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button
                  style={{ marginRight: "0.5rem" }}
                  onClick={() => history.push("/kaydol")}
                  variant="contained"
                  color="secondary"
                >
                  Kaydol
                </Button>
                <Button
                  onClick={() => history.push("/giris-yap")}
                  variant="contained"
                  color="primary"
                >
                  Giriş yap
                </Button>
              </React.Fragment>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Badge
                badgeContent={unReads && unReadMessages + unReads.count}
                color="secondary"
              >
                <MoreIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <MainDrawer
        userCommunities={props.userCommunities}
        ofModerators={props.ownCommunities}
        open={open}
        onClose={handleDrawerClose}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
  getUserCommunities: () => dispatch(getUserCommunitiesRequest()),
  ofModerators: () => dispatch(ofModeratorsRequest()),
  getUnReads: () => dispatch(getCountRequest()),
  getUnReadMessages: () => dispatch(getUnreadsRequest()),
  search: (payload) => dispatch(searchRequest(payload)),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  userCommunities: state.userCommunities.data,
  ownCommunities: state.ofModerators.data,
  unReads: state.unReads.data,
  unReadMessages: state.unReadMessages.unreads,
  searchData: state.home.search,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimarySearchAppBar);
