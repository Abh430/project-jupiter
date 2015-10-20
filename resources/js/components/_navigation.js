/** @jsx React.DOM */

var Navigation = React.createClass({
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

module.exports = Navigation;
