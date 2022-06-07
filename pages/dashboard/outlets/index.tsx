import { Grid, Paper, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import React, { useEffect } from 'react';
import axios from 'axios';
import { getSession } from "next-auth/react";
import OutletCard from '../../../components/OutletCard';


export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx)
  
  let get_outlets = await axios.get(process.env.API_URL + "outlet/outlets/", {
    headers: {
      'Authorization': `Bearer ${session.accessToken}` 
    }
  })
  
  return {
    props: { data: get_outlets.data }, 
  }
}


const Outlets = ({ data }: any) => {
  const [outlets, setOutlets] = React.useState([])


  const getOutlet = async () => {
    try {
      setOutlets(data)
    } catch (error) {
      console.log(error);
      
    }
    
  }

  useEffect(() => {
    getOutlet()
  }, [])
  return (<>
     {/* Chart */}
     <Layout>

     <Grid item xs={12}>
      <Link href="/dashboard/outlets/create">
        <Button size="small">Create</Button>
      </Link>
    </Grid>

    {outlets.map((props: any) => {
      return <Grid item xs={12} lg={3} key={props.id}>
      <OutletCard {...props}></OutletCard>
    </Grid>
    })}
     </Layout>
  </>)
}

export default Outlets