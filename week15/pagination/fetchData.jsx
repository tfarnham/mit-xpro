const Pagination = ({ items, pageSize, onPageChange }) => {
  // Part 2 code goes here
  const { Button } = ReactBootstrap;
  console.log("items in Paginatiom", items);
  if (items.length <= 1) return null;
  let numPages = Math.ceil(items.length / pageSize);
  let pages = range(1,1+numPages);
  console.log("Pages: ", pages);
  let list = pages.map(page => {
    return (
    <Button className="page-item" key={page} onClick={onPageChange}>{page}</Button>
    )
  });

  //return null;
  return (
    <nav><ul>
    {list}
    </ul></nav>
  )
};

const range = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((item, i) => start + i);
};

function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  let page = items.slice(start, start + pageSize);
  return page;
}

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    console.log("URL: ",url);
    let didCancel = false;
    const fetchData = async () => {
      // Part 1, step 1 code goes here
      dispatch({ type:"FETCH_INIT"});
      try {
        const result = await axios(url);
        if (!didCancel) {
          console.log("data axios: ", result.data);
          dispatch({ type:"FETCH_SUCCESS", payload: result.data});
        }
      } catch (error) {
        if(!didCancel) {
          dispatch({type: "FETCH_FAILURE"});
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      console.log("Data returned: ", action.payload);
      console.log("returned typeof", typeof action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

// App that gets cats from Cats as a Service
function App() {
  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState('MIT');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://cataas.com/api/cats?limit=10',
[]
  );
  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };
  console.log("data before page", data);
  let page = data;
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
  }
  return (
    <Fragment>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        // Part 1, step 2 code goes here
        <ul className="list-group">
{page.map((item) => (
    <li className="list-group-item" key={item.id}>
      <img src={`https://cataas.com/cat/${item.id}`}></img>{item.created_at}
    </li>
  ))}
        </ul>
      )}
      <Pagination
        items={data}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      ></Pagination>
    </Fragment>
  );
}

// ========================================
ReactDOM.render(<App />, document.getElementById('root'));
