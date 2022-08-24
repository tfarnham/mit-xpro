const Square = ({id}) => {
  const [color, setColor] = React.useState('green');
  const palet = ['orange','blue','green'];
  const getRandomColor = () => palet[Math.floor(Math.random() * palet.length)];
  return (
    // change color of Square on click
    <button onClick={(e) => {
      setColor(getRandomColor);
      e.target.style.background = color;

    }}> <h1>{id}</h1></button>
  )
}

const Board = () => {
  const [player, setPlayer] = React.useState(0);
  let status = `Player ${player}`;
  function renderSquare(i) {
    return <Square id={i}></Square>;
  }
  return (
    <div
      className="game-board"
      onClick={(e) => {
        setPlayer((player + 1)%2);
        status = `Player ${player}`;
        //e.target.style.background = 'yellow';
      }}
    >
    <div className="grid-row">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
