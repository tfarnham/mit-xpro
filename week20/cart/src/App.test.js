import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
//import { shallow } from 'enzyme';
//import ToDoList from './ToDoList';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/product list/i);
  expect(linkElement).toBeInTheDocument();
});

jest.mock('axios',() => () => {
  return ({
    "data": {
        "data": [
            {
                "id": 1,
                "attributes": {
                    "name": "Kale",
                    "country": "Iceland",
                    "cost": 300,
                    "instock": 20,
                    "createdAt": "2022-09-11T20:55:30.708Z",
                    "updatedAt": "2022-09-12T02:43:56.430Z",
                    "publishedAt": "2022-09-12T02:43:56.429Z"
                            }
            }
                ]
            }
})
}

);
 
test('test for apples', () => {
  
  
  render(<App/>);
  const items = axios();
  const linkElement = screen.getByText(/apples/i);
  expect(linkElement).toBeInTheDocument();
  

})




