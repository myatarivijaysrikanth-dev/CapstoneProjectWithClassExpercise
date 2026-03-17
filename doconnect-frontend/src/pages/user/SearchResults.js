import React, { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import questionService from "../../services/questionService";
import QuestionList from "../../components/questions/QuestionList";
import Loader from "../../components/common/Loader";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const keyword = query.get("keyword") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!keyword.trim()) return;

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await questionService.searchQuestions(keyword);
        setResults(data);
      } catch (err) {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [keyword]);

  return (
    <div className="page-wrapper">
      <Container>
        <div className="mb-4">
          <h4 className="fw-bold mb-1">Search Results</h4>
          <p className="text-muted">
            {keyword ? (
              <>
                Showing results for{" "}
                <strong style={{ color: "#0d6efd" }}>"{keyword}"</strong>
              </>
            ) : (
              "Enter a keyword in the search box above."
            )}
          </p>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <Loader />
        ) : (
          <>
            {keyword && !loading && (
              <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </p>
            )}
                         {results.length === 0 && keyword ? (
               <Alert variant="info">No questions found for "{keyword}".</Alert>
             ) : (
               <QuestionList questions={results} />
             )}
          </>
        )}
      </Container>
    </div>
  );
};

export default SearchResults;
