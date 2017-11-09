import React from 'react';
import { GetBookStatus } from './BookConditionals';
import { requestBook, deleteBook, unrequestBook } from '../../actions/bookActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { connect } from 'react-redux';
import './Books.css';

class Book extends React.Component {
  deleteBook(){
    console.log(this.props.book._id);
    this.props.deleteBook(this.props.book._id).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });
    });
  }

  requestBook(){
    console.log('request');
    this.props.requestBook(this.props.book.ISBN, this.props.username).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });
    });
  }

  unrequestBook(){
  	 console.log('unrequest');
    this.props.unrequestBook(this.props.book.ISBN, this.props.username).then(res => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });
    });
  }

  render() {
    return (
      <div className="singleBookContainer" title={this.props.book.title}>
        <img className="bookImage" src={this.props.book.image ? this.props.book.image.large : 'http://via.placeholder.com/180x275'} alt="☒" />

        <ul className="bookDetailsContainer">
          <li className="bookDetail">{this.props.book.authors[0]}</li>
          <li className="bookDetail">{this.props.book.publisher}</li>
          <li className="bookDetail">{this.props.book.ISBN}</li>
        </ul>

        <div className="bookButtonContainer">
          <a className="btn btn-primary bookButtonLeft" href={this.props.book.bookUrl} target="_blank">more info</a>
          <GetBookStatus
            book={this.props.book}
            userID={this.props.id}
            username={this.props.username}
            requestBook={this.requestBook.bind(this)}
            deleteBook={this.deleteBook.bind(this)}
            unrequestBook={this.unrequestBook.bind(this)}
          />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
    return {
     	messages: state.books.message,
      id: state.auth.user.id,
    	username: state.auth.user.username
    }
}

export default connect(mapStateToProps, {requestBook, deleteBook, unrequestBook, addFlashMessage})(Book);
