// import React, { useState } from 'react';
// import Navbar from './Navbar'

// function List() {
//   const [ navLinks, setNavLinks ] = useState([])

//   const addIngredientHandler = ingredient => {
//     //setIsLoading(true)
//     fetch('/data.json')
//     .then(response => {
//       //setIsLoading(false)
//       return response.json()
//     }).then(responseData => {
//         setNavLinks(allNavLinks => [
//         ...prevIngredients, 
//         { id: responseData.name, ...ingredient }
//       ])
//     })
//   }

//   componentDidMount() {
//     fetch('/data.json')
//       .then(res => res.json())
//       .then(responseData => {
//           this.setState = responseData
//       });
//   }

//   render() {
//     const { data } = this.state;
//     console.log(data)
//     return data ? <Navbar sections={data} title={"NavBar"} /> : <div>Loading...</div>;
//   }

//   renderLoading() {
//     return <div>Loading...</div>;
//   }
// }

// export default List;