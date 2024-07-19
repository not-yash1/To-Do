import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { MdOutlineEdit } from "react-icons/md";
import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SeverityPill } from '../../sections/severity-pill';

const statusMap = {
  'In Progress': 'warning',
  'Completed': 'success',
  'To Do': 'error'
};

export const TasksTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    tasks,
    openEditTask
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  // const openTask = (val) => {
  //   console.log(`Opening Task ${val}`)
  // }

  const [ avt, setAvt ] = useState('/assets/avatars/avatar-siegbert-gottfried.png')


  return (
    <Card >
      {/* <Scrollbar> */}
        <Box sx={{ minWidth: 800 }}>
          <Table >
            <TableHead>
              <TableRow >
                {/* <TableCell padding="checkbox" >
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                {/* <TableCell>
                  Name
                </TableCell> */}
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Created Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {items && items.map((task, index) => {
                const isSelected = selected.includes(task._id);
                const date = new Date(task.createdAt)
                const instalDate = format(date, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={task._id}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox" >
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(task._id);
                          } else {
                            onDeselectOne?.(task._id);
                          }
                        }}
                      />
                    </TableCell> */}
                    {/* <TableCell 
                    sx={{
                        '&:hover': {
                        cursor: 'pointer'
                        }
                    }}
                    // onClick = {() => openTask(task.id)}
                    >
                    <Link href={`/tasks/${task._id}`} style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                        <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        >
                        <Avatar src={avt}>
                            {getInitials(task.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                            {task.name}
                        </Typography>
                        </Stack>
                    </Link>
                    </TableCell> */}
                    <TableCell>
                      {task.title}
                    </TableCell>
                    <TableCell>
                      {task.desc}
                    </TableCell>
                    <TableCell>
                      {instalDate}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={ statusMap[task.status]}>
                        {task.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell 
                    sx={{
                        '&:hover': {
                        cursor: 'pointer'
                        }
                    }}
                    onClick = {() => openEditTask(task)}
                    >
                      <MdOutlineEdit />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      {/* </Scrollbar> */}
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TasksTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
