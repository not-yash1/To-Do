import { useCallback, useEffect, useMemo, useState } from 'react';
// import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Dialog , Grid, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { useSelection } from '../../sections/use-selection';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from '../../sections/apply-pagination';
import { useTheme } from '@mui/material/styles';
import { TasksSearch } from '../../sections/tasks/tasks-search';
import { TasksTable } from '../../sections/tasks/tasks-table';
import { AddTasks } from '../../sections/tasks/tasks-add';
import { useDispatch, useSelector } from 'react-redux';
// import { addTask, addInstalment, getAllTasks, getAllInvestors } from 'src/redux/Actions/AdminActions';
import { toast } from 'react-toastify';
import { addTask, getAllTasks, updateTask } from '../../redux/Actions/AdminActions';
import { EditTasks } from '../../sections/tasks/tasks-edit';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const getTaskIds = (tasks) => {
  return tasks.map((task) => task._id);
};

const Home = () => {

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const [ isClient, setIsClient ] = useState(false);

  const dialogSize = 'lg';

  const dispatch = useDispatch();
  const { tasks, loading } = useSelector(state => state.getTasks)
  // const { tasks } = useSelector(state => state.getTasks)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tasksAv, setTasksAv] = useState();
  const [tasksIds, setTasksIds] = useState();
  const tasksSelection = useSelection(tasksIds);

  const [editTask, setEditTask] = useState({});

  const [ tasksList, setTasksList ] = useState([]);
  const [count, setCount] = useState(0);
  const [combine, setCombine] = useState();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [progress, setProgress] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const { message, error } = useSelector(state => state.addTask)
  const { message: updateMessage, error: updateError } = useSelector(state => state.updateTask)
  const { message: deleteMessage, error: deleteError } = useSelector(state => state.deleteTask)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleData = (values) => {
    dispatch(addTask(values.title, values.desc, values.status))
    setOpen(false);
    dispatch(getAllTasks())
  }

  const updateData = (values) => {
    dispatch(updateTask(values.title, values.desc, values.status, values.id))
    setEditOpen(false);
    dispatch(getAllTasks())
  }

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleEdit = (task) => {
    console.log(task)
    setEditTask(task);
    setEditOpen(true);
  }

  const handleSearch = (val) => {
    const searches = tasks.filter(item => item.title.toLowerCase().includes(val.toLowerCase()));
    const streetSearch = tasks.filter(item => item.desc.toLowerCase().includes(val.toLowerCase()));

    const combined = [...new Set([...streetSearch, ...searches])]
    setCombine(combined);
    setCount(combined.length)
    setTasksList(combined);
    setTasksIds(getTaskIds(combined));
    setTasksAv(applyPagination(combined, page, rowsPerPage))
  }

  const handleSelect = (val) => {
    let selects, combined;
    if(val === 'All'){
      combined = combine

    } else if(val === 'Completed'){
      combined = combine.filter(item => item.status === "Completed")

    } else if(val === 'In Progress'){
      combined = combine.filter(item => item.status === "In Progress")
      // combined = selects.filter(item => item.inProgress === true)

    } else {
      combined = combine.filter(item => item.status === "To Do")
    }

    setCount(combined.length)
    setTasksList(combined);
    setTasksIds(getTaskIds(combined));
    setTasksAv(applyPagination(combined, page, rowsPerPage))
    
  }

  useEffect(()=> {
    if(tasks){
      setTasksList(tasks);
      setCombine(tasks);
    }
  }, [tasks])

  useEffect(() => {
    if(tasksList){
      setCount(tasksList.length)
      setTasksIds(getTaskIds(tasksList));
      setTasksAv(applyPagination(tasksList, page, rowsPerPage))
    }
  }, [tasksList, page, rowsPerPage])

  useEffect(() => {
    setIsClient(true);
    dispatch(getAllTasks())
  }, [isClient, dispatch])

  useEffect(() => {
    if(message){
      toast.success(message, toastOptions);
      dispatch({type: "clearMessage"});
      dispatch(getAllTasks())
    }
    if(error){
      toast.error(error, toastOptions);
      dispatch({type: "clearErrors"});
    }
    if(updateMessage){
      toast.success(updateMessage, toastOptions);
      dispatch({type: "clearMessage"});
      dispatch(getAllTasks())
    }
    if(updateError){
      toast.error(updateError, toastOptions);
      dispatch({type: "clearErrors"});
    }
    if(deleteMessage){
      toast.success(deleteMessage, toastOptions);
      dispatch({type: "clearMessage"});
      dispatch(getAllTasks())
    }
    if(deleteError){
      toast.error(deleteError, toastOptions);
      dispatch({type: "clearErrors"});
    }
  }, [message, error, updateMessage, updateError, dispatch, toastOptions, deleteMessage, deleteError])


  return (
    <>
      {/* <Head>
        <title>
          Tasks | Finance Kit
        </title>
      </Head> */}

      {isClient && 
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Tasks
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button 
                  onClick={handleClickOpen}
                  disabled={loading}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            > */}
            {
              !loading && 
              <TasksSearch onSearch={handleSearch} onSelect={handleSelect}/>
            }

              {/* <Button
                color="inherit"
                startIcon={(
                  <SvgIcon fontSize="small">
                    <FunnelIcon />
                  </SvgIcon>
                )}
              >
                Export
              </Button> */}

            {/* </Stack> */}
            {tasks && 
            <TasksTable
              tasks={tasks}
              count={count}
              items={tasksAv}
              onDeselectAll={tasksSelection.handleDeselectAll}
              onDeselectOne={tasksSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={tasksSelection.handleSelectAll}
              onSelectOne={tasksSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={tasksSelection.selected}
              progress={progress}
              openEditTask={handleEdit}
            />}
          </Stack>
        </Container>
      </Box>
      }

      <Dialog 
        open={open}
        onClose={handleClose}
        maxWidth={dialogSize}
      >
          <Grid item
            xs={12}
            md={4}
            lg={8}
          >
            <AddTasks 
              onAddTaskData={handleData} 
            />
          </Grid>
        
      </Dialog>

      <Dialog 
        open={editOpen}
        onClose={handleEditClose}
        maxWidth={dialogSize}
        // BackdropProps={{
        //   onClick: handleClose
        // }}
      >
          <Grid item
            xs={12}
            md={4}
            lg={8}
          >
            <EditTasks 
              task = {editTask ? editTask : ""}
              onUpdateTaskData={updateData} 
            />
          </Grid>
        
      </Dialog>
    </>
  );
};

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Home;
