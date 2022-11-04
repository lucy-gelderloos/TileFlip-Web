//TileBoard contains the tiles and the discard pile

// receives difficulty (int) from Main when difficulty is selected
// creates randomized array of length (difficulty^2) where each digit between 1 and (difficulty^2 / 2), inclusive, appears twice
// create one Tile for each value in the array, passing in the value and its index (the index will become the Tile's key)

// states include firstTileValue (int), which resets to zero (or negative) when tilesClicked is 2; tilesClicked tracks how many tiles have been flipped
// after the second tile has been flipped, if there is no match, clicking anywhere on the TileBoard causes current faceup tiles to become facedown again, firstTileValue and secondClicked reset

// when matches are found, change the state of each tile to matchFound, then pass the tiles' image value to the DiscardPile component so it can display the most recent discard face up.
// Reset firstTileValue and tilesClicked

import React from "react";
import Form from 'react-bootstrap/Form';

import Tile from "./Tile";

class TileBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTile: 0,
            numClicked: 0,
            reset: false, 
            gameStarted: false,
            tilesArray: this.createTilesArray(this.props.difficulty)
        };
        // this.difficulty = props.difficulty;
        // this.tilesArray = this.createTilesArray(this.props.difficulty);
        this.allTilesClick = this.allTilesClick.bind(this);
        this.handleMatchFound = this.handleMatchFound.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createTilesArray(this.props.difficulty);
        // this.setState({ reset: true });
        console.log("TileBoard handleSubmit tilesArray",this.tilesArray);
        console.log("TileBoard handleSubmit this.state.difficulty",this.state.difficulty);
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
        return this.tilesArray;
    }

    allTilesClick(value) {
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
                el.value = - 1;
            }
        });
        this.setState({reset: true});
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
    
    // TODO: tileboard has columns equal to difficulty level
    render() {
        console.log("TileBoard render tilesArray",this.tilesArray)
        console.log("TileBoard render this.props.difficulty",this.props.difficulty)
        console.log("TileBoard render this.state.difficulty",this.state.difficulty)
        return(
            <div className="tileBoard">
                <h2>Tileboard goes here</h2>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="submit" value="New Game" />
                </Form>
                <p>Tiles clicked: {this.state.numClicked}</p>
                <p>Current tile: {this.state.currentTile}</p>
                {this.tilesArray.map(el => <Tile key={el._id} tileId={el._id} tileValue={el.value} allTilesClick={this.allTilesClick} />)}
            </div>
        )
    }

}

export default TileBoard;
