import {useRouter} from "next/router"
import {gql,useQuery} from '@apollo/client';
import {useState, useContext} from 'react';
import AppContext from "./context";
import Cookies from "js-cookie";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col} from "reactstrap";
function History({userID}){
  const [restaurantID, setRestaurantID] = useState()


  const {addItem} = useContext(AppContext)

let cookieusername = Cookies.get("username");
let cookieId = Cookies.get("userid");

console.log("history username: ",cookieusername);


const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

const GET_ORDER_HISTORY = gql`
  query($id: ID!) {
    order(id: $id) {
      id
      amount
    }
  }
`;

  console.log("graphql query: ", GET_ORDER_HISTORY);
  console.log("dishes query, ", GET_RESTAURANT_DISHES)
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_ORDER_HISTORY, {
    variables: { user: cookieId},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;
  console.log("error: ", error);
  console.log("data: ",data);
  let restaurant = data.restaurant;

  if (restId > 0){

    return (
      <>
          {restaurant.dishes.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 150, width:150 }}
                  src={`http://localhost:1337${res.image.url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}, ${res.price}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button 
                    outline
                    color="primary"
                    onClick = {()=> addItem(res)}
                  >
                    + Add To Cart
                  </Button>
                  
                </div>
              </Card>
            </Col>
          ))}
        </>
        )}
        else{
          return <h1> No Orders</h1>
        }
    }
    export default History