import React from "react";
import { Helmet } from "react-helmet";
import Styled from "styled-components";
export default function Meta({ title, keyword, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="keyword" keyword={keyword} />
      <meta name="description" description={description} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "ZyncLuxury - Home of Afforadble and durable homes",
  description:
    "Captivating real estate built website built with React, NodeJS and Prisma, featuring customizable layouts, advanced property listings, and seamless content management.",
  keyword: "Homes, buy quality Homes, rare ones",
};
