import axios from "axios";
import React, { useState, useEffect } from "react";
import "./recipes.css";
import config from "../../config";

const Recipes = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${config.RECIPE_API_KEY}&number=50`
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const createMonitor = () => {
    // Define your Datadog API and APP keys
    const apiKey = config.DD_API_KEY;
    const appKey = config.DD_APP_KEY;

    // Construct the monitor payload
    const monitorPayload = {
      name: "My Monitor",
      type: "metric alert",
      query: "avg(last_5m):sum:system.load.5{host:host0} > 1",
      message: "Load spike on host0",
      tags: ["env:prod", "team:backend"],
      options: {
        thresholds: {
          critical: 1.5,
        },
      },
    };

    // Define Datadog API endpoint for creating monitors
    const apiUrl = "https://api.datadoghq.com/api/v1/monitor";

    // Define headers for API request
    const headers = {
      "Content-Type": "application/json",
      "DD-API-KEY": apiKey,
      "DD-APPLICATION-KEY": appKey,
    };

    // Make API request to create the monitor
    axios
      .post(apiUrl, monitorPayload, { headers })
      .then((response) => {
        console.log("Monitor created successfully:", response?.data);
      })
      .catch((error) => {
        console.error("Error creating monitor:", error?.response?.data);
      });
  };

  return (
    <div className="container">
      {data ? (
        <div>
          <div className="title">
            <h2>Recipes list</h2>
            <button className="button" onClick={createMonitor}>Create Monitor</button>
          </div>
          <div className="recipe-container">
            {data.results.map((item) => (
              <div key={item.id} className="recipe-item">
                <h4>{item.title}</h4>
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div>
          <h2>Error:</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      ) : (
        <div>Loading recipes...</div>
      )}
    </div>
  );
};

export default Recipes;
