// This class will handle all functionalities other than game
import info from './constants';
const e = React.createElement;

class Main extends React.Component {
    
    constructor(props) {
        console.log('Main Constructor');
        super(props);
        this.count = 1;
        this.state = { liked: false };
        this.init();
        this.height = window.innerHeight - 56;
        // set container height
        document.querySelector("#exercise").style.height = this.height+'px';
    }

    init() {
        console.log('Initialization');
        this.setGametext();
    }
    
    setGametext() {      
        const self = this;
        setInterval(()=> {     
            document.querySelector("#gameInfo").classList.remove('fade');
            setTimeout( ()=> { 
                document.querySelector("#gameInfo").classList.add('fade');
                document.querySelector("#gameInfo").innerHTML = info.gameText[self.getCount(self.count++)];                
            }, 1000);
        }, 4000);
    }

    getCount(counter) {
        if(counter === 4) {
            this.count = 1;
            return 1;
        } else {
            return counter;
        }
    }

    render() {
        if (this.state.liked) {
            return 'You liked comment number ' + this.props.commentID;
        }

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
    }
}

const domContainer = document.querySelector('#exercise');
ReactDOM.render(e(Main), domContainer);

export default Main;
