import React, { useEffect, useState } from 'react';
import logo from './blur.png';
import {
    styled,
    alpha,
    InputBase,
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Typography,
    Stack,
    CssBaseline
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
  import SearchIcon from "@mui/icons-material/Search";



const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(5),
      width: "fill"
    }
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(5)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch"
        }
      }
    }
  }));

  
  export default function TopBar() {
    
    const [text, setText] = useState('');
    return (
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static" style={{ background: 'black' }}>
          <Toolbar
            sx={{
              justifyContent: "space-between"
            }}
          >
            <Stack direction="row" alignItems="center">
                    <Box
                        component="img"
                        sx={{
                        height: 22,
                        }}
                        alt="Your logo."
                        src={logo}
                    />

            </Stack>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Search>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

    );
  }