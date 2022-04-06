import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbars from "./Navbars";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Docs = () => {
  const [title, setTitle] = useState([]);
  const [body, setBody] = useState([]);

  useEffect(() => {
    getPageContent();
  }, []);

  async function getPageContent() {
    let keyword = "";
    let search = window.location.search;
    let params = new URLSearchParams(search);
    if (params) {
      keyword = params.get("id");
    }

    const pageContentAPI = `https://static.kulfyapp.com/blogs?url=${keyword}`;
    axios.defaults.headers.common = {
      "Content-Type": "application/json",
    };
    const getPageResponse = await axios.get(`${pageContentAPI}`);
    setTitle(getPageResponse.data[0].title);
    setBody(getPageResponse.data[0].body);
  }

  return (
    <>
      <Navbars />
      <h1 className="text-center">{title}</h1>
      <section className="container featured-grid mb-5">
        <div className="row d-flex justify-content-between p-3 mark-links">
          <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />
        </div>
      </section>
    </>
  );
};

export default Docs;
