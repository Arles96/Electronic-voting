import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ConfirmationEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificacion: false
        };
    }
    componentWillMount() {
        if(Meteor.userId()){
            Meteor.call('updateEmailVerification', this.props.match.params.token, (err, result) => {
                this.setState({ verificacion: result })
            })
        }else{

        }
    }

    render() {
        console.log(this.props)
        if(!Meteor.userId()){
            
        }

        if (this.state.verificacion && Meteor.userId()) {
            return (
                <div style={{ paddingRight: 2 + "rem" }}>
                    <p style={{ fontSize: '1.33em' }}>
                        Listo para votar
                    </p>
                </div >)
        } else {
            return (
                <div style={{ paddingRight: 2 + "rem" }}>
                    <p style={{ fontSize: '1.33em' }}>
                        Su voto no es valido
                    </p>
                </div >)
        }
    }
}

export default ConfirmationEmail;