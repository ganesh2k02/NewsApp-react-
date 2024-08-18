import React, { useState, useEffect, useRef, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";

const News = ({ country = "in", pageSize = 6, category = "general", apiKey }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const loadingBar = useRef(null);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const fetchArticles = useCallback(async () => {
    loadingBar.current.continuousStart();
    const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    const response = await fetch(url);
    const data = await response.json();
    setArticles((prevArticles) => page === 1 ? data.articles : prevArticles.concat(data.articles));
    setTotalResults(data.totalResults);
    loadingBar.current.complete();
  }, [category, apiKey, page, pageSize]);

  useEffect(() => {
    document.title = capitalizeFirstLetter(category);
    setArticles([]); 
    setPage(1);      
  }, [category]);

  useEffect(() => {
    fetchArticles();
  }, [page, category, fetchArticles]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container my-3">
      <LoadingBar color="#f11946" ref={loadingBar} />
      <h1 className="text-center" style={{margin:"35px 0px",marginTop:"90px"}}>
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((article, index) => {
            const { title = "", description = "", url, urlToImage, author, publishedAt, source } = article || {};

            return (
              <div className="col-md-4" key={`${url}-${index}`}>
                <NewsItem
                  title={title ? title.slice(0, 45) + (title.length > 45 ? "..." : "") : "No Title Available"}
                  description={description ? description.slice(0, 95) + (description.length > 88 ? "..." : "") : "No Description Available"}
                  imageUrl={urlToImage}
                  newsUrl={url}
                  author={author}
                  date={publishedAt}
                  source={source?.name}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default News;
