import React from "react";

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.handleBoardClick = props.handleBoardClick;
        this.handleTileClick = this.handleTileClick.bind(this);
        this.tileValue = props.tileValue;
        this.image_url = `/img-public/tileback.png`;
        this.image_alt = `Tile ${props.tileId}`;
        this.key = props.tileId;
        this.tileId = props.tileId;
        this.state = {faceup: false, matchFound: false};
    }
    
    handleTileClick() {
        this.image_url = `/img-public/tileFaces/tile${this.tileValue}.png`;
        this.image_alt = `Image ${this.tileValue}`;
        this.handleBoardClick(this.tileValue);
    }

    render() {
    return (
        <div className="tile" onClick={this.handleTileClick}>
            <h2>Tile {this.tileId}</h2>
            <img src={this.image_url} alt={this.image_alt} />
        </div>
        );
    }
}

export default Tile;
