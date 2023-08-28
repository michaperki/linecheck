import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOcrResults } from "../utils/mockApiUtils"; // Update with actual API function

const DataDisplay = () => {
  const { videoId } = useParams();
  const [ocrResults, setOcrResults] = useState(null);

  useEffect(() => {
    fetchOcrResults();
  }, []);

  const fetchOcrResults = async () => {
    try {
      const results = await getOcrResults(videoId);
      console.log("Fetched OCR results:", results); // Log the fetched results
      const formattedResults = formatOcrResults(results.ocr_results);
      console.log("Formatted OCR results:", formattedResults); // Log the formatted results
      setOcrResults(formattedResults);
    } catch (error) {
      console.error("Error fetching OCR results:", error);
    }
  };

  const formatOcrResults = (ocrResults) => {
    // OCR Results are in the following format:
    // {Opponent: Array(35), Stack: Array(35)}
    // within Opponent, each element is in the following format:
    // {frame_index: 0, ocr_text: 'Bernd siaatulaireapebnalped\n\n18.36 BB\n\f', video_id: 'd3d38c39-6d79-4f47-8b3c-e16020891efb'}
    // It is the same for stack.

    // We want to format the data into the following format:
    // Frame 1, Stack, Opponent
    // Frame 2, Stack, Opponent
    // ...

    // First, we need to combine the Opponent and Stack arrays into a single array
    const combinedResults = ocrResults.Opponent.map(
      (opponentResult, index) => {
        const stackResult = ocrResults.Stack[index];
        return {
          frameIndex: opponentResult.frame_index,
          opponentText: opponentResult.ocr_text,
          stackText: stackResult.ocr_text,
        };
      }

      // Next, we need to format the data into the following format:
      // Frame 1, Opponent Text, Opponent Stack Size, Stack Text, Stack Stack Size
      // Frame 2, Opponent Text, Opponent Stack Size, Stack Text, Stack Stack Size
      // ...
    )
      .map(
        (combinedResult) => {
          return {
            frameIndex: combinedResult.frameIndex,
            opponentText: combinedResult.opponentText,
            opponentStackSize: extractStackSize(combinedResult.opponentText),
            stackText: combinedResult.stackText,
            stackStackSize: extractStackSize(combinedResult.stackText),
            timestamp: calculateTimestamp(combinedResult.frameIndex),
          };
        }

        // Finally, we need to sort the data by frame index
      )
      .sort((a, b) => a.frameIndex - b.frameIndex);

    return combinedResults;
  };

  const extractStackSize = (ocrText) => {
    // Use regex or string manipulation to extract stack size from OCR text
    // Example: "18.36 BB" => 18.36
    const regex = /(\d+\.\d+)\s+BB/;
    const match = ocrText.match(regex);
    return match ? match[1] : "";
  };

  const calculateTimestamp = (frameIndex) => {
    // Calculate timestamp based on frame index and frame rate
    const frameRate = 30; // Replace with your video's frame rate
    return (frameIndex / frameRate).toFixed(2);
  };

  const renderOcrResults = () => {
    // Render the formatted OCR results

    // If ocrResults is null, return a loading indicator
    if (!ocrResults) {
      return <p>Loading...</p>;
    }

    // If ocrResults is an empty array, return a message indicating that no data is available
    if (ocrResults.length === 0) {
      return <p>No data available</p>;

      // Otherwise, render the data
    } else {
      // Render the table headers

      // First, get the keys of the first element in the array
      const keys = Object.keys(ocrResults[0]);

      // Next, render the table headers
      const tableHeaders = keys.map((key) => {
        return <th key={key}>{key}</th>;
      });

      // Render the table rows
      const tableRows = ocrResults.map((ocrResult) => {
        // Render the table cells
        const tableCells = keys.map((key) => {
          return <td key={key}>{ocrResult[key]}</td>;
        });

        // Render the table row
        return <tr key={ocrResult.frameIndex}>{tableCells}</tr>;
      });

      // Render the table
      // Note: You can use a UI library like React Bootstrap to style the table
      return (
        <table>
          <thead>
            <tr>{tableHeaders}</tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      );
    }
  };

  return (
    <div>
      <h2>Data Viewer</h2>
      <p>Video ID: {videoId}</p>
      <p>OCR Results:</p>
      {renderOcrResults()}
    </div>
  );
};

export default DataDisplay;
