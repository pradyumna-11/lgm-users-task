import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";

import "./App.css";

const getUsersPageConstStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};
class App extends Component {
  state = {
    usersList: [],
    getUsersPageStatus: getUsersPageConstStatus.initial,
  };

  getUsersListData = async () => {
    this.setState({ getUsersPageStatus: getUsersPageConstStatus.loading });
    const options = {
      method: "GET",
    };
    const response = await fetch("https://reqres.in/api/users?page=1", options);
    if (response.ok === true) {
      const data = await response.json();

      const parsedUsersList = data.data.map((each) => ({
        id: each.id,
        firstName: each.first_name,
        lastName: each.last_name,
        avatar: each.avatar,
        email: each.email,
      }));
      this.setState({
        usersList: parsedUsersList,
        getUsersPageStatus: getUsersPageConstStatus.success,
      });
    } else {
      this.setState({ getUsersPageStatus: getUsersPageConstStatus.failure });
    }
  };

  renderUserPageFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1709893686/pagenotfound_puca2k.jpg"
        alt="failure-img"
        className="failure-img"
      />
      <p className="error-msg">There is something error, please try again</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getUsersListData}
      >
        Retry
      </button>
    </div>
  );

  renderUserPageSuccess = () => {
    const { usersList } = this.state;
    return (
      <>
        <h1 className="users-heading">Users Details</h1>
        <ul className="users-list-container">
          {usersList.map((each) => (
            <li className="user-item" key={each.id}>
              <img src={each.avatar} alt="user-img" className="user-img" />
              <div className="user-details-container">
                <p className="user-name">
                  {each.firstName} {each.lastName}
                </p>
                <p className="user-mail">{each.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  renderUserPageLoader = () => (
    <div className="loader-container">
      <ThreeDots type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  );

  renderUserInitialPage = () => (
    <div className="initial-container">
      <img
        src="https://res.cloudinary.com/daxizvsge/image/upload/v1716265385/OIP_woirnr.jpg"
        className="no-data-found-img"
        alt="no-data-found-img"
      />
      <p className="no-data-found-text">No data found.</p>
    </div>
  );

  renderUsersPage = () => {
    const { getUsersPageStatus } = this.state;
    switch (getUsersPageStatus) {
      case getUsersPageConstStatus.initial:
        return this.renderUserInitialPage();
      case getUsersPageConstStatus.loading:
        return this.renderUserPageLoader();
      case getUsersPageConstStatus.success:
        return this.renderUserPageSuccess();
      case getUsersPageConstStatus.failure:
        return this.renderUserPageFailure();
      default:
        return null;
    }
  };

  render() {
    const { getUsersPageStatus } = this.state;
    return (
      <div className="bg-container">
        <nav className="navbar">
          <img
            src="https://res.cloudinary.com/daxizvsge/image/upload/v1716261857/nxtwatch_crmsdk.png"
            alt="logo"
            className="logo-img"
          />
          <div className="button-container">
            <button
              className="get-users-button"
              type="button"
              onClick={this.getUsersListData}
            >
              Get Users
            </button>
            {getUsersPageStatus === getUsersPageConstStatus.initial ? (
              <p className="user-indication">
                <span>👆</span>Click here to get users data.
              </p>
            ) : null}
          </div>
        </nav>
        <section className="section">{this.renderUsersPage()}</section>
      </div>
    );
  }
}

export default App;
