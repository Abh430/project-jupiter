var Program = React.createClass({
    render: function(){
        return (
            <div className="program-container">
                <h2>{this.props.programName}</h2>
                <p>{this.props.programDescription}</p>

                {
                    this.props.programCommands.map(function(item, key) {
                        return (
                            <HotkeyTable hotkeys={item} key={key} />
                        );
                    })
                }
            </div>
        );
    }
});
