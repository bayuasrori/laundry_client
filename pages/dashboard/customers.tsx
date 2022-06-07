import { Grid, Paper } from '@mui/material';
import Layout from '../../components/Layout';
import Chart from '../../components/Chart';

const Customers = () => {
  return (<>
     {/* Chart */}
     <Layout>

     <Grid item xs={12}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
        >
          <h1>Customers</h1>
        </Paper>
      </Grid>
     </Layout>
  </>)
}

export default Customers