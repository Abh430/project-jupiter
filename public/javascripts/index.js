/** @jsx React.DOM */
//React Components
var Program = React.createClass({
    getInitialState: function(){
        return {
            commands: [
                {"name" : "hadouken", "command" : "Up + up + down + Z"},
                {"name" : "punch", "command" : "X"},
                {"name" : "Uppercut", "command" : "Down + back + Y"}
            ],
            hotkeys: []
        };
    },
    componentWillMount: function(){
        this.setState({hotkeys: this.state.commands});

    },
    render: function(){
        return (
            <div className="program-container">
                <h2>{this.props.programName}</h2>
                <p>{this.props.programDescription}</p>
                <HotkeyTable hotkeys={this.state.hotkeys} />
            </div>
        );
    }
});

var HotkeyTable = React.createClass({
    render: function() {
        return (
            <div className="hotkey-table">
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
                    {
                    this.props.hotkeys.map(function(command, key){
                        return (
                            <tr key={key}>
                                <td>{command.name}</td>
                                <td>{command.command}</td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>
            </div>
        );
    }

});

var Header = React.createClass({
    getInitialState: function() {
        return {
            navItems: [
                "Home",
                "About",
                "Contact"
            ]
        };
    },
    render: function(){
        console.log(this.props.navItems);
        return (
            <header>
            <nav>
            <ul>{
                this.props.navItems.map(function(item){
                    return (
                        <li key={item}><a href="#" alt={item}>{item}</a></li>
                    );
                })}
            </ul>
            </nav>
            </header>
        );
    }
});

//Rendering the Dom
React.render(
    <Header />,
    document.getElementById('wrapper')
);

React.render(
    <Program programName="Atom" programDescription="lorem ipsum"/>,
    document.getElementById('wrapper')
);
