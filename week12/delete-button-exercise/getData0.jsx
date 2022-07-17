const App = () => {
    const { useState } = React;
    let [state, setState] = useState([1, 2, 3, 4])
    const handler = index => {
        // code to update state and remove destroyed button
        // [1,3,4]
        let newState = state.filter((element, stateIndex) => {
            console.log("Check stateIndex: ", stateIndex," index: ",index)
            return !(index == stateIndex)
        });
        console.log("state: ",state);
        setState(newState)
    }
    let list = state.map((item, index) => {
        return <MyButton onClick={() => handler(index)} key={index}></MyButton>
    })
    return <div>{list}</div>
};

const MyButton = ({ onClick }) => {
    let { Button } = ReactBootstrap
    return <Button onClick={onClick}>Click Me5</Button>
}

ReactDOM.render(<App />, document.getElementById("root"));