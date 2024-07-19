import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const status = [
  {
    value: 'To Do',
    label: 'To Do'
  },
  {
    value: 'In Progress',
    label: 'In Progress'
  },
  {
    value: 'Completed',
    label: 'Completed'
  }
];

export const EditTasks = (props) => {

  const { task, onUpdateTaskData  } = props;
  const [isBtn, setIsBtn] = useState(false);

  const [values, setValues] = useState({
    id: '',
    title: '',
    desc: '',
    status: '',
  });

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    if(values.title != '' && values.desc != '' && values.status != ''){
        setIsBtn(true);
    } else {
        setIsBtn(false);
    }
  }, [values])

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTaskData(values);
  }

  useEffect(() => {
    if(task){
      setValues({
        id: task._id,
        title: task.title,
        desc: task.desc,
        status: task.status
      })
    }
  }, [task])


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card sx={{ maxWidth: '600px', p: 2 }}>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
          sx={{ mx: 0, mt: -1.5, color: 'rgb(99,102,241)', '& .MuiCardHeader-subheader' : { fontWeight: 'bold'} }}
        />
        <CardContent sx={{ pt: 0 }}>

            {task && 
            <Box sx={{ m: -1 }}>
                <Grid
                container
                spacing={2}
                >
                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    onChange={handleChange}
                    required
                    value={values.title}
                    />
                </Grid>

                <Grid
                    xs={12}
                    md={6}
                >
                    <TextField
                    fullWidth
                    label="Status"
                    name="status"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.status}
                    >
                    {status.map((option) => (
                        <option
                        key={option.value}
                        value={option.value}
                        >
                        {option.label}
                        </option>
                    ))}
                    </TextField>
                </Grid>

                <Grid
                    xs={12}
                    md={12}
                >
                    <TextField
                    fullWidth
                    label="Description"
                    name="desc"
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    maxRows={Infinity}
                    value={values.desc}
                    />
                </Grid>
                </Grid>
            </Box>
            }

        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" sx={{mt: -1}} type='submit' disabled={!isBtn}>
            Update Task
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
