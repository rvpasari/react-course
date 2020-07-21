import React, { Component } from 'react'; 
import { Card, CardImg,  CardText, CardBody, CardTitle } from 'reactstrap';

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
						<li> -- {comment.author}, 
						{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </li>
					</ul>
				</div>
				); 
		})

		return(<div>{commentary} 
			</div> ); 

	}

	render() { 

		if (this.props.dish != null) {	

			return (	
				<div className="container">
					<div className="row"> 
						<div className="col-12 col-md-5 m-1"> 
							{this.renderDish(this.props.dish)}
						</div>

						<div className="col-12 col-md-5 m-1"> 
								<h2>Comments</h2>
								{this.renderComments(this.props.dish.comments)}
							</div>
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