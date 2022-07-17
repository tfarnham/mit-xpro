const App = () => {
    const { useState } = React;
    let [state, setState] = useState([1, 2, 3, 4])
    const handler = index => {
        // code to update state and remove destroyed button
        // [1,3,4]
        let newState = state.filter((element, stateIndex) => {
            console.log("Check stateIndex: ", stateIndex," index: ",index)
            return !(element == index)
        });
        console.log("state: ",state);
        setState(newState)
    }
    let list = state.map((item, index) => {
        return <MyButton onClick={() => handler(item)} key={index}></MyButton>
    })
    return <div>{list}</div>
};

const MyButton = ({ onClick }) => {
    let { Button } = ReactBootstrap
    return <Button onClick={onClick}>Click Me6</Button>
}

ReactDOM.render(<App />, document.getElementById("root"));