import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const renderLinksFromArray = (data, classNames): ReactNode => {
  const items = data.map((item) => {
    const link: string = '/' + item.url.split('/').slice(4).join('/');

    return (
      <Link className={classNames.join(' ')} key={item.name} to={link}>
        {item.name || item.title}
      </Link>
    );
  });

  return items;
};

export default renderLinksFromArray;
