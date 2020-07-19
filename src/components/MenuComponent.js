import React, { Component } from 'react'; 
import { Media, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from "./DishdetailComponent"; 



class Menu extends Component{ 

	constructor(props) { 
		super(props); 

		this.state = { 
			selectedDish: null
		};

		console.log("Menu Component Constructor invoked."); 
	}

	

	componenetDidMount() { 
		console.log("Menu Component componenetDidMount is invoked."); 
	}

	onDishSelect(dish) { 
		this.setState({ selectedDish: dish});
	}


	renderDish(dish) { 
		if (dish!=null) { 
			return ( 
				<Card>
					<CardImg width='100%' src ={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>						
					
				);

		}

		else { 
			return ( 
				<div></div>
				); 
		}
	}

	// returns the html 
	render() { 
		const menu = this.props.dishes.map((dish) => { 
			return( 
				<div key={dish.id} className="col-12 col-md-5 m-1">
					<Card onClick={() => this.onDishSelect(dish)}>	
						<CardImg width='100%' src ={dish.image} alt={dish.name} />
						<CardImgOverlay>
							<CardTitle>{dish.name}</CardTitle>
							{/* */}
						</CardImgOverlay>	
					</Card>
				</div>
				); 
				 
			}); 

		console.log("Renderer invoked."); 


		console.log("Selected dish is: " + this.state.selectedDish);

		if (this.state.selectedDish != null) { 
		console.log("Selected dish name is: " + this.state.selectedDish.name);
		} 

		return (
			<div className="container">
				<div className="row">	
						{menu}
				</div>

				<DishDetail selectedDish = {this.state.selectedDish} />


				{/*<div className="row">
					<div className="col-12 col-md-5 m-1">					{this.renderDish(this.state.selectedDish)}
					</div>
				</div>*/}
			</div>
		); 
	}
}


export default Menu; 