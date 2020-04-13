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
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
    },
});

class FoodDashboard extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            originalRecipes:[],
            handleUploadFile:[],
            modal: false,
            totalRow:0,
            error: null,
            isUploaded: 0,
        }
        this.keyPress = this.keyPress.bind(this)
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
    }
    onOpenModal = () => { 
        this.setState({ modal: true });
    };

    addLike = (id) => { 
        var data;
        this.state.recipes.forEach(function (recipe) {
            if(recipe.id == id ){
                var liked = parseInt(recipe.liked) +1
                data = JSON.stringify({
                    liked : liked.toString()
                });
                fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/foods/'+id, {
                    method: "PUT",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': ' application/json',
                        'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                    }),
                    body: data
                }).then(function(response) {
                    //this.setState({movies:updatedMovies})
                    recipe.liked = liked.toString();
                }).then(function(data) { 
                    //this.getMovies();
                    //console.log(data)
                }).catch(console.log)
            }
        })
       
    };  

    addLove = (id) => { 
        var data;
        alert(111);
        this.state.recipes.forEach(function (recipe) {
            if(recipe.id == id ){
                var loved = parseInt(recipe.loved) +1
                data = JSON.stringify({
                    loved : loved.toString()
                });
                fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/foods/'+id, {
                    method: "PUT",
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': ' application/json',
                        'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                    }),
                    body: data
                }).then(function(response) {
                    //this.setState({movies:updatedMovies})
                    recipe.loved = loved.toString();
                    alert(JSON.stringify(recipe));

                }).then(function(data) { 
                    //this.getMovies();
                    //console.log(data)
                }).catch(console.log)
            }
        })
       
    }; 

    onCloseModal = () => {
        this.setState({ modal: false });
        //this.getMovies();
    };

    preventSubmit(event) {
        if (event.which === 13) {
          event.preventDefault();
        }
    }

    addRecipe(event){
        event.preventDefault();
        alert('event.target.link.value'+event.target.link.value);
        alert('this.state.foodImage'+this.state.foodImage);
        const data = JSON.stringify({
            name : event.target.title.value,
            enteredById: 'Krishanu Maity',
            recipeText: event.target.recipeText.value,
            link: event.target.link.value,
            foodImage: this.state.foodImage,
            liked: '0',
            loved: '0',
            ingredients: event.target.ingredients.value
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/foods', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: data
        }).then(function(response) {
            if(response.ok) {
              alert('Recipe added successfully!');
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
  
    handleUploadFile=event=>{
        const {path} = this.props;
        console.log(path)
        console.log(event.target.files[0]);
        const data = new FormData() ;
        data.append('file', event.target.files[0]);
        const filename=event.target.files[0].name;
        console.log(event.target.files[0].name);
        
        const toJson = response => response.json()
        const url = 'https://staging.cloud-elements.com/elements/api-v2/files?path=/Hackathon/'+filename;

        console.log('url', url)
        fetch(url, { 
            method: 'post', 
            headers: new Headers({
                'Authorization': 'User EfnK8nUSgdNNhKS4ENNGqQxbU/A0XsETBx3HhQagj4Q=, Organization d1035c4dfd8d7fd1b0f500ae85709e58, Element VJ08fi+un+Y8TPsvRhrmpPP4WfK/eGNA+vuBmbT8dLw='
            }),
            body:data})
        .then(response=>{
            return response.json();
        }).then(data => {
            console.log(data.id);
            this.setState({isUploaded: 2})
            const linkURL = 'https://staging.cloud-elements.com/elements/api-v2/files/'+data.id+'/links'
            fetch(linkURL, { 
                method: 'post', 
                headers: new Headers({
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'Authorization': 'User EfnK8nUSgdNNhKS4ENNGqQxbU/A0XsETBx3HhQagj4Q=, Organization d1035c4dfd8d7fd1b0f500ae85709e58, Element VJ08fi+un+Y8TPsvRhrmpPP4WfK/eGNA+vuBmbT8dLw='
                }),
                body: '{}'})
            .then(response=>{
                return response.json();
            }).then(data => {
                console.log(JSON.stringify(data.DownloadUrl));
                this.setState({foodImage: data.DownloadUrl});
              });
          });
        }

    keyPress(e){
        if(e.keyCode == 13){
            var value = e.target.value;
            console.log('value', value);
            if(value != '' && value != 'undefined' && value.length>0){
                var searchedRecipes = []
                var originalRecipes = this.state.originalRecipes;
                originalRecipes.forEach(function (recipe) {
                    if(JSON.stringify(recipe.name).toLowerCase().indexOf(value.toLowerCase()) > -1 ){
                        searchedRecipes.push(recipe);
                    }
                })
                var totalRow =Math.ceil(searchedRecipes.length/3);
                this.setState({originalRecipes: originalRecipes, recipes: searchedRecipes, totalRow : totalRow});
                // put the login here
            }else{
                var totalRow =Math.ceil(this.state.originalRecipes.length/3);
                this.setState({recipes: this.state.originalRecipes, totalRow: totalRow});
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
        
        axios.get('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/foods', options)
          .then(res => {
                var recipes = res.data.foods;
                if(recipes != 'undefined' && recipes.length>0){
                    var totalRow =Math.ceil(recipes.length/4);
                    this.setState({ recipes: recipes, totalRow: totalRow, originalRecipes: recipes});
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
            for (var j = 0; j < 4; j++) {
                if(index<this.state.recipes.length){
                    const recipe = this.state.recipes[index];
                    gridRow.push(
                        <Grid item xs={3}>
                                <div style={{width:'300px', backgroundColor:'#EEEEFF', minHeight:'100%',  height:'100%',  paddingTop:'5px', borderRadius:'10px',  borderTopRightRadius: '10px'}} >
                                    <h5>{recipe.name}</h5>
                                    <img src={`${recipe.foodImage}`} alt="Card image" height="200px" width="220px"  style={{marginLeft: '40px'}}/>
                                    {(recipe.enteredById !=='undefined' && recipe.enteredById !=='')?<p style={{marginTop:'-10px'}}><br/>Added By: {recipe.enteredById}</p>:''}
                                    <a href="#" onClick= { () =>this.addLike(recipe.id)} style={{float:'left', marginLeft:'10px'}}>
                                        <img src="../img/like.png" onClick= { () =>this.addLike(recipe.id)}></img>&nbsp;&nbsp;{recipe.liked}
                                    </a>
                                    <a href="#" onClick= { () =>this.addLove(recipe.id)} style={{float:'right', marginRight:'10px'}}>
                                        {recipe.loved}&nbsp;&nbsp;<img src="../img/love.png" onClick= { () =>this.addLove(recipe.id)}></img>
                                    </a>
                                </div>
                        </Grid>
                    )
                    index++;
                }
            }
            gridRows.push(
            <Grid container item xs={12} spacing={5}>
                {gridRow}
            </Grid>
            )
        }
        const { error, isUploaded } = this.state;
        return (
                <div className={classes.root} style={{ marginLeft: 150, marginTop: 0, padding: 30}} >
                    <div style={{float:'left', marginLeft:'0px', color:'white'}}>
                        <h4 >Food recipe suggestion</h4>
                    </div>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <CardActions>
                            <div>
                                <div  style={{border:'solid', borderRadius:'10px', }}>
                                    <SearchIcon />
                                    <InputBase
                                        placeholder="Search recipe..."
                                        inputProps={{ 'aria-label': 'search' }}
                                        style={{color:'white'}}
                                        onKeyDown={this.keyPress}
                                    />
                                </div>
                            </div>
                            <Tooltip title="Add New Recipe">
                                <IconButton aria-label="Add New Recipe" onClick={this.onOpenModal}>
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
                            <Modal.Header closeButton style={{backgroundColor:'#EEEEFF'}}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Add your recipe suggestion
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{backgroundColor:'#EEEEFF'}}>
                                <div className="container">
                                    <Row>
                                        <Col>
                                            <Form onSubmit={this.addRecipe} id="addCampaignForm" onKeyPress={this.preventSubmit}>
                                                <Form.Group controlId="name" >
                                                    <Form.Control type="text" name="title" required placeholder="Recipe title" /><br />
                                                        <div>
                                                            <div onChange={this.handleUploadFile}>
                                                                <label>Upload your food image</label><input type="file" name="file" placeholder="FILE UPLOAD" ref="fileUploader" />
                                                                {isUploaded===1 &&  (<div>Uploading...</div>)}
                                                                {isUploaded===2 && (<div>Uploaded!!</div>)}
                                                                {error && (<div>Error: {error.message}</div>)}
                                                            </div>               
                                                        </div> 
                                                   <br /><br />
                                                    <Form.Control type="text" name="link" placeholder="Youtube/Website URL" /><br />
                                                    <Form.Control as="textarea" rows="4" name="recipeText" placeholder="Describe the recipe" onKeyDown={this.searchMovie} /><br />
                                                    <Form.Control as="textarea" rows="3" name="ingredients" placeholder="Ingredients" /><br />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Button variant="primary" variant="primary" type="submit">
                                                        Add Recipe
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
        )
    }
}

FoodDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(FoodDashboard);

//export default FoodDashboard;
