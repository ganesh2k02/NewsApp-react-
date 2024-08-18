import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (
    <div className="my-3">
      <div className="card" style={{ width: "22rem",}}>
        <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
          <span className="badge rounded-pill bg-danger" style={{ right: "0", zIndex: "1" }}>
            {source}
          </span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://i0.wp.com/androidguys.com/wp-content/uploads/2024/08/cricket_jaw_drop.webp?w=1280&ssl=1"
              : imageUrl
          }
          className="card-img-top"
          alt="img"
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title"style={{marginTop: '0'}}>
            {title.length > 45 ? title.slice(0, 50) + "" : title}{" "}
          </h5>
          <p className="card-text" style={{marginTop: '0'}}>
            {description.length > 88
              ? description.slice(0, 88) + ""
              : description}
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {!author ? "unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
