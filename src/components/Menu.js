import React, { PureComponent } from 'react'
import FontAwesome from 'react-fontawesome';

class Menu extends PureComponent {
  static Option = ({ icon, label, url, ...rest }) => (
    <li>
      <a href={url} rel="noopener noreferrer" target="_blank" {...rest}>
        <FontAwesome name={icon} />
        {` ${label}`}
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
    )
  }
}

export default Menu;
