/** @jsx React.DOM */
//React Components
var Program = React.createClass({
    getInitialState: function(){
        return {

        };
    },
    render: function(){
        return (
            <div className="program-container">
                <h2>{this.props.programName}</h2>
                <p>{this.props.programDescription}</p>
                <table>
                    <thead>
                        <td>
                            Key Combo
                        </td>
                        <td>
                            Command
                        </td>
                    </thead>
                    <tbody>
                        <td>
                            up+up+down X
                        </td>
                        <td>
                            Haduken!
                        </td>
                    </tbody>
                </table>
            </div>
        );
    }
});

var Hotkeys = React.createClass({
    getInitialState: function() {
        return {

        };
    },
    render: function() {
        return (
            <div className="hotkey-table">
                table
            </div>
        );
    }

});

//Rendering the Dom

React.render(
    <Program programName="Atom" programDescription="lorem ipsum"/>,
    document.getElementById('wrapper')
);
