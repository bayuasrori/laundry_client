import { Grid, Paper } from '@mui/material';
import Layout from '../../../../components/Layout';

const Dashboard = () => {
  
  return (<>
     {/* Chart */}
     <Layout>

     <Grid item xs={12}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
        >
          <h1>Detail</h1>
        </Paper>
      </Grid>
     </Layout>
  </>)
}

export default Dashboard