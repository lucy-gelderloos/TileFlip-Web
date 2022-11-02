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
        this.difficulty = props.difficulty;
        this.state = {
            firstTileValue: 0,
            tilesClicked: 0
        }
        this.handleResetClick = this.handleResetClick.bind(this);
        this.tilesArray = this.createTilesArray();
    }

    handleResetClick() {
        // when the value of the second tile clicked does not match the value of the first tile clicked, bind this to TileBoard onClick
        // it should update only the two faceup tiles so their image becomes the back image and their state resets to faceup = false
    }

    createTilesArray() {
        let tilesArray = [], k = 0;
        for(let i = 1; i <= Math.pow(this.difficulty,2) / 2; i++) {
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

        console.log(tilesArray);
        return tilesArray;
    }

    // TODO: tileboard has columns equal to difficulty level
    render() {
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
