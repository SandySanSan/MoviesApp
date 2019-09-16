import React from "react";
import { Drawer, Divider, Typography } from "antd";

const { Paragraph } = Typography;

const DrawerReviews = ({ currentMovie, onClose, visible }) => {
  return (
    <Drawer width={640} placement='left' closable={false} onClose={onClose} visible={visible}>
      <div className='movies-title'>Reviews</div>
      <div>
        {currentMovie.id &&
          currentMovie.reviews &&
          currentMovie.reviews.map(review => (
            <div style={{ padding: 15 }} key={review.id}>
              <h2>{review.content.split(" ", 7).join(" ")} ... </h2>
              <h4>by {review.author}</h4>
              <Paragraph ellipsis={{ rows: 5, expandable: true }}>{review.content}</Paragraph>
              <Divider />
            </div>
          ))}
      </div>
    </Drawer>
  );
};

export default DrawerReviews;
