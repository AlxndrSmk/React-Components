import Layout from '@/components/Layout/Layout';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
};

export default App;
