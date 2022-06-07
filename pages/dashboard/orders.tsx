import { Grid, Paper, TextField } from '@mui/material';
import Layout from '../../components/Layout';
import Chart from '../../components/Chart';

const Orders = () => {
  return (<>
     {/* Chart */}
     <Layout>

     <Grid item xs={12}>
        <Paper
          sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Paper>
      </Grid>
     </Layout>
  </>)
}

export default Orders