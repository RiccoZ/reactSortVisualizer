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
            sortingTime: 250,
        };

        setArrayState = setArrayState.bind(this);       //bind functions to this, to access states
        getArrayState = getArrayState.bind(this);
        setSortingState = setSortingState.bind(this);
        getSortingState = getSortingState.bind(this);
        setSortingTime = setSortingTime.bind(this);
        getSortingTime = getSortingTime.bind(this);
    }

    componentDidMount() {
        this.refreshArray();
        document.getElementById("speedslider").value = getSortingTime();
    }

    refreshArray() {
        const array = [];

        for (let i = 0; i < 100; i++) {
            array.push(randomInt(5, 500));
        }

        this.setState({array: array});
    }

    callSorting(algorithmString) {
        switch (algorithmString) {
            case "Merge Sort":
                mergeSort();
                break;
            case "Bubble Sort":
                bubbleSort();
                break;
            case "Insertion Sort":
                insertionSort();
                break;
            case "Heap Sort":
                heapSort();
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
                            <input id="speedslider" type="range" min="10" max="1000" step="10" onChange={() => {
                                let sorttime = document.getElementById("speedslider").value;
                                setSortingTime(sorttime);
                                document.getElementById("speedsliderLabel").value = sorttime;
                            }}/>
                            <label id="speedsliderLabel">{getSortingTime()}ms</label>
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
    const normalcolor = document.getElementsByClassName('array-bar')[0].style.backgroundColor;
    let array = getArrayState();
    let changed = false;

    do{
        changed = false;
        for(let i = 0; i < arraybars.length-1; i++) {
            arraybars[i].style.backgroundColor = "yellow";      //yellow when checking
            arraybars[i+1].style.backgroundColor = "yellow";

            await sleep (getSortingTime());

            if(array[i] > array[i+1]) {
                arraybars[i].style.backgroundColor = "red";     //red when it has to be swapped
                arraybars[i+1].style.backgroundColor = "red";
                changed = true;
                let hv = array[i];
                array[i] = array[i+1];
                array[i+1] = hv;
            } else {
                arraybars[i].style.backgroundColor = "green";   //green when it has not to be swapped
                arraybars[i+1].style.backgroundColor = "green";
            }

            await sleep (getSortingTime());

            setArrayState(array);

            arraybars[i].style.backgroundColor = normalcolor;       //green return to normal color
            arraybars[i+1].style.backgroundColor = normalcolor;
        }
    } while(changed);
    setSortingState(false);
}

async function mergeSort() {
    setSortingState(true);
    const arraybars = document.getElementsByClassName('array-bar');

    setArrayState(_mergeSort(getArrayState()));
    setSortingState(false);
}

async function _mergeSort(array) {
    if(array.length === 1) {
        console.log("return : " + array)
        return array;
    }

    let firsthalfarray = array.splice(0, Math.floor(array.length/2));
    let secondhalfarray = array;

    console.log("first: " + firsthalfarray + " || second: " + secondhalfarray);

    return merge(_mergeSort(firsthalfarray),_mergeSort(secondhalfarray));
}

async function merge(arrayleft, arrayright) {
    let arrayl = [];
    arrayl.push(arrayleft);

    let arrayr = [];
    arrayr.push(arrayright);

    console.log(arrayl + " || " + arrayr);

    let leftindex = 0;
    let rightindex = 0;
    let arraylength = arrayl.length + arrayr.length;

    console.log(arraylength);
    console.log(arrayl.length);
    console.log(arrayr.length);

    let array = [];

    for(let i = 0; i < arraylength; i++) {
        if(arrayl[leftindex] > arrayr[rightindex]) {
            array.push(arrayr[rightindex]);
            rightindex++;
        } else {
            array.push(arrayl[leftindex]);
            leftindex++;
        }
    }

    console.log(array);

    return array;
}

async function insertionSort() {
    setSortingState(true);
    const arraybars = document.getElementsByClassName('array-bar');
    const normalcolor = document.getElementsByClassName('array-bar')[0].style.backgroundColor;
    let array = getArrayState();

    for(let i = 1; i < array.length; i++) {
            setArrayState(array);
            arraybars[i].style.backgroundColor = "yellow";
            arraybars[i-1].style.backgroundColor = "yellow";
            await sleep(getSortingTime());
            if(array[i-1] <= array[i]) {
                arraybars[i].style.backgroundColor = "green";
                arraybars[i-1].style.backgroundColor = "green";
                await sleep(getSortingTime());
                arraybars[i].style.backgroundColor = normalcolor;
                arraybars[i-1].style.backgroundColor = normalcolor;
            } else {
                for(let f = i; f > 0; f--) {
                    arraybars[f].style.backgroundColor = "yellow";
                    arraybars[f-1].style.backgroundColor = "yellow";
                    await sleep(getSortingTime());
                    if(array[f] <= array[f-1]) {
                        arraybars[f].style.backgroundColor = "red";
                        arraybars[f-1].style.backgroundColor = "red";
                        await sleep(getSortingTime());
                        let hv = array[f];
                        array[f] = array[f-1];
                        array[f-1] = hv;
                        setArrayState(array);
                        await sleep(getSortingTime());
                        arraybars[f].style.backgroundColor = "green";
                        arraybars[f-1].style.backgroundColor = "green";
                        await sleep(getSortingTime());
                        arraybars[f].style.backgroundColor = normalcolor;
                        arraybars[f-1].style.backgroundColor = normalcolor;
                    } else {
                        arraybars[f].style.backgroundColor = "green";
                        arraybars[f-1].style.backgroundColor = "green";
                        await sleep(getSortingTime());
                        arraybars[f].style.backgroundColor = normalcolor;
                        arraybars[f-1].style.backgroundColor = normalcolor;
                        break;
                    }
                }
            }
        }
    setSortingState(false);
}


async function heapSort(){ //maxheap
    setSortingState(true);
    const arraybars = document.getElementsByClassName('array-bar');
    const normalcolor = document.getElementsByClassName('array-bar')[0].style.backgroundColor;
    let array = getArrayState();

    for(let k = 0; k < array.length; k++) {
        for(let i = (array.length-1) - k; i > 0; i--) {
            arraybars[Math.floor(i / 2)].style.backgroundColor = "yellow";
            arraybars[i].style.backgroundColor = "yellow";
            await sleep(getSortingTime());

            if(array[Math.floor(i / 2)] < array[i]) {
                let hv = array[Math.floor(i / 2)];
                array[Math.floor(i / 2)] = array[i];
                array[i] = hv;
                arraybars[Math.floor(i / 2)].style.backgroundColor = "red";
                arraybars[i].style.backgroundColor = "red";
                setArrayState(array);
                await sleep(getSortingTime());
            } else {
                arraybars[Math.floor(i / 2)].style.backgroundColor = "green";
                arraybars[i].style.backgroundColor = "green";
                await sleep(getSortingTime());
            }

            arraybars[Math.floor(i / 2)].style.backgroundColor = normalcolor;
            arraybars[i].style.backgroundColor = normalcolor;
            await sleep(getSortingTime());
        }

        let hv = array[array.length - k];
        array[array.length - k] = array[0];
        array[0] = hv;
        setArrayState(array);
    }
    setArrayState(array);
    setSortingState(false);
}


export default SortVisualizer;