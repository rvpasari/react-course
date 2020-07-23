import React from 'react'; 
import { Card, CardImg,  CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


	function RenderDish({dish}) { 
		
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


 // 	function RenderComments(comments) { 
 // 
 // 		const commentary = comments.map((comment) => { 
 // 			return(
 // 				<div key={comment.id}> 
 // 					
 // 					<ul className="list-unstyled">
 // 						<li> {comment.comment} </li>
 // 						<br />
 // 						<li> -- {comment.author}, 
 // 						{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </li>
 // 					</ul>
 // 				</div>
 // 				); 
 // 		})
 // 
 // 		return(<div>{commentary} 
 // 			</div> ); 
 // 
 // 	}


 	function RenderComments({comments}) { 

 		console.log("Comments passed are: " + comments.comment); 
 			return(
 				<div key={comments.id}> 
 					<ul className="list-unstyled">
 						<li> {comments.comment} </li>
 						<br />
 						<li> -- {comments.author}, 
 						{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))} </li>
 					</ul>
 				</div>
 				); 
  	}




	const DishDetail = (props) => {
	
		if (props.dish != null) {	
			return (	
				<div className="container">
					
					<Breadcrumb>
						
						<BreadcrumbItem>
							<Link to='/home'>Home</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Link to='/menu'>Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>
							{props.dish.name}
						</BreadcrumbItem>
					</Breadcrumb>

					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr/>
					</div>	
					
					<div className="row"> 
						<div className="col-12 col-md-5 m-1"> 
							<RenderDish dish={props.dish} />
						</div>


						<div className="col-12 col-md-5 m-1">
							<h2>Comments</h2>
							<RenderComments comments={props.comments}/>
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
		

export default DishDetail; 

