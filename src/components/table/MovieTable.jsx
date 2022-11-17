import './movieTable.scss';
import {useEffect, useState, useRef} from 'react';
import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'year', label: 'Year', minWidth: 70 },
  {
    id: 'runtime',
    label: 'Runtime',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'ravenue',
    label: 'Ravenue',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'genres',
    label: 'Genres',
    minWidth: 170,
    align: 'left',
  },
];

const MovieTable =() => {

  const navigate = useNavigate();
  const {movies} = useContext(MovieContext);

  const [searchData, setSearchData]= useState([]);
  const [allGenres, setAllGenres]= useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const genreSearch = useRef("All");
  const searchInput = useRef("");

  useEffect(() => {
    let allgenres = [];
    let uniqueGenres = [];
    setSearchData(movies);
    movies.forEach(element => element.genre.forEach(element => allgenres.push(element)));
    uniqueGenres = [...new Set(allgenres)];
    setAllGenres(uniqueGenres);
  },[movies]);

  const handleGenreSearch = (event) => {
    genreSearch.current = event.target.value;
    if (genreSearch.current === "All") {
      setSearchData(movies);
    } else {
      setSearchData(movies.filter(movie => movie.genre.includes(genreSearch.current)));
    }
  };

  const handleTitleSearch = (event) => {
    searchInput.current = event.target.value;
    setSearchData(movies.filter(movie => movie.title.toLowerCase().includes(searchInput.current.toLowerCase())));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleComment = (id) => {
    navigate(`/movie${id}`);
  }

    return (
      <div className='table'>
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: 644 }}>
            <Table stickyHeader aria-label="sticky table"> 
              <TableHead>

                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 0, minWidth: column.minWidth, background: "#D3D3D3" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="left"
                    style={{ top: 57, minWidth: "100%", background: "#D3D3D3"}}
                  >
                    <TextField 
                      id="outlined-basic" 
                      label="Filter by title" 
                      variant="outlined"
                      inputRef={searchInput}
                      onChange={handleTitleSearch}
                    />
                  </TableCell>

                  <TableCell
                    colSpan={3}
                    align="right"
                    style={{ top: 57, minWidth: "100%",  background: "#D3D3D3"}}
                  >
                    <FormControl sx={{ minWidth: 210 }}>
                      <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        inputRef={genreSearch}
                        value={genreSearch.current}
                        label="Age"
                        onChange={handleGenreSearch}
                      >
                        <MenuItem value="All">All</MenuItem>
                          {allGenres.map((genre, index) => {
                            return (
                              <MenuItem key={index} value={genre}>{genre}</MenuItem>
                              );
                          })}
                      </Select>
                    </FormControl>

                  </TableCell>
                </TableRow>
      
              </TableHead>
              <TableBody>
                {searchData 
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((movie, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => handleComment(movie.id)}>
                        <TableCell align={"left"} style={{ background: "#EEEEEE", cursor:"pointer"}}>
                          {movie.title}
                        </TableCell>
                        <TableCell align={"left"} style={{ background: "#EEEEEE", cursor:"pointer"}}>
                          {movie.year}
                        </TableCell>
                        <TableCell align={"left"} style={{ background: "#EEEEEE", cursor:"pointer"}}>
                          {movie.runtime}
                        </TableCell>
                        <TableCell align={"left"} style={{ background: "#EEEEEE", cursor:"pointer"}}>
                          {movie.revenue &&`$${ movie.revenue} M`}
                        </TableCell>
                        <TableCell align={"left"} style={{ background: "#EEEEEE", cursor:"pointer"}}>
                          {movie.rating}
                        </TableCell>
                        <TableCell align={"left"} style={{ background: "#EEEEEE", cursor:"pointer"}}>
                          {movie.genre.join(', ')}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            style={{ background: "#D3D3D3"}}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={searchData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
}

export default MovieTable