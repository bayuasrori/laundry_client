import { Grid, Paper } from '@mui/material';
import Layout from '../../components/Layout';

const Reports = () => {
  return (<>
     {/* Chart */}
     <Layout>

     <Grid item xs={12}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
        >
          <h1>Reports</h1>
        </Paper>
      </Grid>
     </Layout>
  </>)
}

export default Reports