/** @jsx React.DOM */
//React Components
var Program = React.createClass({
    getInitialState: function(){
        return {
            commands: []
        };
    },
    render: function(){
        return (
            <div className="program-container">
                <h2>{this.props.programName}</h2>
                <p>{this.props.programDescription}</p>
                <HotkeyTable hotkeys={this.props.programCommands} />
            </div>
        );
    }
});

var HotkeyTable = React.createClass({
    render: function() {
        console.log(this.props.hotkeys);
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

var Navigation = React.createClass({
    getInitialState: function() {
        return {
            pages: [
                "Home",
                "About",
                "Contact"
            ],
            apps: [
                {
                    name: "Atom",
                    description: "lorem ipsum",
                    commands: [
                        {"name" : "hadouken", "command" : "Up + up + down + Z"},
                        {"name" : "punch", "command" : "X"},
                        {"name" : "Uppercut", "command" : "Down + back + Y"}
                    ]
                },
                {
                    name: "Zsh",
                    description: "This is Zsh!",
                    commands: [
                        {"name" : "hadouken", "command" : "Up + up + down + Z"},
                        {"name" : "punch", "command" : "X"},
                    ]
                },
                {
                    name: "MySQL",
                    description: "joins and tables and cells",
                    commands: [
                        {"name" : "Uppercut", "command" : "Down + back + Y"}
                    ]
                }
            ],
            active: []
        };
    },
    componentWillMount: function() {
        this.setState({nav: this.state.pages});
    },
    setActiveApp: function() {

    },
    render: function(){
        return (
                    <div>
                        <h3>Apps</h3>
                        <ul>
                            {
                                this.state.apps.map(function(item){
                                    return (
                                        <li key={item.name}><a href="#">{item.name}</a></li>
                                    );
                                })
                            }
                        </ul>


                        <h3>Active</h3>
                        <ul>
                            {
                                this.state.active.map(function(item){
                                    return (
                                        <li>{item.name}</li>
                                    );
                                })
                            }
                        </ul>


                </div>

        );
    }
});

var Body = React.createClass({
    getInitialState: function() {
        return {
            default:
                {
                    name: "Atom",
                    description: "lorem ipsum",
                    commands: [
                        {"name" : "hadouken", "command" : "Up + up + down + Z"},
                        {"name" : "punch", "command" : "X"},
                        {"name" : "Uppercut", "command" : "Down + back + Y"}
                    ]
                },
            application: {}
        };
    },
    componentWillMount: function() {
        this.setState({application: this.state.default});
    },
    render: function() {
        return (
            <Program programName={this.state.application.name} programDescription={this.state.application.description} programCommands={this.state.application.commands} />
        );
    }
});

//Rendering the Dom
React.render(
    <Navigation />,
    document.getElementById('apps-list')
);

React.render(
    <Body />,
    document.getElementById('main')
);
