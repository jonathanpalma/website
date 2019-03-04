import React, { PureComponent } from 'react';
import FontAwesome from 'react-fontawesome';

class Menu extends PureComponent {
  static Option = ({ icon, label, target = '_blank', url, ...rest }) => (
    <li>
      <a href={url} rel="noopener noreferrer" target={target} {...rest}>
        <FontAwesome name={icon} />
        <span className="option-label">{` ${label}`}</span>
      </a>
    </li>
  );

  render() {
    return (
      <ul className="bar-menu">
        {React.Children.map(this.props.children, childElement => (
          React.cloneElement(childElement)
        ))}
      </ul>
    );
  }
}

export default Menu;
