import React, { Fragment, useContext } from "react";

import useStyles from "./styles";
import { UIContext, UserContext } from "../../App";
import {
    Avatar,
    Badge,
    Chip,
    IconButton,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import AvatarText from "../UI/AvatarText";
import CreatePostMenu from "./CreatePostMenu";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import NotificationMenu from "../NotificationMenu";
import ProfileMenu from "./ProfileMenu";

function RightMenu() {
    const classes = useStyles();
    const { uiState } = useContext(UIContext);
    const { userState } = useContext(UserContext);

    const theme = useTheme();
    const xsScreen = useMediaQuery(theme.breakpoints.only("xs"));

    const defaultPropsNotif = {
        color: "error",
        children: <FontAwesomeIcon icon={ faBell } size={ xsScreen ? "xs" : "sm" } />
    }

    return (
        <Fragment>
            { uiState.mdScreen && (
                <Chip
                    component={ NavLink }
                    activeStyle={{ backgroundColor: "teal", color: "#fff" }}
                    to={ `/profile/${ userState.currentUser.id }` }
                    label={ <h3>{ userState.currentUser.name.split(" ")[0].slice(0, 5) + ".." }</h3> }
                    className={ classes.profile_chip }
                    avatar={
                        userState.currentUser.profile_pic ? (
                            <Avatar alt="Natacha" src={ userState.currentUser.profile_pic } />
                        ) : (
                            <AvatarText text={ userState.currentUser.name } bg={ userState.currentUser.active ? "seagreen" : "tomato" } />
                        )
                    }
                />
            ) }

            <CreatePostMenu />

            <IconButton
                component={ NavLink }
                activeStyle={{ color: "rgb(1, 133, 243)" }}
                to="/messenger"
                style={{
                    marginLeft: xsScreen ? "4px" : "8px",
                    color: !uiState.darkMode ? "black" : null,
                    backgroundColor: !uiState.darkMode ? "#f0f2f5" : null
                }}
            >
                <FontAwesomeIcon icon={ faFacebookMessenger } size={ xsScreen ? "xs" : "sm" } />
            </IconButton>

            <NotificationMenu>
                <Badge max={ 5 } badgeContent={ uiState.notifications.length || "0" } { ...defaultPropsNotif } />
            </NotificationMenu>

            <ProfileMenu />
        </Fragment>
    );
}

export default RightMenu;