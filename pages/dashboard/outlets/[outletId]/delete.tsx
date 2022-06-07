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

  let outlet = await axios.get(process.env.API_URL + "outlet/outlets/" + ctx.params.outletId + "/", {
    headers: {
      'Authorization': `Bearer ${session?.accessToken}`
    }
  })

  return {
    props: { outletData: outlet.data},
  }
}


const Outlets = ({ userData, outletData }: any) => {
  const router = useRouter()

  const [outlet, setOutlet] = React.useState(outletData)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.delete("/api/outlets/" + router.query.outletId + "/delete").then(m => {
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
    margin: 10,
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }} > 
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    <Typography component="h1" variant="h5"> Delete outlet {outlet.name}? </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}> Continue </Button>
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
