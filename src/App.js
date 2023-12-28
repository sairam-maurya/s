import React, { useState, useEffect } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [pastSearchTerms, setPastSearchTerms] = useState([]);

  useEffect(() => {
    //data fetch from json placeholder done here
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));

    //Past Search of the user details
    const storedSearchTerms =
      JSON.parse(localStorage.getItem("pastSearchTerms")) || [];
    setPastSearchTerms(storedSearchTerms);
  }, []);
  //search is been handled here
  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);

    const updatedPastSearchTerms = Array.from(
      new Set([searchTerm, ...pastSearchTerms])
    );
    setPastSearchTerms(updatedPastSearchTerms);

    localStorage.setItem(
      "pastSearchTerms",
      JSON.stringify(updatedPastSearchTerms)
    );
  };

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  console.log(data, pastSearchTerms);
  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 shadow-md">
      <input
        type="text"
        className="border p-2 rounded-md"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="mt-4">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={handleSort}
        >
          Sort by Name {sortOrder === "asc" ? "▲" : "▼"}
        </button>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-md shadow-md">
            <p className="font-bold">{item.name}</p>
            <p>
              <span>Email:</span>
              {item.email}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3>Past Search Terms:</h3>
        <ul>
          {pastSearchTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
