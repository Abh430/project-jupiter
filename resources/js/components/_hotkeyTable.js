/** @jsx React.DOM */


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

module.exports = HotkeyTable;
