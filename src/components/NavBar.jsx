import { Person, MenuButton } from "react-bootstrap-icons";
import { Printer, Receipt } from "react-bootstrap-icons";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export function NavigationBar() {
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePrint = () => {
    window.print();
    handleClose();
  };

  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Button
            id={buttonId}
            aria-controls={open ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={open}
            onClick={handleClick}
          >
            <MenuButton color="white" size={30} />
          </Button>
          <Menu
            id={menuId}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": buttonId,
              },
            }}
          >
            <MenuItem onClick={handleClose} sx={{color: "white", gap: "10px"}}>
            <Person color="white" size={20} />
            My account
            </MenuItem>
            <MenuItem onClick={handlePrint} sx={{color: "white", gap: "10px"}}>
            <Printer color="white" size={20} />
            Print
            </MenuItem>
            <MenuItem sx={{color: "white", gap: "10px"}}>
            <Receipt color="white" size={20} />
            Get Report
            </MenuItem>
          </Menu>
        </li>
      </ul>
    </nav>
  );
}
