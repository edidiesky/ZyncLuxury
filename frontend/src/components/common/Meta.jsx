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
  title: "Zyra&Stones - Home of Afforadble and durable homes",
  description: "We offer qualtiy Homes",
  keyword: "Homes, buy quality Homes, rare ones",
};
