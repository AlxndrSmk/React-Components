import React from 'react';
import styles from './AttributesBlock.module.scss';

class AttributesBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => (
    <div className={styles.attributes_block}>
      <p className={styles.attributes_title}>{this.props.blockTitle}</p>
      <ul>{this.props.renderArrayData(this.props.data)}</ul>
    </div>
  );
}

export default AttributesBlock;
