import React from 'react';
import styles from './AttributesBlock.module.scss';
import getArrayData from '../../utils/heplerFunctions/getArrayData';
import SmallLoader from '../SmallLoader/SmallLoader';
import { Link } from 'react-router-dom';

class AttributesBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      itemsPerPage: 10,
      fetchedData: null,
    };
  }

  async setInitState() {
    await this.setState({
      fetchedData: null,
    });
  }

  fetchData = async (links) => {
    const fetchedData = await getArrayData(links);
    await this.setState({ fetchedData });
  };

  componentDidMount = async () => {
    const allPagesLinks = this.props.data;
    const pageSize = this.state.itemsPerPage;
    const pages = [];

    for (let i = 0; i < allPagesLinks.length; i += pageSize) {
      pages.push(allPagesLinks.slice(i, i + pageSize));
    }

    this.fetchData(pages[this.state.currentPage]);
  };

  render() {
    return (
      <div className={styles.attributes_block}>
        <p className={styles.attributes_title}>{this.props.title}</p>
        {this.state.fetchedData ? (
          <>
            {this.state.fetchedData.map((item) => {
              const link: string = '/' + item.url.split('/').slice(4).join('/');

              return (
                <Link
                  className={this.props.classNames.join(' ')}
                  key={item.name || item.title}
                  to={link}
                >
                  {item.name || item.title}
                </Link>
              );
            })}
          </>
        ) : (
          <SmallLoader />
        )}
      </div>
    );
  }
}

export default AttributesBlock;
