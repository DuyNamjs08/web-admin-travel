import React, { useState } from "react";
import styled from "styled-components";

function TruncatedText({ text, maxLength }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  if (text?.length <= maxLength) {
    return <p>{text}</p>;
  }

  if (showMore) {
    return (
      <>
        <p>{text}</p>
        <StyleTruncat onClick={toggleShowMore}>Thu gọn</StyleTruncat>
      </>
    );
  }

  const truncatedText = text?.slice(0, maxLength);

  return (
    <>
      <p>{truncatedText}...</p>
      <StyleTruncat onClick={toggleShowMore}>Xem thêm</StyleTruncat>
    </>
  );
}

export default TruncatedText;

const StyleTruncat= styled.div`
    color: #088395;
    font-weight: bold;
    cursor: pointer;
`


