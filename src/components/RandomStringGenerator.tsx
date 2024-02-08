import React, { useState } from "react";
import "./theme.css";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PageTitle from "./utils/PageTitle";

interface Props {}

const RandomStringGenerator: React.FC<Props> = () => {
  const [inputString, setInputString] = useState<string>("");
  const [stringsArray, setStringsArray] = useState<string[]>([]);
  const [table1, setTable1] = useState<string[]>([]);
  const [table2, setTable2] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
  };

  const handleAddString = () => {
    if (inputString.trim() !== "") {
      setStringsArray([...stringsArray, inputString]);
      setInputString("");
    }
  };

  const handleRandomize = () => {
    const shuffledArray = stringsArray.sort(() => Math.random() - 0.5);
    const halfAndHalf = Math.ceil(stringsArray.length / 2);
    setTable1(shuffledArray.slice(0, halfAndHalf));
    setTable2(shuffledArray.slice(halfAndHalf, halfAndHalf * 2));
  };

  return (
    <div className="mui-theme">
      <PageTitle title="Lottning till cup" icon={<EmojiEventsIcon />} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          type="text"
          value={inputString}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <Button
          onClick={handleAddString}
          variant="contained"
          style={{ marginLeft: "10px" }}
        >
          Add
        </Button>
        <Button
          onClick={handleRandomize}
          variant="contained"
          style={{ marginLeft: "10px" }}
        >
          Randomize
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {stringsArray.map((str, index) => (
          <div
            key={index}
            style={{
              border: "1px solid white",
              padding: "5px",
              margin: "5px",
            }}
          >
            {str}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TableContainer component={Paper} style={{ margin: "5px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Table 1</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table1.map((str, index) => (
                <TableRow key={index}>
                  <TableCell>{str}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} style={{ margin: "5px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Table 2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table2.map((str, index) => (
                <TableRow key={index}>
                  <TableCell>{str}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RandomStringGenerator;
