import React from 'react';
import styles from './AttributesBlock.module.scss';
import renderLinksFromArray from '../../utils/heplerFunctions/RenderLinksFromArray';
import SmallLoader from '../SmallLoader/SmallLoader';

class AttributesBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.attributes_block}>
        <p className={styles.attributes_title}>{this.props.title}</p>
        <div>
          {this.props.data ? (
            renderLinksFromArray(this.props.data, this.props.classNames)
          ) : (
            <SmallLoader />
          )}
        </div>
      </div>
    );
  }
}

export default AttributesBlock;
