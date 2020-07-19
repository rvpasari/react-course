import React, { Component } from 'react'; 
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{ 

	constructor(props){ 
		super(props); 
		this.state = { 
			dish: null 
		}
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
				<div>
				</div>
				); 
		}
	}


	renderComments(comments) { 
		console.log("comments are: " + comments[0].comment); 

		const commentary = comments.map((comment) => { 
			return(
				<div key={comment.id}> 
					<ul className="list-unstyled">
						<li> {comment.comment} </li>
						<br />
						<li> -- {comment.author}, {comment.date} </li>
					</ul>
				</div>
				); 
		})

		return(<div>{commentary} 
			</div> ); 

	}

	render() { 

		if (this.props.selectedDish != null) {	

			return (	
				<div className="row"> 
					<div className="col-12 col-md-5 m-1"> 
						{this.renderDish(this.props.selectedDish)}
					</div>

					<div className="col-12 col-md-5 m-1"> 
							<h2>Comments</h2>
							{this.renderComments(this.props.selectedDish.comments)}
						</div>
				</div>
				); 				
			}	

		else {
			return (<div> 
				</div>);
		} 
	}
} 




export default DishDetail; 