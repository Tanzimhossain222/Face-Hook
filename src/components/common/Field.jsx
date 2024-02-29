import PropTypes from "prop-types";
import React from "react";

const Field = ({ label = "", children = "", htmlFor = "", error = null }) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className="form-control">
      {label && (
        <label className="auth-label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <p
          role="alert"
          aria-live="assertive"
          className="text-red-500 text-xs mt-1"
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child.props) {
    return child.props.id;
  }
};

Field.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  error: PropTypes.object,
};

export default Field;
