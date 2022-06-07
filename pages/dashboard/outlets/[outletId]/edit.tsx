import {
  Paper,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';

import Layout from '../../../../components/Layout';
import React, { useEffect } from 'react';
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from 'axios';
import { useRouter } from 'next/router'


export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx)

  let user = await axios.get(process.env.API_URL + "auth/dj-rest-auth/user/", {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`
    }
  })

  console.log(process.env.API_URL + "outlet/outlets/" + ctx.params.outletId + "/");
  console.log(`Bearer ${session?.accessToken}`);
  
  let outlet = await axios.get(process.env.API_URL + "outlet/outlets/" + ctx.params.outletId + "/", {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`
    }
  })

  return {
    props: { userData: user.data, outletData: outlet.data},
  }
}


const Outlets = ({ userData, outletData }: any) => {
  const router = useRouter()

  const [outlet, setOutlet] = React.useState(outletData)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("test");
    
    const data = new FormData(event.currentTarget);
    axios.put("/api/outlets/" + router.query.outletId + "/edit", {
      address: data.get('address'),
      phone: data.get('phone'),
      name: data.get('name'),
      owner: userData.pk
    }).then(m => {
      if (m.status === 200) {
        router.push("/dashboard/outlets")
      }
    }).catch(err => console.error(err))
  };

  const handleCancel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard/outlets")
  }
  return (<> { /* Chart */
  } < Layout > <Grid item xs={12}> < Paper sx={{
    margin: 8,
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }} > <Typography component="h1" variant="h5"> Create New Outlet </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="name"
        label="name"
        type="text"
        id="name"
        value={outlet.name}
        onChange={(event) => setOutlet({...outlet, name: event.target.value})}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="address"
        label="Address"
        name="address"
        autoFocus
        value={outlet.address}
        onChange={(event) => setOutlet({...outlet, address: event.target.value})}
      /> <TextField
        margin="normal"
        required
        fullWidth
        name="phone"
        label="Phone"
        type="text"
        id="phone"
        value={outlet.phone }
        onChange={(event) => setOutlet({...outlet, phone: event.target.value})}
      />

      <TextField
        disabled
        margin="normal"
        required
        fullWidth
        name="owner"
        label="Owner"
        type="text"
        id="owner"
        value={userData.email}
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}> Save </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={(e) => handleCancel(e)}
            sx={{ mt: 3, mb: 2 }}> Cancel </Button>
        </Grid>
      </Grid>
    </Box>
  </Paper > </Grid> </Layout>
  </>)
}

export default Outlets
