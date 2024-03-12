import { Layout } from 'antd';
import { ReactElement } from 'react';
const { Header, Content } = Layout;
import { Helmet } from 'react-helmet';

const BASE_TITLE = 'App ...';

export const getNoneLayout = (page: ReactElement, title?: string) => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{title ? `${BASE_TITLE} - ${title}` : `${BASE_TITLE}`}</title>
      </Helmet>
      {page}
    </>
  );
};

export const getDefaultLayout = (page: ReactElement, title?: string) => {
  return (
    <Layout className='layout min-h-screen'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{title ? `${BASE_TITLE} - ${title}` : `${BASE_TITLE}`}</title>
      </Helmet>
      <Header className='sticky top-0 z-10'>header</Header>
      <Content>
        <div className='site-layout-content'>{page}</div>
      </Content>
    </Layout>
  );
};
