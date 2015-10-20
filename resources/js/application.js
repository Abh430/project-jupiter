/** @jsx React.DOM */
//React Components

var Navigation = require('./components/_navigation.js');
var Program = require('./components/_program.js');
var react = require('react');

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
    componentWillMount: function() {
        this.getAppsList();
    },
    render: function() {
        return (
            <div>
                <Navigation onClick={this.clickHandle} apps={this.state.apps} active={this.state.active} />
                {
                    this.state.applications.map(function(item, key) {
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
