var HotkeyTable = React.createClass({displayName: "HotkeyTable",
    render: function() {
        return (
            React.createElement("div", {className: "hotkey-table"}, 
            React.createElement("h3", null, this.props.hotkeys.name), 
            React.createElement("table", null, 
                React.createElement("thead", null, 
                    React.createElement("td", null, 
                        "Key Combo"
                    ), 
                    React.createElement("td", null, 
                        "Command"
                    )
                ), 
                React.createElement("tbody", null, 
                    
                        this.props.hotkeys.commands.map(function(item, key){
                            return (
                                React.createElement("tr", {key: key}, 
                                    React.createElement("td", null, item.keys), 
                                    React.createElement("td", null, item.command)
                                )
                            );
                        })
                    
                )
            )
            )
        );
    }

});

var Navigation = React.createClass({displayName: "Navigation",
    render: function(){
        return (
            React.createElement("header", {id: "side-nav"}, 
                React.createElement("nav", null, 
                    React.createElement("h3", null, "Pages"), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, React.createElement("a", {href: "#"}, "Home")), 
                        React.createElement("li", null, React.createElement("a", {href: "#"}, "About")), 
                        React.createElement("li", null, React.createElement("a", {href: "#"}, "Contact"))
                    ), 

                    React.createElement("div", {id: "apps-list"}, 
                    React.createElement("h3", null, "Apps"), 
                    React.createElement("ul", null, 
                        
                            this.props.apps.map(function(item, key){
                                return (
                                    React.createElement("li", {key: key}, React.createElement("a", {href: "#", onClick: this.props.onClick.bind(null, this, item)}, item))
                                );
                            }, this)
                        
                    ), 


                    React.createElement("h3", null, "Active"), 
                    React.createElement("ul", null, 

                        
                            this.props.active.map(function(item){
                                return (
                                    React.createElement("li", null, item)
                                );
                            })
                        
                    )
                    )
                )
            )

        );
    }
});

var Program = React.createClass({displayName: "Program",
    render: function(){
        return (
            React.createElement("div", {className: "program-container"}, 
                React.createElement("h2", null, this.props.programName), 
                React.createElement("p", null, this.props.programDescription), 

                
                    this.props.programCommands.map(function(item, key) {
                        return (
                            React.createElement(HotkeyTable, {hotkeys: item, key: key})
                        );
                    })
                
            )
        );
    }
});

/** @jsx React.DOM */
//React Components


var App = React.createClass({displayName: "App",
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
            React.createElement("div", null, 
                React.createElement(Navigation, {onClick: this.clickHandle, apps: this.state.apps, active: this.state.active}), 
                
                    this.state.applications.map(function(item, key) {
                        return(
                            React.createElement(Program, {programName: item.name, programDescription: item.description, programCommands: item.commands, key: key})
                        );
                    })
                
            )
        );
    }
});

//Rendering the Dom

React.render(
    React.createElement(App, null),
    document.getElementById('main')
);
