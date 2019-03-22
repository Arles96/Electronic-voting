import ConfirmationEmail from ".";


class ElectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        if (this.props.loggedIn) {
            return this.props.history.push('/profile');
        }
    }

    render() {
        return
        <div style={{ paddingRight: 2 + "rem" }}>

        </div >;
    }
}

export default ConfirmationEmail;