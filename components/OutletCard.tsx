import { Card, CardContent, Typography, CardActions, Button, Avatar, CardHeader, IconButton, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import { useRouter } from 'next/router'
import Link from "next/link";


type Outlet = {
  phone: string,
  address: string,
  name: string,
  id?: number 
}
const MenuOption = ({anchorEl, handleClose, id}: any) => {
  const router = useRouter();

  return <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => router.push("/dashboard/outlets/" + id + "/edit")}>Edit</MenuItem>
      <MenuItem onClick={() => router.push("/dashboard/outlets/" + id + "/delete")}>Delete</MenuItem>
    </Menu>
}
const OutletCard = ({ phone, address, name, id }: Outlet) => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null)
  const handleClose = () => {setAnchorEl(null)}

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={(e) => {setAnchorEl(e.currentTarget)}}>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={phone}
      />
      <MenuOption anchorEl={anchorEl} handleClose={handleClose} id={id}></MenuOption>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        </Typography>
        <Typography variant="body2">
          {address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Statistik</Button>
        <Link href={"/dashboard/outlets/" + id + "/detail"}><Button size="small">Detail</Button></Link>
      </CardActions>
    </Card>
  )
}

export default OutletCard