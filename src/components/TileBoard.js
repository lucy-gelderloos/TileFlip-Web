//TileBoard contains the tiles and the discard pile

// receives difficulty (int) from Main when difficulty is selected
// creates randomized array of length (difficulty^2) where each digit between 1 and (difficulty^2 / 2), inclusive, appears twice
// create one Tile for each value in the array, passing in the value and its index (the index will become the Tile's key)

// states include firstTileValue (int), which resets to zero (or negative) when tilesClicked is 2; tilesClicked tracks how many tiles have been flipped
// after the second tile has been flipped, if there is no match, clicking anywhere on the TileBoard causes current faceup tiles to become facedown again, firstTileValue and secondClicked reset

// when matches are found, change the state of each tile to matchFound, then pass the tiles' image value to the DiscardPile component so it can display the most recent discard face up.
// Reset firstTileValue and tilesClicked

import React from "react";
import Tile from "./Tile";

class TileBoard extends React.Component {
    constructor(props) {
        super(props);
        // this.difficulty = props.difficulty;
        this.state = {
            difficulty: props.difficulty,
            firstTileValue: 0,
            tilesClicked: 0
        }
        this.handleResetClick = this.handleResetClick.bind(this);
        this.tilesArray = props.tilesArray;
    }

    handleResetClick() {
        // when the value of the second tile clicked does not match the value of the first tile clicked, bind this to TileBoard onClick
        // it should update only the two faceup tiles so their image becomes the back image and their state resets to faceup = false
    }

    
    // TODO: tileboard has columns equal to difficulty level
    render() {
        console.log("TileBoard render tilesArray",this.tilesArray)
        console.log("TileBoard render this.state.difficulty",this.state.difficulty)
        return(
            <div className="tileBoard">
                <div>
                    <h2>Tileboard goes here</h2>
                    {this.tilesArray.map(el => <Tile key={el._id} tileId={el._id} tileValue={el.value} />)}
                </div>
            </div>
        )
    }

}

export default TileBoard;
