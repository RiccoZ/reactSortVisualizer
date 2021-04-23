import React from 'react';
import "./SortVisualizer.css"

export class SortVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            isShown: false,
            chosenAlgorithm: "Chose Algorithm",
            sorting: false,
            sortingTime: 100,
        };

        setArrayState = setArrayState.bind(this);
        getArrayState= getArrayState.bind(this);
        setSortingState = setSortingState.bind(this);
        getSortingState= getSortingState.bind(this);
        setSortingTime = setSortingTime.bind(this);
        getSortingTime= getSortingTime.bind(this);
    }

    componentDidMount() {
        this.refreshArray();
    }

    refreshArray() {
        const array = [];

        for (let i = 0; i < 100; i++) {
            array.push(randomInt(5, 500));
        }

        this.setState({array: array});
    }

    callSorting(algorithmString) {
        setSortingTime(10);

        switch (algorithmString) {
            case "Merge Sort":
                mergeSort();
                break;
            case "Bubble Sort":
                bubbleSort();
                break;
        }
    }

    render() {
        const {array} = this.state;

        return (

            <div className="">
                <nav className="nav-container" onMouseLeave={() => this.setState({isShown: false})}>
                    <ul className="mainnav">
                        <li>
                            <button
                                onMouseEnter={() => this.setState({isShown: false})}
                                onClick={ () => (this.refreshArray())}
                            >New Array
                            </button>
                        </li>
                        <li>
                            <button
                                onMouseEnter={() => this.setState({isShown: true})}
                            >{this.state.chosenAlgorithm}</button>
                        </li>
                        <li>
                            <button
                                onMouseEnter={() => this.setState({isShown: false})}
                                onClick={() => (this.state.sorting ? console.log("ist aber true!") : this.callSorting(this.state.chosenAlgorithm))}
                            >Start Sorting
                            </button>
                        </li>
                        <li>
                            <input type="range" min="1" max="" step="1.0"/>
                        </li>
                    </ul>
                    {this.state.isShown && (
                        <div className="subnav">
                            <ul>
                                <li>
                                    <button onClick={() => {
                                        this.setState({isShown: false});
                                        this.setState({chosenAlgorithm: "Bubble Sort"});
                                    }}>Bubble Sort
                                    </button>
                                </li>

                                <li>
                                    <button onClick={() => {
                                        this.setState({isShown: false});
                                        this.setState({chosenAlgorithm: "Merge Sort"});
                                    }}>Merge Sort
                                    </button>
                                </li>

                                <li>
                                    <button onClick={() => {
                                        this.setState({isShown: false});
                                        this.setState({chosenAlgorithm: "Insertion Sort"});
                                    }}>Insertion Sort
                                    </button>
                                </li>

                                <li>
                                    <button onClick={() => {
                                        this.setState({isShown: false});
                                        this.setState({chosenAlgorithm: "Heap Sort"});
                                    }}>Heap Sort
                                    </button>
                                </li>
                            </ul>
                        </div>

                    )}
                </nav>

                <div className="array-container">
                    {array.map((value, id) => (
                        <div className="array-bar"
                             key={id}
                             style={{height: value + 'px'}}></div>
                    ))}
                </div>
            </div>
        );
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setArrayState(array) {
    this.setState({state: array});
}

function getArrayState() {
    return this.state.array;
}

function setSortingState(sortingState) {
    this.setState({sorting: sortingState});
}

function getSortingState() {
    return this.state.sorting;
}

function setSortingTime(sortingTimeInMs) {
    this.setState({sortingTime: sortingTimeInMs});
}

function getSortingTime() {
    return this.state.sortingTime;
}

async function bubbleSort() {
    setSortingState(true);
    const arraybars = document.getElementsByClassName('array-bar');
    let array = getArrayState();
    let changed = false;

    do{
        changed = false;
        for(let i = 0; i < arraybars.length-1; i++) {
            arraybars[i].style.backgroundColor = "red";
            arraybars[i+1].style.backgroundColor = "red";

            if(array[i] > array[i+1]) {
                changed = true;
                let hv = array[i];
                array[i] = array[i+1];
                array[i+1] = hv;
            }

            await sleep (getSortingTime());

            setArrayState(array);

            arraybars[i].style.backgroundColor = "#135569";
            arraybars[i+1].style.backgroundColor = "#135569";
        }
    } while(changed);
    setSortingState(false);
}

async function mergeSort() {
    setSortingState(true);
    const arraybars = document.getElementsByClassName('array-bar');

    return _mergeSort(getArrayState());
}

async function _mergeSort(array){

}


export default SortVisualizer;