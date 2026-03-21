import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error caught:", error);
    console.log("Info:", info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          ⚠️ Something went wrong while loading this component.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
