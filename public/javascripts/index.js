/** @jsx React.DOM */
//React Components
var Program = React.createClass({
    getInitialState: function(){
        return {
            commands: []
        };
    },
    componentWillMount: function() {
        console.log(this.props.programCommands);
    },
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


var HotkeyTable = React.createClass({
    render: function() {
        return (
            <div className="hotkey-table">
            <h3>{this.props.hotkeys.name}</h3>
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
                        this.props.hotkeys.commands.map(function(item, key){
                            return (
                                <tr key={key}>
                                    <td>{item.keys}</td>
                                    <td>{item.command}</td>
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
            apps: [],
            active: {}
        };
    },
    componentWillMount: function() {

    },
    render: function(){
        return (
            <header id="side-nav">
                <nav>
                    <h3>Pages</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>

                    <div id="apps-list">
                    <h3>Apps</h3>
                    <ul>
                        {
                            this.props.apps.map(function(item, key){
                                return (
                                    <li key={key}><a href="#" onClick={this.props.onClick.bind(null, this, item)}>{item}</a></li>
                                );
                            }, this)
                        }
                    </ul>


                    <h3>Active</h3>
                    <ul>

                        {
                            this.props.active.map(function(item){
                                return (
                                    <li>{item}</li>
                                );
                            })
                        }
                    </ul>
                    </div>
                </nav>
            </header>

        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            applications: [{
                "name" : "Pick an App",
                "description" : "",
                "commands" : [{
                    "name": "",
                    "commands": [{
                        "keys": "",
                        "command": ""}]
                }]
            }],
            active: [

            ],
            url: {

            },
            apps: []
        };
    },
    clickHandle: function(e, obj) {

        var found = false;

        for(var i = 0; i < this.state.applications.length; i++) {
            if (this.state.applications[i].name.toLowerCase() === obj.toLowerCase()) {
                found = true;
                break;
            }
        }
        // console.log(this.state.applications);
        if (found === false) {
            $.ajax({
                url: '/hotkeys?app=' + obj,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    var tmpActive = [];
                    tmpActive = this.state.active;
                    tmpActive.push(data.name);

                    var tmpApps = [];
                    tmpApps = this.state.applications;
                    tmpApps.push(data);
                    this.setState({applications: tmpApps,
                                    active: tmpActive});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });

        }
    },
    getAppsList: function() {
        $.ajax({
            url: "/apps",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({apps: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    // getDefaultApp: function() {
    //     $.ajax({
    //         url: "/hotkeys?app=" + this.state.apps[0],
    //         dataType: 'json',
    //         cache: false,
    //         success: function(data) {
    //             this.setState({application: data});
    //             console.log(data);
    //         }.bind(this),
    //         error: function(xhr, status, err) {
    //             console.error(this.props.url, status, err.toString());
    //         }.bind(this)
    //     });
    // },
    componentWillMount: function() {
        this.getAppsList();
        // this.getDefaultApp();

    },
    componentDidMount: function() {

    },
    render: function() {
        return (
            <div>
                <Navigation onClick={this.clickHandle} apps={this.state.apps} active={this.state.active} />
                {
                    this.state.applications.map(function(item, key) {
                        console.log(item.commands);
                        return(
                            <Program programName={item.name} programDescription={item.description} programCommands={item.commands} key={key} />
                        );
                    })
                }

            </div>
        );
    }
});

//Rendering the Dom

React.render(
    <App />,
    document.getElementById('main')
);
