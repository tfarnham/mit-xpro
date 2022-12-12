import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/Link'

export default function Home() {

const restaurants = [
  {name:"WoodsHill"},
  {name:"Fiorellas"},
  {name:"Karma"}
]


  return (
    <div>
    <h1>Restaurant List</h1>
    {restaurants.map( item => {
      return <div>
        <Link as={"/restaurants/"+item.name} href="restaurants/[restaurant]">{item.name}</Link>
        </div>
    })}
    </div>  
  )
}
