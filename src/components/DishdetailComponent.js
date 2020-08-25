import React, { Component, useState } from 'react'; 
import { Card, CardImg,  CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, Row, Label, Col, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';



const required = (val) => val && val.length; 
const maxLength = (len) => (val) => !(val) || (val.length <=len);
const minLength = (len) => (val) => val && (val.length >=len);

class CommentForm extends Component { 
	constructor(props) { 
		super(props);
		this.state = { 
			isModalOpen: false
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	toggleModal() { 
		this.setState( { 
			isModalOpen: !this.state.isModalOpen
			
		});
	}


	
	handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.toggleModal(); 
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

	render() {

		return (

			<div>
				<Button onClick={this.toggleModal}><i className='fa fa-pencil'>Submit Comment</i></Button>
				
				
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>


				<ModalHeader>Submit Comment</ModalHeader>
					<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
						<Container>
						
						{ /* Details for the rating*/ }
						<Row className='form-group'>
							<Label htmlFor='rating' md={4}>Rating</Label>
						
							<Col md={12}>
								<Control.select model='.rating'
								placeholdar='1'
								className='form-control'>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								</Control.select>								
							</Col>
						</Row>

						{ /* Details for the author name*/ }
						<Row className='form-group'>
							<Label htmlFor='authorname' md={4}>Your Name</Label>
						
							<Col md={12}>
								<Control.text 
								model='.authorname'
								placeholdar='author'
								className='form-control'
								validators={{
									required,
									minLength: minLength(3),
									maxLength: maxLength(15)
								}}
								/>
								
								<Errors 
								className='text-danger'
								model='.authorname'
								show='touched'
								messages= {{
									required: "Required ", 
									minLength: "Must be greater than 2 characters", 
									maxLength: "Must be 15 characters or less"
								}}/>										
							</Col>
						</Row>


						{ /* Details for the comment*/ }
						<Row className='form-group'>
							<Label htmlFor='comment' md={4}>Comment</Label>
						
							<Col md={12}>
								<Control.textarea model='.comment'
								placeholdar='Type your comment here'
								className='form-control' />
							</Col>
						</Row>

						<Row>   
                            <Col md = {{size:10}}>
                                <Button type="submit" color='primary'>Submit</Button>
                             </Col> 
                        </Row>  
                        <br/>      
					</Container>	
				</LocalForm>
			</Modal>
		</div>
		);
	
	}
}


	function RenderDish({dish}) { 
		
		if (dish!=null) { 
			return ( 
				<Card>
					<CardImg width='100%' src={dish.image} alt={dish.name} />
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


   	function RenderComments({comments, addComment, dishId}) { 
   
   		//console.log("Comments passed are: " + comments[0].comment); 
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
   
   		return(<div>
   			{commentary} 
   			<CommentForm dishId={dishId} addComment={addComment} />
   			</div>); 
   	}


	const DishDetail = (props) => {
		if(props.isLoading) { 
			return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
		}

		else if(props.errMess) { 
			return(
				<div className="container">
					<div className='row'>
						<h4>{props.errMess}</h4>
					</div>
				</div>
				);
		}

		else if (props.dish != null) {	
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

						{ /* Render the dish */}
						<div className="col-12 col-md-5 m-1"> 
							<RenderDish dish={props.dish} />
						</div>

						{ /* Render the comments and the submit comment button*/}
						<div className="col-12 col-md-5 m-1">
							<h2>Comments</h2>
							<RenderComments comments={props.comments}
							addComment={props.addComment}
							dishId={props.dish.id} />	
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

