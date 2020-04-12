import React, { Component } from 'react';

// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import ShowMoreText from 'react-show-more-text';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'


class DashboardMovies extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            originalMovies:[],
            searchedMovies:[],
            modal: false,
            totalRow:0
        }
        this.keyPress = this.keyPress.bind(this)
        this.searchMovie = this.searchMovie.bind(this);
        this.addMovie = this.addMovie.bind(this);
    }
    onOpenModal = () => { 
        this.setState({ modal: true });
    };

    addLike = (id, tmdb_id) => { 
        var data;
        this.state.movies.forEach(function (movie) {
            if(movie.tmdb_id == parseInt(tmdb_id) ){
                var Likes = parseInt(movie.Likes) +1
                data = JSON.stringify({
                    Likes : Likes
                });
                fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/movies/'+id, {
                    method: "PUT",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': ' application/json',
                        'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                    }),
                    body: data
                }).then(function(response) {
                    //this.setState({movies:updatedMovies})
                    movie.Likes = Likes;
                }).then(function(data) { 
                    //this.getMovies();
                    //console.log(data)
                }).catch(console.log)
            }
        })
       
    };  

    addDislike = (id, tmdb_id) => { 
        var data;
        this.state.movies.forEach(function (movie) {
            if(movie.tmdb_id == parseInt(tmdb_id) ){
                var Dislikes = parseInt(movie.Dislikes) +1
                data = JSON.stringify({
                    Dislikes : Dislikes
                });
                fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/movies/'+id, {
                    method: "PUT",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': ' application/json',
                        'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                    }),
                    body: data
                }).then(function(response) {
                    //this.setState({movies:updatedMovies})
                    movie.Dislikes = Dislikes;
                }).then(function(data) { 
                    //this.getMovies();
                    //console.log(data)
                }).catch(console.log)
            }
        })
       
    }; 

    onCloseModal = () => {
        this.setState({ modal: false });
        this.getMovies();
    };

    preventSubmit(event) {
        if (event.which === 13) {
          event.preventDefault();
        }
    }

    addMovie(event){
        event.preventDefault();
        var selectedMovie;
        this.state.searchedMovies.forEach(function (movie) {
            if(movie.id == event.target.id.value ){
                selectedMovie = movie;
            }
        })
        const data = JSON.stringify({
            tmdb_id : selectedMovie.id,
            title : selectedMovie.original_title,
            genres: event.target.genres.value,
            overview: selectedMovie.overview,
            releaseDate: selectedMovie.release_date,
            posterPath: selectedMovie.poster_path,
            originalLanguage: selectedMovie.original_language,
            Likes: 0,
            Dislikes: 0,
            StreamsOn : event.target.StreamsOn.value,
            userEnteredId : 'Bob Barret'
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/movies', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: data
        }).then(function(response) {
            if(response.ok) {
              alert('Movie added successfully!');
              //document.getElementById("caddCampaignForm").reset();
            }
         }).then(function(data) { 
           //console.log(data)
         }).catch(console.log)
    }
    componentDidMount = () => {
        this.getMovies();
    }
    // handleChange(e) {
    //     //this.setState({ value: e.target.value });
    //     alert(e.target.value);
    // }
  
    searchMovie(e){
        if(e.keyCode == 13){
            var value = e.target.value;
            console.log('value', value);
            if(value != '' && value != 'undefined' && value.length>0){
                fetch('https://api.themoviedb.org/3/search/movie?api_key=43b748b63dd0497d13337b1ffcca25e9&query='+value)
                .then(data => data.json())
                .then(data => {
                    if(null != data.results && data.results != 'undefined' && data.results.length>0){
                        this.setState({searchedMovies:data.results});
                        alert('Search result returns more than one movie, select the movie from dropdown or enter exact title of better result');
                    }else{
                        alert('No movie found matching the title, please enter different value');
                    }
                })
                // put the login here
            }else{
                alert('Enter a movie title and hit ENTER');
            }
        }
    }

    keyPress(e){
        if(e.keyCode == 13){
            var value = e.target.value;
            console.log('value', value);
            if(value != '' && value != 'undefined' && value.length>0){
                var searchedMovies = []
                var originalMovies = this.state.originalMovies;
                originalMovies.forEach(function (movie) {
                    if(JSON.stringify(movie.title).toLowerCase().indexOf(value.toLowerCase()) > -1 || 
                    (movie.genres != 'undefined' && JSON.stringify(movie.genres).toLowerCase().indexOf(value.toLowerCase())> -1)){
                        searchedMovies.push(movie);
                    }
                })
                var totalRow =Math.ceil(searchedMovies.length/3);
                this.setState({originalMovies: originalMovies, movies: searchedMovies, totalRow : totalRow});
                // put the login here
            }else{
                var totalRow =Math.ceil(this.state.originalMovies.length/3);
                this.setState({movies: this.state.originalMovies, totalRow: totalRow});
            }
        }
    }

    getMovies = () => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }
        };
        
        axios.get('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/movies', options)
          .then(res => {
                var movies = res.data.movies;
                if(movies != 'undefined' && movies.length>0){
                    var totalRow =Math.ceil(movies.length/3);
                    this.setState({ movies: movies, totalRow: totalRow, originalMovies: movies});
                }
          })
    }
    render(props) {
        //const classes = useStyles();
        //const classes = this.props;
        const { classes } = this.props;
        const gridRows = []
        var index = 0;
        //console.log('this.state.totalRow',this.state.totalRow, this.state.movies.length)
        for (var i = 0; i < this.state.totalRow; i++) {
            var gridRow = []
            for (var j = 0; j < 3; j++) {
                if(index<this.state.movies.length){
                    const movie = this.state.movies[index];
                    gridRow.push(
                        <Grid item xs={4}>
                            <div style={{backgroundColor:'black', color:'white' , minHeight:'280px'}}>
                                <div style={{float:'left', width:'40%', backgroundColor:'black', height:'280px'}}>
                                    <img src={`http://image.tmdb.org/t/p/w185${movie.posterPath}`} alt="Card image" height="280px" width="180px"/>
                                </div>
                                <div></div>
                                <div style={{float:'right', width:'60%', backgroundColor:'black', minHeight:'100%',  height:'100%',  paddingTop:'5px'}}>
                                    <ShowMoreText lines={3} more='Show more' less='Show less' anchorClass='' expanded={false} width={window.width}>
                                        {movie.overview}
                                    </ShowMoreText><br/>
                                    {(movie.genres !=='undefined' && movie.genres !=='')?<p style={{marginTop:'-10px'}}>Genre: {movie.genres}</p>:''}
                                    {(movie.releaseDate !=='undefined' && movie.releaseDate !=='')?<p style={{marginTop:'-10px'}}>Release Date: {movie.releaseDate}</p>:''}
                                    {(movie.StreamsOn !=='undefined' && movie.StreamsOn !=='')?<p style={{marginTop:'-10px'}}>Streams On: {movie.StreamsOn}</p>:''}
                                    {(movie.userEnteredId !=='undefined' && movie.userEnteredId !=='')?<p style={{marginTop:'-10px'}}>Added By: {movie.userEnteredId}</p>:''}
                                    <a href="#" onClick= { () =>this.addLike(movie.id, movie.tmdb_id)}>
                                        <img src="../img/like.png" onClick= { () =>this.addLike(movie.id, movie.tmdb_id)}></img>&nbsp;&nbsp;{movie.Likes}
                                    </a>
                                    <a href="#" onClick= { () =>this.addDislike(movie.id, movie.tmdb_id)} style={{float:'right', marginRight:'5px'}}>
                                        {movie.Dislikes}&nbsp;&nbsp;<img src="../img/dislike.png" onClick= { () =>this.addDislike(movie.id, movie.tmdb_id)}></img>
                                    </a>
                                </div>
                            </div>
                        </Grid>
                    )
                    index++;
                }
            }
            gridRows.push(
            <Grid container item xs={12} spacing={3}>
                {gridRow}
            </Grid>
            )
        }
        return (
            <React.Fragment>
                <Container maxWidth="xl">
                    <div style={{ marginLeft: 120, marginTop: 5, padding: 30, backgroundColor: '#282828' }} >
                            <div style={{float:'left', marginLeft:'0px', color:'white'}}>

                            <h4 >Movie Suggestion by locals</h4>
                            </div>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <CardActions>
                                <div>
                                    <div  style={{border:'solid', borderRadius:'10px', }}>
                                        <SearchIcon />
                                        <InputBase
                                            placeholder="Search Movie..."
                                            inputProps={{ 'aria-label': 'search' }}
                                            style={{color:'white'}}
                                            onKeyDown={this.keyPress}
                                        />
                                    </div>
                                </div>
                                <Tooltip title="Add New Campaign">
                                    <IconButton aria-label="Add New Campaign" onClick={this.onOpenModal}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                            <Modal
                                show={this.state.modal}
                                onHide={this.onCloseModal}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton style={{backgroundColor:'black', color:'white'}}>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Add your movie suggestion
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{backgroundColor:'black', color:'white'}}>
                                    <div className="container">
                                        <Row>
                                            <Col>
                                                <Form onSubmit={this.addMovie} id="addCampaignForm" onKeyPress={this.preventSubmit}>
                                                    <Form.Group controlId="name" >
                                                        <Form.Control type="text" name="name" required placeholder="Search Title: type title of the movie and Hit ENTER" onKeyDown={this.searchMovie} /><br />
                                                        <Form.Control as="select" name="id" placeholder="Type">
                                                            <option value="">Select the movie</option>
                                                            {this.state.searchedMovies.map((movie) => <option key={movie.id} value={movie.id}>{movie.title}</option>)}
                                                        </Form.Control><br />
                                                        <Form.Control type="text" name="genres" placeholder="Genres, e.g. Action, Thirller, Drama, etc. Enter comma separated" onKeyDown={this.searchMovie} /><br />
                                                        <Form.Control type="text" name="StreamsOn" placeholder="Available on, e.g. Netflix, Hulu" /><br />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Button variant="primary" variant="primary" type="submit">
                                                            Add Movie
                                                        </Button>
                                                        <Button onClick={this.onCloseModal} variant="secondary" style={{ float: 'right' }}>Close</Button>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </Grid>
                        <Grid container spacing={1}>
                            {gridRows}
                        </Grid>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

// DashboardMovies.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
  
// export default withStyles(styles)(DashboardMovies);

export default DashboardMovies;
