import React from "react";

class DiscardPile extends React.Component {
    constructor(props) {
        super(props);
        // this.image_url = props.image_url;
        // image url should come down from TileBoard (TileBoard.state.currentTile)
        this.image_alt = `Discard Pile`;
    }
    
    render() {
    return (
        <div className="discardPile">
            <h2>DiscardPile goes here</h2>
            <img src={this.image_url} alt={this.image_alt} />
        </div>
        );
    }
}

export default DiscardPile;
