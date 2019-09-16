import React, { Fragment } from "react";
import { Row, Col, Card, Layout, BackTop, Tabs, Pagination, Input } from "antd";
import HeaderSearchResults from "./HeaderSearchResults";
import withResultsList from "../HOC/withResultsList";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const { Content } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;

const ResultsList = ({
  currentPageTV,
  currentPage,
  currentPagePerson,
  personsResults,
  tvResults,
  moviesResults,
  text,
  handleChange,
  handleChangePage,
  handleChangePagePerson,
  handleChangePageTV,
  renderRedirect,
  tvresults,
  personresults,
  searchresults,
  match
}) => {
  return (
    <Fragment>
      <Layout>
        <HeaderSearchResults />
        <Content
          style={{
            padding: 40,
            margin: 0
          }}>
          <Row gutter={16}>
            <Col span={16}>
              <Row style={{ width: "90vw" }}>
                <BackTop />
                <Row>
                  <Col span={10}>
                    <div>
                      <Search
                        style={{ padding: "40px" }}
                        placeholder='Search movies, people, TV shows ...'
                        onChange={handleChange}
                        value={text}
                        onSearch={() => renderRedirect()}
                        enterButton='Search'
                      />
                    </div>
                  </Col>
                </Row>
                <Col>
                  <Tabs tabPosition='left'>
                    <TabPane tab='MOVIES' key='1'>
                      <Pagination
                        defaultCurrent={1}
                        current={currentPage}
                        total={searchresults && searchresults.total_results}
                        pageSize={20}
                        onChange={event => handleChangePage(event)}
                      />
                      <Card
                        title={`${moviesResults &&
                          searchresults.total_results} movie(s) for "${text}"`}>
                        {moviesResults}
                      </Card>
                    </TabPane>
                    <TabPane tab='PEOPLE' key='2'>
                      <Pagination
                        defaultCurrent={1}
                        current={currentPagePerson}
                        total={personresults && personresults.total_results}
                        pageSize={20}
                        onChange={event => handleChangePagePerson(event)}
                      />
                      <Card
                        title={`${personsResults &&
                          personresults.total_results} person(s) for "${text}" `}>
                        {personsResults}
                      </Card>
                    </TabPane>
                    <TabPane tab='TV SHOWS' key='3' style={{ color: "white" }}>
                      <Pagination
                        defaultCurrent={1}
                        current={currentPageTV}
                        total={tvresults && tvresults.total_results}
                        pageSize={20}
                        onChange={event => handleChangePageTV(event)}
                      />
                      <Card
                        title={`${tvResults &&
                          tvresults.total_results} TV Show(s) for "${text}"  `}>
                        {tvResults}
                      </Card>
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </Col>
            <Col span={8} />
          </Row>
        </Content>
      </Layout>
    </Fragment>
  );
};
// const WrappedComponent = withResultsList(ResultsList);
// export default WrappedComponent;

const WrappedComponent = compose(
  withRouter,
  withResultsList
)(ResultsList);
export default WrappedComponent;
