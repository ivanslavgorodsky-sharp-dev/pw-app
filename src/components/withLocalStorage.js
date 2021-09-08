import React from "react";

const withStorage = (WrappedComponent) => {
  class HOC extends React.Component {

    componentDidMount() {
      try {
        localStorage.setItem("111", 222);
        localStorage.removeItem("111");
        console.log("Local storage is available");
      } catch (e) {
        console.log("Local storage is NOT available");
      }
    }

    load = (key) => {
      return localStorage.getItem(key);
    };

    save = (key, data) => {
      return localStorage.setItem(key, data);
    };

    remove = (key) => {
      return localStorage.removeItem(key);
    };

    render() {
      return (
        <WrappedComponent
          load={this.load}
          save={this.save}
          remove={this.remove}
          {...this.props}
        />
      );
    }
  }
  return HOC;
};

export default withStorage;
