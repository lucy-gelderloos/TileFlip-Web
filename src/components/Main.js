import React from "react";
import Form from 'react-bootstrap/Form';

// import TileBoard from './TileBoard.js';
import Tile from './Tile.js';
import ScoreBoard from './ScoreBoard.js';

class Main extends React.Component {
// Main contains (1) the form to select difficulty (2) the game board (3) the scoreboard

    constructor(props) {
        super(props);
        this.state = {
            difficulty: 2,
            currentTile: 0,
            numClicked: 0,
            reset: false, 
            gameStarted: false
        };
        // tilesArray might need to be state since it gets edited
        this.tilesArray = this.createTilesArray(this.state.difficulty);
        this.handleBoardClick = this.handleBoardClick.bind(this);
        this.handleMatchFound = this.handleMatchFound.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleSelect(event) {
        this.setState({difficulty: event.target.value});
        console.log("Main handleSelect this.state.difficulty",this.state.difficulty);    
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createTilesArray(this.state.difficulty);
        this.setState({gameStarted: true});
        console.log("Main handleSubmit tilesArray",this.tilesArray);
    }
    
    createTilesArray(difficulty) {
        let tilesArray = [], k = 0;
        for(let i = 1; i <= Math.pow(difficulty,2) / 2; i++) {
            tilesArray[k] = i;
            k++;
            tilesArray[k] = i;
            k++;
        }
        // https://bost.ocks.org/mike/shuffle/
        let len = tilesArray.length, j, t;
        while(len) {
            j = Math.floor(Math.random() * len--);
            t = tilesArray[len];
            tilesArray[len] = tilesArray[j];
            tilesArray[j] = t;
        }
        
        for(let i = 0; i < tilesArray.length; i++) {
            let holdingVal = tilesArray[i];
            tilesArray[i] = {_id: i, value: holdingVal};
        }
        this.tilesArray = tilesArray;
        console.log("tilesArray",tilesArray);
        return this.tilesArray;
    }

    handleBoardClick(value) {
        this.setState({ numClicked: this.state.numClicked + 1 });
        if(this.state.currentTile === 0) {
            this.setState({ currentTile: value });
        } else {
            if(this.state.currentTile === value) {
                this.handleMatchFound(value);
            } else this.setState({ reset: true, currentTile: 0, numClicked: 0 });
        }
    }

    handleMatchFound(value) {
        // How to remove tiles from the board when a match is found
        // could I edit tilesArray to make the value of each selected tile negative or something, and any tiles with that ID have no image (or a placeholder image) and no on-click?
        // pass in the tile's value, then iterate through the array and change the value of both matching tiles
        // then I could just re-render all the tiles and they'd stay in order because it would be the same array
        this.tilesArray.forEach(el => {
            if(el.value === value) {
                el.value = -1;
            }
        });
        console.log("Main handleMatchFound tilesArray", this.tilesArray);
        return this.tilesArray;
    }

    handleResetClick() {
        // when this.state.reset is true, bind this to the whole tile board onClick
        // it should update only the two faceup tiles so their image becomes the back image and their state resets to faceup = false
        // if I can edit tilesArray in handleMatchFound, I can just have the tiles re-render every time, since it'll be using the same tilesArray
        if(this.state.reset) {
            // re-render the tiles using tilesArray
            this.setState({ currentTile: 0, numClicked: 0, reset: false });
        }
    }

    render() {
        return(
            <main>
                <h2>Main</h2>
                <p>Tiles clicked: {this.state.numClicked}</p>
                <p>Current tile: {this.state.currentTile}</p>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group>
                  <Form.Label>Choose difficulty level:</Form.Label>
                  <Form.Select onChange={this.handleSelect.bind(this)}>      
                    <option value="2">Very Easy</option>
                    <option value="4">Easy</option>
                    {/* <option value="5">Medium</option> */}
                    <option value="6">Hard</option>
                    </Form.Select>
                </Form.Group>
                <input type="submit" value="Submit" />
              </Form>
              <div className="tileBoard" onClick={this.handleResetClick}>
                {this.tilesArray.map(el => <Tile key={el._id} tileId={el._id} tileValue={el.value} handleBoardClick={this.handleBoardClick} gameStarted={this.state.gameStarted}/>)}
              </div>
              <ScoreBoard />
            </main>
        )
    }
  }
  
  export default Main;
